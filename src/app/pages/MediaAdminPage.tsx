import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, ImagePlus, Images, Layers3, LayoutTemplate, LogOut, Save, Trash2, UploadCloud, Video } from "lucide-react";
import { AdminFramingControls } from "../components/media/AdminFramingControls";
import { UnifiedUploadDropzone } from "../components/media/UnifiedUploadDropzone";
import { readMediaAssets, writeMediaAssets, type MediaAsset, type MediaPlacement } from "../media/mediaTypes";
import { deleteMediaAsset, fetchPublishedMedia, saveMediaAsset, uploadMediaFile } from "../media/mediaRepository";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";

interface MediaAdminPageProps { onNavigate?: (page: string) => void; }

const placementOptions: Array<{ id: MediaPlacement; label: string; description: string; icon: typeof LayoutTemplate }> = [
  { id: "hero", label: "Hero", description: "The main landing image", icon: LayoutTemplate },
  { id: "gallery", label: "Gallery", description: "Your visual collection", icon: Images },
  { id: "both", label: "Both", description: "Shared across the site", icon: Layers3 },
];

function getPlacementLabel(placement: MediaPlacement) {
  return placementOptions.find((option) => option.id === placement)?.label ?? placement;
}

function getMediaErrorMessage(error: unknown, action: "upload" | "save" | "remove") {
  const details = typeof error === "object" && error !== null
    ? error as { message?: string; error?: string; details?: string; hint?: string }
    : null;
  const message = details?.message || details?.error || (error instanceof Error ? error.message : String(error));
  const extra = [details?.details, details?.hint].filter(Boolean).join(" ");
  const fullMessage = `${message}${extra ? ` ${extra}` : ""}`;
  const normalized = fullMessage.toLowerCase();
  if (normalized.includes("row-level security") || normalized.includes("not authorized") || normalized.includes("forbidden") || normalized.includes("unauthorized")) {
    return "Supabase denied this action. Your signed-in email must be added to the admin_users table, and the Supabase Storage policies must be applied.";
  }
  if (normalized.includes("bucket") || normalized.includes("storage")) {
    return `Supabase Storage rejected the ${action}. Confirm that the public media bucket exists and its admin upload policy is enabled.`;
  }
  return `${action[0].toUpperCase()}${action.slice(1)} failed: ${fullMessage}`;
}

const defaultHeroAssets: MediaAsset[] = [
  { id: "00000000-0000-0000-0000-000000000001", url: "/images/main%20pages/SusSTEM_Banner_Selfie.jpg", mediaType: "image", title: "Inspiring the next generation of sustainable innovators", altText: "Inspiring the next generation of sustainable innovators", nativeWidth: 0, nativeHeight: 0, ...{ zoom: 1, focalPointX: 50, focalPointY: 50, objectFit: "cover" as const, placement: "hero" as const, brightness: 100, contrast: 100, saturation: 100 }, createdAt: "" },
  { id: "00000000-0000-0000-0000-000000000002", url: "/images/main%20pages/cutemelookingatlegosusstem.jpg", mediaType: "image", title: "STEM-powered minds for a sustainable tomorrow", altText: "Child building with STEM materials", nativeWidth: 0, nativeHeight: 0, ...{ zoom: 1, focalPointX: 50, focalPointY: 50, objectFit: "cover" as const, placement: "hero" as const, brightness: 100, contrast: 100, saturation: 100 }, createdAt: "" },
  { id: "00000000-0000-0000-0000-000000000003", url: "/images/main%20pages/arduinobreadboardimagesusstem.jpg", mediaType: "image", title: "Sustainability plus STEM", altText: "Young person working with an Arduino breadboard", nativeWidth: 0, nativeHeight: 0, ...{ zoom: 1, focalPointX: 50, focalPointY: 50, objectFit: "cover" as const, placement: "hero" as const, brightness: 100, contrast: 100, saturation: 100 }, createdAt: "" },
  { id: "00000000-0000-0000-0000-000000000004", url: "/images/main%20pages/dudeholdingstemsusstem.jpg", mediaType: "image", title: "STEM for every child, everywhere", altText: "Student holding a STEM project", nativeWidth: 0, nativeHeight: 0, ...{ zoom: 1, focalPointX: 50, focalPointY: 50, objectFit: "cover" as const, placement: "hero" as const, brightness: 100, contrast: 100, saturation: 100 }, createdAt: "" },
  { id: "00000000-0000-0000-0000-000000000005", url: "/images/main%20pages/floodforherosusstem.jpg", mediaType: "image", title: "Solving global sustainability challenges with STEM", altText: "STEM project focused on sustainability", nativeWidth: 0, nativeHeight: 0, ...{ zoom: 1, focalPointX: 50, focalPointY: 50, objectFit: "cover" as const, placement: "hero" as const, brightness: 100, contrast: 100, saturation: 100 }, createdAt: "" },
];

function bundledGalleryAssets(items: Array<{ id?: string; url?: string; title?: string; nativeWidth?: number; nativeHeight?: number; type?: string }>): MediaAsset[] {
  return items.filter((item) => item.url && (item.type === "image" || item.type === "video" || !item.type)).map((item, index) => ({
    id: item.id?.match(/^[0-9a-f-]{36}$/i) ? item.id : `00000000-0000-0000-0001-${String(index + 1).padStart(12, "0")}`,
    url: item.url!,
    mediaType: item.type === "video" ? "video" : "image",
    title: item.title || "Gallery image",
    altText: item.title || "Gallery image",
    nativeWidth: item.nativeWidth || 0,
    nativeHeight: item.nativeHeight || 0,
    zoom: 1,
    focalPointX: 50,
    focalPointY: 50,
    objectFit: "auto",
    placement: "gallery",
    brightness: 100,
    contrast: 100,
    saturation: 100,
    createdAt: "",
  }));
}

export function MediaAdminPage({ onNavigate }: MediaAdminPageProps) {
  const [assets, setAssets] = useState<MediaAsset[]>(() => readMediaAssets());
  const [activePlacement, setActivePlacement] = useState<MediaPlacement>("hero");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [authLoading, setAuthLoading] = useState(isSupabaseConfigured);
  const [signedInEmail, setSignedInEmail] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const placementAssets = useMemo(
    () => assets.filter((asset) => activePlacement === "both" ? asset.placement === "both" : asset.placement === activePlacement || asset.placement === "both"),
    [activePlacement, assets],
  );
  const selected = placementAssets.find((asset) => asset.id === selectedId) ?? placementAssets[0] ?? null;

  useEffect(() => {
    if (selected?.id !== selectedId) setSelectedId(selected?.id ?? null);
  }, [selected, selectedId]);

  useEffect(() => {
    let active = true;
    const loadAvailableMedia = async () => {
      const localAssets = readMediaAssets();
      let remoteAssets: MediaAsset[] = [];
      if (isSupabaseConfigured) {
        try {
          remoteAssets = await fetchPublishedMedia();
        } catch (error) {
          console.error("Unable to load media from Supabase:", error);
        }
      }
      let galleryAssets: MediaAsset[] = [];
      try {
        const response = await fetch("/assets/gallery/manifest.json");
        if (response.ok) galleryAssets = bundledGalleryAssets(await response.json());
      } catch (error) {
        console.error("Unable to load bundled gallery media:", error);
      }
      const available = [...remoteAssets, ...(isSupabaseConfigured ? [] : localAssets), ...defaultHeroAssets, ...galleryAssets];
      const uniqueAssets = Array.from(new Map(available.map((asset) => [asset.url, asset])).values());
      if (active) setAssets(uniqueAssets);
    };
    void loadAvailableMedia();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!supabase) return;
    void supabase.auth.getSession().then(({ data }) => {
      setSignedInEmail(data.session?.user.email ?? "");
      setAuthLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedInEmail(session?.user.email ?? "");
      setAuthLoading(false);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    setAuthError("");
    if (!supabase) {
      setAuthError("Admin sign-in is unavailable because Supabase is not configured for this deployment.");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email: adminEmail, password: adminPassword });
    if (error) setAuthError(error.message);
  };

  const updateSelected = (patch: Partial<MediaAsset>) => {
    if (!selected) return;
    setAssets((current) => current.map((asset) => {
      if (asset.id === selected.id) return { ...asset, ...patch };
      if (patch.placement === "hero" && asset.placement === "hero") return { ...asset, placement: "gallery" };
      return asset;
    }));
    setSaved(false);
  };

  const dataUrlToFile = async (asset: MediaAsset) => {
    const response = await fetch(asset.url);
    const blob = await response.blob();
    return new File([blob], asset.sourceName || `${asset.title || "media"}.${asset.mediaType === "video" ? "mp4" : "jpg"}`, { type: blob.type });
  };

  const addAssets = async (incoming: MediaAsset[]) => {
    setUploadError("");
    const drafts = incoming.map((asset) => ({ ...asset, placement: activePlacement }));
    try {
      if (isSupabaseConfigured) {
        const uploaded = await Promise.all(drafts.map(async (asset) => uploadMediaFile(await dataUrlToFile(asset), asset)));
        setAssets((current) => [...uploaded, ...current]);
        if (uploaded[0]) setSelectedId(uploaded[0].id);
      } else {
        setAssets((current) => [...drafts, ...current]);
        if (drafts[0]) setSelectedId(drafts[0].id);
      }
      setSaved(false);
    } catch (error) {
      console.error("Unable to upload media:", error);
      setUploadError(getMediaErrorMessage(error, "upload"));
    }
  };

  const replaceSelected = async (file: File, draft: MediaAsset) => {
    if (!selected) return;
    setUploadError("");
    try {
      if (isSupabaseConfigured) {
        const uploaded = await uploadMediaFile(file, { ...draft, placement: selected.placement }, selected.id);
        setAssets((current) => current.map((asset) => asset.id === selected.id ? uploaded : asset));
      } else {
        setAssets((current) => current.map((asset) => asset.id === selected.id ? {
          ...asset,
          url: draft.url,
          mediaType: draft.mediaType,
          nativeWidth: draft.nativeWidth,
          nativeHeight: draft.nativeHeight,
          sourceName: draft.sourceName,
          createdAt: draft.createdAt,
        } : asset));
      }
      setSaved(false);
    } catch (error) {
      console.error("Unable to replace media:", error);
      setUploadError(getMediaErrorMessage(error, "upload"));
    }
  };

  const save = async () => {
    try {
      if (isSupabaseConfigured) await Promise.all(assets.map((asset) => saveMediaAsset(asset)));
      else writeMediaAssets(assets);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
    } catch (error) {
      console.error("Unable to save media:", error);
      setUploadError(getMediaErrorMessage(error, "save"));
    }
  };

  const removeSelected = async () => {
    if (!selected) return;
    setUploadError("");
    try {
      const isBundledAsset = selected.url.startsWith("/");
      if (isSupabaseConfigured && !isBundledAsset) await deleteMediaAsset(selected);
      const next = assets.filter((asset) => asset.id !== selected.id);
      setAssets(next);
      setSelectedId(next.find((asset) => asset.placement === activePlacement)?.id ?? null);
      if (!isSupabaseConfigured) writeMediaAssets(next);
      setSaved(false);
    } catch (error) {
      console.error("Unable to remove media:", error);
      setUploadError(getMediaErrorMessage(error, "remove"));
    }
  };

  if (authLoading) return <div className="flex min-h-screen items-center justify-center bg-[#f4f8f7] text-lg text-[#072d2d]">Checking admin access...</div>;
  if (!signedInEmail) return <main className="flex min-h-screen items-center justify-center bg-[#f4f8f7] px-5 text-[#072d2d]"><form onSubmit={(event) => { event.preventDefault(); void signIn(); }} className="w-full max-w-md space-y-5 rounded-3xl border border-[#dce8e5] bg-white p-7 shadow-sm"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6b8983]">SusSTEM media</p><h1 className="mt-2 text-3xl font-semibold">Admin sign in</h1><p className="mt-2 text-sm text-[#607975]">Sign in to manage hero, gallery, and newsletter media.</p></div><label className="block text-sm font-semibold">Email<input type="email" required value={adminEmail} onChange={(event) => setAdminEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-[#dce8e5] px-4 py-3 font-normal" /></label><label className="block text-sm font-semibold">Password<input type="password" required value={adminPassword} onChange={(event) => setAdminPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-[#dce8e5] px-4 py-3 font-normal" /></label>{authError ? <p className="text-sm text-red-700">{authError}</p> : null}<button type="submit" className="w-full rounded-xl bg-[#20593a] px-4 py-3 text-base font-semibold text-white">Sign in</button></form></main>;

  return (
    <div className="min-h-screen bg-[#f4f8f7] text-[#072d2d]">
      <header className="border-b border-[#dce8e5] bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => onNavigate?.("home")} className="rounded-xl p-2 text-[#35514e] hover:bg-[#eaf3f1]" aria-label="Back to site"><ArrowLeft className="h-5 w-5" /></button>
            <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b8983]">SusSTEM media</p><h1 className="mt-1 text-2xl font-semibold tracking-tight">Media workspace</h1><p className="mt-1 text-sm text-[#607975]">Choose where you are working, then select a visual to edit.</p></div>
          </div>
          <div className="flex items-center gap-2"><span className="hidden text-sm text-[#607975] sm:block">{signedInEmail}</span><button type="button" onClick={() => void supabase?.auth.signOut()} className="rounded-xl p-2 text-[#35514e] hover:bg-[#eaf3f1]" aria-label="Sign out"><LogOut className="h-4 w-4" /></button><button type="button" onClick={save} className="inline-flex items-center gap-2 rounded-xl bg-[#20593a] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#072d2d]"><Save className="h-4 w-4" /> {saved ? "Saved" : "Save changes"}</button></div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8">
        <section className="mb-7"><p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#6b8983]">What are you working on?</p><div className="grid gap-3 md:grid-cols-3">{placementOptions.map(({ id, label, description, icon: Icon }) => <button key={id} type="button" onClick={() => setActivePlacement(id)} className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${activePlacement === id ? "border-[#20593a] bg-[#eaf3f1] shadow-[0_0_0_2px_#20593a]" : "border-[#dce8e5] bg-white hover:border-[#7da79e]"}`}><span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${activePlacement === id ? "bg-[#20593a] text-white" : "bg-[#edf5f2] text-[#20593a]"}`}><Icon className="h-5 w-5" /></span><span><strong className="block text-base">{label}</strong><span className="mt-0.5 block text-sm text-[#607975]">{description}</span></span>{activePlacement === id ? <Check className="ml-auto h-5 w-5 text-[#20593a]" /> : null}</button>)}</div></section>

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          <section className="space-y-6">
            <div className="rounded-2xl border border-[#dce8e5] bg-white p-5 shadow-sm sm:p-6"><div className="mb-5 flex items-start justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#6b8983]">{getPlacementLabel(activePlacement)} media</p><h2 className="mt-1 text-xl font-semibold">Add or replace</h2><p className="mt-1 text-sm text-[#607975]">Upload new media for this area, or replace the selected item below.</p></div><ImagePlus className="h-5 w-5 text-[#7da79e]" /></div><UnifiedUploadDropzone onAssetsReady={addAssets} onReplaceFileReady={replaceSelected} />{uploadError ? <p className="mt-4 rounded-xl bg-[#fff1f0] px-4 py-3 text-sm text-[#b42318]">{uploadError}</p> : null}</div>

            <div className="rounded-2xl border border-[#dce8e5] bg-white p-5 shadow-sm sm:p-6"><div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#6b8983]">Library</p><h2 className="mt-1 text-xl font-semibold">{getPlacementLabel(activePlacement)} visuals</h2></div><span className="rounded-full bg-[#eaf3f1] px-3 py-1 text-xs font-semibold text-[#20593a]">{placementAssets.length} {placementAssets.length === 1 ? "item" : "items"}</span></div>{placementAssets.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{placementAssets.map((asset) => <button key={asset.id} type="button" onClick={() => setSelectedId(asset.id)} className={`group relative overflow-hidden rounded-xl border-2 bg-[#eaf3f1] text-left ${activePlacement === "hero" ? "aspect-[16/9]" : activePlacement === "gallery" ? "aspect-[4/5]" : "aspect-[4/3]"} ${selected?.id === asset.id ? "border-[#20593a] ring-2 ring-[#b9d5ca]" : "border-transparent"}`}>{asset.mediaType === "video" ? <video src={asset.url} muted className="h-full w-full object-cover" /> : <img src={asset.url} alt={asset.altText} className="h-full w-full object-cover" />}{selected?.id === asset.id ? <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#20593a] text-white"><Check className="h-4 w-4" /></span> : null}<span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/70 px-3 pb-2 pt-7 text-xs font-medium text-white">{asset.title || asset.sourceName || "Untitled media"}</span></button>)}</div> : <div className="rounded-xl border border-dashed border-[#cbded9] bg-[#fbfdfc] px-6 py-14 text-center"><UploadCloud className="mx-auto h-8 w-8 text-[#7da79e]" /><p className="mt-3 text-sm font-semibold">No {getPlacementLabel(activePlacement).toLowerCase()} media yet</p><p className="mt-1 text-sm text-[#607975]">Use the upload area above to add the first item.</p></div>}</div>
          </section>

          <aside className="space-y-6 xl:sticky xl:top-6">{selected ? <><div className="rounded-2xl border border-[#dce8e5] bg-white p-5 shadow-sm sm:p-6"><div className="mb-5 flex items-start justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#6b8983]">Selected visual</p><h2 className="mt-1 text-xl font-semibold">Edit details</h2></div>{selected.mediaType === "video" ? <Video className="h-5 w-5 text-[#7da79e]" /> : <ImagePlus className="h-5 w-5 text-[#7da79e]" />}</div><div className="space-y-4"><label className="block text-sm font-semibold">Title<input value={selected.title} onChange={(event) => updateSelected({ title: event.target.value })} className="mt-2 w-full rounded-xl border border-[#dce8e5] px-3 py-2.5 font-normal outline-none focus:border-[#20593a]" /></label><label className="block text-sm font-semibold">Alt text<span className="ml-1 font-normal text-[#607975]">for accessibility</span><textarea value={selected.altText} onChange={(event) => updateSelected({ altText: event.target.value })} rows={2} className="mt-2 w-full resize-none rounded-xl border border-[#dce8e5] px-3 py-2.5 font-normal outline-none focus:border-[#20593a]" /></label><div><p className="mb-2 text-sm font-semibold">Use this in</p><div className="grid grid-cols-3 gap-2">{placementOptions.map(({ id, label }) => <button key={id} type="button" onClick={() => { updateSelected({ placement: id }); setActivePlacement(id); }} className={`rounded-xl px-2 py-2.5 text-sm font-semibold transition ${selected.placement === id ? "bg-[#20593a] text-white" : "bg-[#f2f7f5] text-[#35514e] hover:bg-[#eaf3f1]"}`}>{label}</button>)}</div><p className="mt-2 text-xs text-[#607975]">Hero allows one primary visual. Choosing a new hero moves the previous one to Gallery.</p></div></div></div><AdminFramingControls asset={selected} onChange={(next) => updateSelected(next)} /><button type="button" onClick={() => void removeSelected()} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#f0c9c5] bg-white px-4 py-3 text-sm font-semibold text-[#b42318] hover:bg-[#fff5f4]"><Trash2 className="h-4 w-4" /> Remove this visual</button></> : <div className="rounded-2xl border border-[#dce8e5] bg-white p-7 text-center shadow-sm"><ImagePlus className="mx-auto h-9 w-9 text-[#9cbdb4]" /><h2 className="mt-3 text-lg font-semibold">Select a visual to edit</h2><p className="mt-1 text-sm text-[#607975]">Your {getPlacementLabel(activePlacement).toLowerCase()} library will appear here.</p></div>}</aside>
        </div>
      </main>
    </div>
  );
}
