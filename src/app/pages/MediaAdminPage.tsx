import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, ImagePlus, Images, Layers3, LayoutTemplate, LogOut, Save, Trash2, UploadCloud, Video, ArrowUp, ArrowDown, Eye, EyeOff } from "lucide-react";
import { AdminFramingControls } from "../components/media/AdminFramingControls";
import { UnifiedUploadDropzone } from "../components/media/UnifiedUploadDropzone";
import { type MediaAsset, type MediaPlacement } from "../media/mediaTypes";
import { deleteMediaAsset, fetchAllMedia, saveMediaAsset, uploadMediaFile } from "../media/mediaRepository";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";

interface MediaAdminPageProps { onNavigate?: (page: string) => void; }

const placementOptions: Array<{ id: MediaPlacement; label: string; description: string; icon: typeof LayoutTemplate }> = [
  { id: "hero", label: "Hero Slider", description: "Homepage landing banner carousel", icon: LayoutTemplate },
  { id: "gallery", label: "Public Gallery", description: "Masonry/circular gallery collection", icon: Images },
  { id: "both", label: "Both Locations", description: "Display on both the Hero and Gallery", icon: Layers3 },
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
    return "Permission Denied: Ensure your email is listed in 'admin_users' and policies are applied.";
  }
  return `${action[0].toUpperCase()}${action.slice(1)} failed: ${fullMessage}`;
}

export function MediaAdminPage({ onNavigate }: MediaAdminPageProps) {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [activePlacement, setActivePlacement] = useState<MediaPlacement>("hero");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [authLoading, setAuthLoading] = useState(isSupabaseConfigured);
  const [signedInEmail, setSignedInEmail] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [savingLoader, setSavingLoader] = useState(false);

  const placementAssets = useMemo(
    () => assets
      .filter((asset) => activePlacement === "both" ? asset.placement === "both" : asset.placement === activePlacement || asset.placement === "both")
      .sort((left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0)),
    [activePlacement, assets],
  );
  const selected = placementAssets.find((asset) => asset.id === selectedId) ?? placementAssets[0] ?? null;

  const currentIndex = selected ? placementAssets.findIndex((a) => a.id === selected.id) : -1;
  const canMoveUp = selected !== null && currentIndex > 0;
  const canMoveDown = selected !== null && currentIndex !== -1 && currentIndex < placementAssets.length - 1;

  useEffect(() => {
    if (selected?.id !== selectedId) setSelectedId(selected?.id ?? null);
  }, [selected, selectedId]);

  const loadMedia = () => {
    fetchAllMedia().then((remoteAssets) => {
      setAssets(remoteAssets);
    }).catch((error) => console.error("Unable to load media from Supabase:", error));
  };

  useEffect(() => {
    loadMedia();
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
    setAssets((current) => current.map((asset) => asset.id === selected.id ? { ...asset, ...patch } : asset));
    setSaved(false);
  };

  const dataUrlToFile = async (asset: MediaAsset) => {
    const response = await fetch(asset.url);
    const blob = await response.blob();
    return new File([blob], asset.sourceName || `${asset.title || "media"}.${asset.mediaType === "video" ? "mp4" : "jpg"}`, { type: blob.type });
  };

  const addAssets = async (incoming: MediaAsset[]) => {
    setUploadError("");
    const maxSortOrder = assets.reduce((max, asset) => Math.max(max, asset.sortOrder ?? 0), 0);
    const drafts = incoming.map((asset, index) => ({
      ...asset,
      placement: activePlacement,
      sortOrder: maxSortOrder + (index + 1) * 10,
    }));
    try {
      if (isSupabaseConfigured) {
        setSavingLoader(true);
        const uploaded = await Promise.all(drafts.map(async (asset) => uploadMediaFile(await dataUrlToFile(asset), asset)));
        setAssets((current) => [...uploaded, ...current]);
        if (uploaded[0]) setSelectedId(uploaded[0].id);
        window.dispatchEvent(new CustomEvent("susstem-media-updated"));
      }
      setSaved(false);
    } catch (error) {
      console.error("Unable to upload media:", error);
      setUploadError(getMediaErrorMessage(error, "upload"));
    } finally {
      setSavingLoader(false);
    }
  };

  const replaceSelected = async (file: File, draft: MediaAsset) => {
    if (!selected) return;
    setUploadError("");
    try {
      if (isSupabaseConfigured) {
        setSavingLoader(true);
        const uploaded = await uploadMediaFile(file, {
          ...draft,
          id: selected.id,
          title: selected.title,
          altText: selected.altText,
          placement: selected.placement,
          zoom: selected.zoom,
          focalPointX: selected.focalPointX,
          focalPointY: selected.focalPointY,
          objectFit: selected.objectFit,
          brightness: selected.brightness,
          contrast: selected.contrast,
          saturation: selected.saturation,
          sortOrder: selected.sortOrder,
          storageBucket: selected.storageBucket,
          storagePath: selected.storagePath,
          isPublished: selected.isPublished,
        }, selected.id);
        setAssets((current) => current.map((asset) => asset.id === selected.id ? uploaded : asset));
        window.dispatchEvent(new CustomEvent("susstem-media-updated"));
      }
      setSaved(false);
    } catch (error) {
      console.error("Unable to replace media:", error);
      setUploadError(getMediaErrorMessage(error, "upload"));
    } finally {
      setSavingLoader(false);
    }
  };

  const moveAsset = (direction: "up" | "down", targetId?: string) => {
    const focusId = targetId || selected?.id;
    if (!focusId) return;

    const currentIdx = placementAssets.findIndex((a) => a.id === focusId);
    if (currentIdx === -1) return;

    const targetIdx = direction === "up" ? currentIdx - 1 : currentIdx + 1;
    if (targetIdx < 0 || targetIdx >= placementAssets.length) return;

    const currentAsset = placementAssets[currentIdx];
    const targetAsset = placementAssets[targetIdx];

    const currentOrder = currentAsset.sortOrder ?? 0;
    const targetOrder = targetAsset.sortOrder ?? 0;

    let updatedAssets = [...assets];
    if (currentOrder === targetOrder) {
      updatedAssets = assets.map((asset) => {
        const idx = placementAssets.findIndex((pa) => pa.id === asset.id);
        if (idx !== -1) {
          let newOrder = idx * 10;
          if (asset.id === focusId) {
            newOrder = targetIdx * 10;
          } else if (asset.id === targetAsset.id) {
            newOrder = currentIdx * 10;
          }
          return { ...asset, sortOrder: newOrder };
        }
        return asset;
      });
    } else {
      updatedAssets = assets.map((asset) => {
        if (asset.id === focusId) {
          return { ...asset, sortOrder: targetOrder };
        }
        if (asset.id === targetAsset.id) {
          return { ...asset, sortOrder: currentOrder };
        }
        return asset;
      });
    }
    setAssets(updatedAssets);
    setSaved(false);
  };

  const save = async () => {
    try {
      setSavingLoader(true);
      if (isSupabaseConfigured) await Promise.all(assets.map((asset) => saveMediaAsset(asset)));
      if (!isSupabaseConfigured) throw new Error("Supabase is not configured");
      setSaved(true);
      window.dispatchEvent(new CustomEvent("susstem-media-updated"));
      window.setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Unable to save media:", error);
      setUploadError(getMediaErrorMessage(error, "save"));
    } finally {
      setSavingLoader(false);
    }
  };

  const removeSelected = async (targetId?: string) => {
    const focusId = targetId || selected?.id;
    if (!focusId) return;

    const targetAsset = assets.find((a) => a.id === focusId);
    if (!targetAsset) return;

    if (!window.confirm(`Are you sure you want to permanently remove this visual ("${targetAsset.title || 'Untitled'}")?`)) {
      return;
    }

    setUploadError("");
    try {
      setSavingLoader(true);
      if (isSupabaseConfigured) {
        await deleteMediaAsset(targetAsset);
      }
      const next = assets.filter((asset) => asset.id !== focusId);
      setAssets(next);
      if (selectedId === focusId) {
        setSelectedId(next.find((asset) => asset.placement === activePlacement)?.id ?? null);
      }
      setSaved(true);
      window.dispatchEvent(new CustomEvent("susstem-media-updated"));
      window.setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Unable to remove media:", error);
      setUploadError(getMediaErrorMessage(error, "remove"));
    } finally {
      setSavingLoader(false);
    }
  };

  const togglePublishItem = (assetId: string) => {
    setAssets((current) => current.map((asset) => {
      if (asset.id === assetId) {
        return { ...asset, isPublished: !(asset.isPublished ?? true) };
      }
      return asset;
    }));
    setSaved(false);
  };

  if (authLoading) return <div className="flex min-h-screen items-center justify-center bg-[#f4f8f7] text-lg text-[#072d2d] font-semibold">Checking admin credentials...</div>;
  if (!signedInEmail) return <main className="flex min-h-screen items-center justify-center bg-[#f4f8f7] px-5 text-[#072d2d]"><form onSubmit={(event) => { event.preventDefault(); void signIn(); }} className="w-full max-w-md space-y-5 rounded-3xl border border-[#dce8e5] bg-white p-7 shadow-sm"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6b8983]">SusSTEM media</p><h1 className="mt-2 text-3xl font-semibold">Admin sign in</h1><p className="mt-2 text-sm text-[#607975]">Sign in to manage hero, gallery, and newsletter media.</p></div><label className="block text-sm font-semibold">Email<input type="email" required value={adminEmail} onChange={(event) => setAdminEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-[#dce8e5] px-4 py-3 font-normal" /></label><label className="block text-sm font-semibold">Password<input type="password" required value={adminPassword} onChange={(event) => setAdminPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-[#dce8e5] px-4 py-3 font-normal" /></label>{authError ? <p className="text-sm text-red-700">{authError}</p> : null}<button type="submit" className="w-full rounded-xl bg-[#20593a] px-4 py-3 text-base font-semibold text-white">Sign in</button></form></main>;

  return (
    <div className="min-h-screen bg-[#f4f8f7] text-[#072d2d] font-sans antialiased">
      <header className="sticky top-0 z-40 border-b border-[#dce8e5]/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => onNavigate?.("home")} className="rounded-xl p-2.5 text-[#35514e] hover:bg-[#eaf3f1] transition-all" aria-label="Back to website"><ArrowLeft className="h-5 w-5" /></button>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b8983]">SusSTEM Portal</p>
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Media Workspace</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-medium text-[#607975] md:block">{signedInEmail}</span>
            <button type="button" onClick={() => void supabase?.auth.signOut()} className="rounded-xl p-2.5 text-[#35514e] hover:bg-red-50 hover:text-red-700 transition-all" title="Sign out"><LogOut className="h-4.5 w-4.5" /></button>
            <button type="button" onClick={save} disabled={savingLoader} className="inline-flex items-center gap-2 rounded-xl bg-[#20593a] px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#072d2d] active:scale-95 disabled:opacity-50 transition-all">
              <Save className="h-4 w-4" /> 
              {savingLoader ? "Processing..." : saved ? "Changes Saved ✓" : "Save Changes"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8">
        <section className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#6b8983]">Quick navigation / choose location</p>
          <div className="grid gap-4 md:grid-cols-3">
            {placementOptions.map(({ id, label, description, icon: Icon }) => (
              <button key={id} type="button" onClick={() => { setActivePlacement(id); setSelectedId(null); }} className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 cursor-pointer ${activePlacement === id ? "border-[#20593a] bg-[#eaf3f1] shadow-[0_0_0_2px_#20593a]" : "border-[#dce8e5] bg-white hover:border-[#7da79e] hover:shadow-sm"}`}>
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all ${activePlacement === id ? "bg-[#20593a] text-white" : "bg-[#edf5f2] text-[#20593a]"}`}><Icon className="h-5.5 w-5.5" /></span>
                <span>
                  <strong className="block text-base font-semibold">{label}</strong>
                  <span className="mt-0.5 block text-xs text-[#607975]">{description}</span>
                </span>
                {activePlacement === id ? <Check className="ml-auto h-5 w-5 text-[#20593a]" /> : null}
              </button>
            ))}
          </div>
        </section>

        <div className="grid items-start gap-8 xl:grid-cols-[1fr_420px]">
          <section className="space-y-8">
            {/* Unified Upload Area */}
            <div className="rounded-2xl border border-[#dce8e5] bg-white p-5 shadow-sm sm:p-6 transition-all">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6b8983]">{getPlacementLabel(activePlacement)} context</p>
                  <h2 className="mt-1 text-xl font-bold">Add New / Replace Media File</h2>
                  <p className="mt-1 text-sm text-[#607975]">Upload beautiful new media to the library, or select any image/video below and click "Replace selected media" to replace it.</p>
                </div>
                <ImagePlus className="h-6 w-6 text-[#7da79e]" />
              </div>
              <UnifiedUploadDropzone onAssetsReady={addAssets} onReplaceFileReady={replaceSelected} />
              {uploadError ? <p className="mt-4 rounded-xl bg-[#fff1f0] px-4 py-3 text-sm font-semibold text-[#b42318]">{uploadError}</p> : null}
            </div>

            {/* Library list */}
            <div className="rounded-2xl border border-[#dce8e5] bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6 flex items-end justify-between gap-4 border-b border-[#f0f5f4] pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6b8983]">WORKSPACE COLLECTION</p>
                  <h2 className="mt-1 text-xl font-bold">{getPlacementLabel(activePlacement)} Library Items</h2>
                </div>
                <span className="rounded-full bg-[#eaf3f1] px-3 py-1.5 text-xs font-bold text-[#20593a]">{placementAssets.length} {placementAssets.length === 1 ? "item" : "items"}</span>
              </div>

              {placementAssets.length ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {placementAssets.map((asset, index) => {
                    const isItemActive = selected?.id === asset.id;
                    return (
                      <div key={asset.id} onClick={() => setSelectedId(asset.id)} className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 transition-all ${isItemActive ? "border-[#20593a] ring-4 ring-[#b9d5ca] shadow-md scale-[1.01]" : "border-transparent hover:border-[#7da79e]"} ${activePlacement === "hero" ? "aspect-[16/10]" : "aspect-[4/5]"} bg-[#eaf3f1]`}>
                        {asset.mediaType === "video" ? (
                          <video src={asset.url} muted className="h-full w-full object-cover pointer-events-none" />
                        ) : (
                          <img src={asset.url} alt={asset.altText} className="h-full w-full object-cover pointer-events-none" />
                        )}

                        {/* Top controls overlay on hover */}
                        <div className="absolute top-2 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-all duration-200 z-10">
                          <div className="flex gap-1.5">
                            <button type="button" title="Move Left/Up" disabled={index === 0} onClick={(e) => { e.stopPropagation(); moveAsset("up", asset.id); }} className="p-1.5 bg-white/95 hover:bg-white text-[#20593a] rounded-lg shadow-sm hover:scale-105 active:scale-95 disabled:opacity-30"><ArrowUp className="h-3.5 w-3.5" /></button>
                            <button type="button" title="Move Right/Down" disabled={index === placementAssets.length - 1} onClick={(e) => { e.stopPropagation(); moveAsset("down", asset.id); }} className="p-1.5 bg-white/95 hover:bg-white text-[#20593a] rounded-lg shadow-sm hover:scale-105 active:scale-95 disabled:opacity-30"><ArrowDown className="h-3.5 w-3.5" /></button>
                          </div>
                          <div className="flex gap-1.5">
                            <button type="button" title={asset.isPublished ?? true ? "Mark Unpublished" : "Mark Published"} onClick={(e) => { e.stopPropagation(); togglePublishItem(asset.id); }} className={`p-1.5 ${asset.isPublished ?? true ? 'bg-[#20593a] text-white' : 'bg-red-500 text-white'} rounded-lg shadow-sm hover:scale-105`}>
                              {asset.isPublished ?? true ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                            </button>
                            <button type="button" title="Permanently Delete" onClick={(e) => { e.stopPropagation(); removeSelected(asset.id); }} className="p-1.5 bg-red-600 text-white hover:bg-red-700 rounded-lg shadow-sm hover:scale-105 active:scale-95"><Trash2 className="h-3.5 w-3.5" /></button>
                          </div>
                        </div>

                        {/* Item metadata strip */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8 flex items-end justify-between">
                          <span className="truncate text-xs font-semibold text-white max-w-[70%]">{asset.title || "Untitled Media"}</span>
                          <span className="text-[10px] font-bold text-white/90 bg-[#20593a] px-2 py-0.5 rounded-md uppercase tracking-wider scale-90">Order {asset.sortOrder ?? 0}</span>
                        </div>

                        {isItemActive && (
                          <div className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#20593a] text-white shadow-md border border-white z-20">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-[#cbded9] bg-[#fbfdfc] px-6 py-14 text-center">
                  <UploadCloud className="mx-auto h-10 w-10 text-[#7da79e]" />
                  <p className="mt-4 text-base font-bold">No {getPlacementLabel(activePlacement).toLowerCase()} media uploaded yet</p>
                  <p className="mt-1 text-sm text-[#607975]">Use the Add New dropzone above to drop your first file!</p>
                </div>
              )}
            </div>
          </section>

          {/* Sidebar editor */}
          <aside className="space-y-6 xl:sticky xl:top-[88px]">
            {selected ? (
              <>
                <div className="rounded-2xl border border-[#dce8e5] bg-white p-5 shadow-sm sm:p-6">
                  <div className="mb-5 flex items-start justify-between border-b border-[#f0f5f4] pb-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6b8983]">Editing Selected Visual</p>
                      <h2 className="mt-1 text-xl font-bold truncate max-w-[280px]">{selected.title || "Untitled asset"}</h2>
                    </div>
                    {selected.mediaType === "video" ? <Video className="h-6 w-6 text-[#7da79e]" /> : <ImagePlus className="h-6 w-6 text-[#7da79e]" />}
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-[#35514e]">
                      Title / Banner Text
                      <input value={selected.title} onChange={(event) => updateSelected({ title: event.target.value })} className="mt-2 w-full rounded-xl border border-[#dce8e5] bg-white px-4 py-2.5 font-normal text-sm outline-none focus:border-[#20593a] focus:ring-2 focus:ring-[#b9d5ca] transition" placeholder="e.g. Inspiring STEM Minds" />
                    </label>

                    <label className="block text-sm font-bold text-[#35514e]">
                      Alt Text / Description
                      <span className="ml-1 text-xs font-normal text-[#607975]">for screen readers</span>
                      <textarea value={selected.altText} onChange={(event) => updateSelected({ altText: event.target.value })} rows={2} className="mt-2 w-full resize-none rounded-xl border border-[#dce8e5] bg-white px-4 py-2.5 font-normal text-sm outline-none focus:border-[#20593a] focus:ring-2 focus:ring-[#b9d5ca] transition" placeholder="Description of what is in this image..." />
                    </label>

                    <div className="flex items-center gap-2.5 rounded-xl border border-[#dce8e5] bg-[#fdfefd] p-3 shadow-2xs select-none cursor-pointer hover:border-[#20593a] transition-all">
                      <input type="checkbox" id="sidebar-publish-check" checked={selected.isPublished ?? true} onChange={(event) => updateSelected({ isPublished: event.target.checked })} className="h-5 w-5 rounded border-[#dce8e5] text-[#20593a] focus:ring-[#20593a] accent-[#20593a]" />
                      <label htmlFor="sidebar-publish-check" className="text-sm font-bold text-[#35514e] cursor-pointer">
                        Publish/show on public pages
                      </label>
                    </div>

                    <div>
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#6b8983]">Asset Placement Location</p>
                      <div className="grid grid-cols-3 gap-2">
                        {placementOptions.map(({ id, label }) => (
                          <button key={id} type="button" onClick={() => { updateSelected({ placement: id }); setActivePlacement(id); }} className={`rounded-xl py-2.5 text-xs font-bold transition-all border ${selected.placement === id ? "bg-[#20593a] border-[#20593a] text-white shadow-xs" : "bg-[#f2f7f5] border-transparent text-[#35514e] hover:bg-[#eaf3f1]"}`}>{label.split(" ")[0]}</button>
                        ))}
                      </div>
                      <p className="mt-2.5 text-[11px] leading-relaxed text-[#607975]">If an item has placement <strong>"Both"</strong>, it automatically shows in both the Homepage Slider carousel and the Gallery collection.</p>
                    </div>
                  </div>
                </div>

                <AdminFramingControls asset={selected} onChange={(next) => updateSelected(next)} onMoveUp={() => moveAsset("up")} onMoveDown={() => moveAsset("down")} canMoveUp={canMoveUp} canMoveDown={canMoveDown} />

                <button type="button" onClick={() => removeSelected()} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-red-100 bg-white py-3.5 text-sm font-bold text-red-600 hover:bg-red-50 hover:border-red-200 cursor-pointer active:scale-98 transition-all"><Trash2 className="h-4.5 w-4.5" /> Permanently Delete This Visual</button>
              </>
            ) : (
              <div className="rounded-2xl border border-[#dce8e5] bg-white p-7 text-center shadow-sm">
                <ImagePlus className="mx-auto h-9 w-9 text-[#9cbdb4]" />
                <h2 className="mt-3 text-lg font-bold">Select any visual to edit</h2>
                <p className="mt-1 text-sm text-[#607975]">Your {getPlacementLabel(activePlacement).toLowerCase()} library items will appear here for adjustments.</p>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
