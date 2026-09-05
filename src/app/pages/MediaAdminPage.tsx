import { useEffect, useMemo, useState } from "react";
import { Check, ImagePlus, Save, Trash2, Video } from "lucide-react";
import { AdminFramingControls } from "../components/media/AdminFramingControls";
import { MediaRenderer } from "../components/media/MediaRenderer";
import { UnifiedUploadDropzone } from "../components/media/UnifiedUploadDropzone";
import { DEFAULT_MEDIA_ASSET, readMediaAssets, writeMediaAssets, type MediaAsset, type MediaPlacement } from "../media/mediaTypes";
import { fetchPublishedMedia, saveMediaAsset } from "../media/mediaRepository";
import { fetchPublishedMedia, saveMediaAsset, uploadMediaFile } from "../media/mediaRepository";
import { isSupabaseConfigured } from "../../lib/supabase";
import { supabase } from "../../lib/supabase";

interface MediaAdminPageProps { onNavigate?: (page: string) => void; }

export function MediaAdminPage({ onNavigate }: MediaAdminPageProps) {
  const [assets, setAssets] = useState<MediaAsset[]>(() => readMediaAssets());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [authLoading, setAuthLoading] = useState(isSupabaseConfigured);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const selected = assets.find((asset) => asset.id === selectedId) ?? assets[0];
  const selectedIndex = selected ? assets.findIndex((asset) => asset.id === selected.id) : -1;

  useEffect(() => { if (!selectedId && assets[0]) setSelectedId(assets[0].id); }, [assets, selectedId]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let active = true;
    void fetchPublishedMedia().then((remoteAssets) => {
      if (active && remoteAssets.length) setAssets(remoteAssets);
    }).catch((error) => console.error("Unable to load media from Supabase:", error));
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!supabase) return;
    void supabase.auth.getSession().then(({ data }) => {
      setAdminEmail(data.session?.user.email ?? "");
      setAuthLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAdminEmail(session?.user.email ?? "");
      setAuthLoading(false);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    if (!supabase) return;
    setAuthError("");
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
  const addAssets = (incoming: MediaAsset[]) => {
    if (incoming[0]?.id.startsWith("replace-")) {
      replaceSelected({ ...incoming[0], id: incoming[0].id.slice("replace-".length) });
      return;
    }
    setAssets((current) => [...incoming, ...current]);
    if (incoming[0]) setSelectedId(incoming[0].id);
    setSaved(false);
  };
  const replaceSelected = (incoming: MediaAsset) => {
    if (!selected || incoming.mediaType !== "image") return;
    setAssets((current) => current.map((asset) => asset.id === selected.id ? {
      ...asset,
      url: incoming.url,
      mediaType: incoming.mediaType,
      nativeWidth: incoming.nativeWidth,
      nativeHeight: incoming.nativeHeight,
      sourceName: incoming.sourceName,
      createdAt: incoming.createdAt,
    } : asset));
    setSaved(false);
  };
  const handleUploadedFiles = async (files: File[], drafts: MediaAsset[]) => {
    if (!isSupabaseConfigured) {
      addAssets(drafts);
      return;
    }
    const uploaded = await Promise.all(files.map((file, index) => uploadMediaFile(file, drafts[index])));
    setAssets((current) => [...uploaded, ...current]);
    if (uploaded[0]) setSelectedId(uploaded[0].id);
    setSaved(false);
  };
  const handleReplacementFile = async (file: File, draft: MediaAsset) => {
    if (!selected) return;
    if (!isSupabaseConfigured) {
      replaceSelected(draft);
      return;
    }
    const uploaded = await uploadMediaFile(file, draft, selected.id);
    setAssets((current) => current.map((asset) => asset.id === selected.id ? uploaded : asset));
    setSaved(false);
  };
  <UnifiedUploadDropzone onAssetsReady={addAssets} onFilesReady={handleUploadedFiles} onReplaceFileReady={handleReplacementFile} />
  const save = async () => {
    try {
      if (isSupabaseConfigured) {
        await Promise.all(assets.map((asset) => saveMediaAsset(asset)));
      } else {
        writeMediaAssets(assets);
      }
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
    } catch (error) {
      console.error("Unable to save media:", error);
      setSaved(false);
    }
  };
  const removeSelected = () => { if (!selected) return; const next = assets.filter((asset) => asset.id !== selected.id); setAssets(next); setSelectedId(next[0]?.id ?? null); setSaved(false); };

  const placements = useMemo(() => ["gallery", "hero", "both"] as MediaPlacement[], []);

  if (isSupabaseConfigured && authLoading) return <div className="flex min-h-screen items-center justify-center bg-[#f4f8f7] text-lg text-[#072d2d]">Checking admin access...</div>;
  if (isSupabaseConfigured && !adminEmail) return <main className="flex min-h-screen items-center justify-center bg-[#f4f8f7] px-5 text-[#072d2d]"><form onSubmit={(event) => { event.preventDefault(); void signIn(); }} className="w-full max-w-md space-y-5 rounded-3xl border border-[#dce8e5] bg-white p-7 shadow-sm"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6b8983]">SusSTEM media</p><h1 className="mt-2 text-3xl font-semibold">Admin sign in</h1><p className="mt-2 text-sm text-[#607975]">Sign in to manage hero, gallery, and newsletter media.</p></div><label className="block text-sm font-semibold">Email<input type="email" required value={adminEmail} onChange={(event) => setAdminEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-[#dce8e5] px-4 py-3 font-normal" /></label><label className="block text-sm font-semibold">Password<input type="password" required value={adminPassword} onChange={(event) => setAdminPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-[#dce8e5] px-4 py-3 font-normal" /></label>{authError ? <p className="text-sm text-red-700">{authError}</p> : null}<button type="submit" className="w-full rounded-xl bg-[#20593a] px-4 py-3 text-base font-semibold text-white">Sign in</button></form></main>;

  return <div className="min-h-screen bg-[#f4f8f7] text-[#072d2d]"><header className="border-b border-[#dce8e5] bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b8983]">SusSTEM media</p><h1 className="mt-1 text-2xl font-semibold tracking-tight">Media workspace</h1><p className="mt-1 text-sm text-[#607975]">Upload once, frame everywhere.</p></div><div className="flex items-center gap-2"><button type="button" onClick={() => onNavigate?.("home")} className="rounded-xl px-3 py-2 text-sm font-medium text-[#35514e] hover:bg-[#f0f6f4]">View site</button><button type="button" onClick={save} className="inline-flex items-center gap-2 rounded-xl bg-[#20593a] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#072d2d]"><Save className="h-4 w-4" /> {saved ? "Saved" : "Save changes"}</button></div></div></header><main className="mx-auto grid max-w-7xl gap-6 px-5 py-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_360px]"><section className="space-y-6"><div className="rounded-3xl border border-[#dce8e5] bg-white p-5 shadow-sm sm:p-6"><div className="mb-4 flex items-center justify-between"><div><h2 className="text-lg font-semibold">Add media</h2><p className="mt-1 text-sm text-[#607975]">Images, videos, multiple files, and ZIP archives are supported.</p></div><ImagePlus className="h-5 w-5 text-[#7da79e]" /></div><UnifiedUploadDropzone onAssetsReady={addAssets} /></div><div className="rounded-3xl border border-[#dce8e5] bg-white p-5 shadow-sm sm:p-6"><div className="mb-4 flex items-center justify-between"><div><h2 className="text-lg font-semibold">Your media</h2><p className="mt-1 text-sm text-[#607975]">Select an item to edit its placement and framing.</p></div><span className="rounded-full bg-[#eaf3f1] px-3 py-1 text-xs font-semibold text-[#20593a]">{assets.length} items</span></div>{assets.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">{assets.map((asset) => <button type="button" key={asset.id} onClick={() => setSelectedId(asset.id)} className={`group overflow-hidden rounded-2xl text-left ring-1 transition ${selected?.id === asset.id ? "ring-2 ring-[#20593a]" : "ring-[#dce8e5] hover:ring-[#7da79e]"}`}><div className="relative aspect-square overflow-hidden bg-[#eaf3f1]"><MediaRenderer asset={asset} /><span className="absolute bottom-2 left-2 rounded-md bg-black/55 px-1.5 py-1 text-[10px] font-medium text-white">{asset.mediaType === "video" ? <Video className="mr-1 inline h-3 w-3" /> : null}{asset.nativeWidth} x {asset.nativeHeight}</span></div><div className="truncate px-3 py-2 text-xs font-medium text-[#35514e]">{asset.title}</div></button>)}</div> : <div className="rounded-2xl border border-dashed border-[#cbded9] px-6 py-14 text-center text-sm text-[#607975]">Your uploaded media will appear here.</div>}</div></section><aside className="space-y-6"><div className="rounded-3xl border border-[#dce8e5] bg-white p-5 shadow-sm sm:p-6"><h2 className="text-lg font-semibold">Item settings</h2>{selected ? <div className="mt-5 space-y-5"><div className="overflow-hidden rounded-2xl bg-[#eaf3f1]" style={{ aspectRatio: selected.nativeWidth && selected.nativeHeight ? `${selected.nativeWidth}/${selected.nativeHeight}` : "4/5" }}><MediaRenderer asset={selected} controls={selected.mediaType === "video"} /></div><label className="block text-xs font-semibold text-[#35514e]">Title<input value={selected.title} onChange={(event) => updateSelected({ title: event.target.value })} className="mt-1.5 w-full rounded-xl border border-[#dce8e5] px-3 py-2.5 text-sm font-normal outline-none focus:border-[#20593a]" /></label><label className="block text-xs font-semibold text-[#35514e]">Alt text<input value={selected.altText} onChange={(event) => updateSelected({ altText: event.target.value })} className="mt-1.5 w-full rounded-xl border border-[#dce8e5] px-3 py-2.5 text-sm font-normal outline-none focus:border-[#20593a]" /></label><div><p className="mb-2 text-xs font-semibold text-[#35514e]">Use this media in</p><div className="grid grid-cols-3 gap-1.5">{placements.map((placement) => <button key={placement} type="button" onClick={() => updateSelected({ placement })} className={`rounded-lg px-2 py-2 text-xs font-medium capitalize ${selected.placement === placement ? "bg-[#20593a] text-white" : "bg-[#f4f8f7] text-[#35514e]"}`}>{placement}</button>)}</div></div><AdminFramingControls asset={selected} onChange={(asset) => { setAssets((current) => current.map((item) => item.id === asset.id ? asset : item)); setSaved(false); }} /><button type="button" onClick={removeSelected} className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-800"><Trash2 className="h-4 w-4" /> Remove item</button></div> : <div className="mt-8 text-center text-sm text-[#607975]">Choose an item to edit its settings.</div>}</div><div className="rounded-3xl bg-[#072d2d] p-5 text-white shadow-sm"><div className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 text-[#a2bb65]" /><div><p className="text-sm font-semibold">Safe publishing workflow</p><p className="mt-1 text-xs leading-relaxed text-white/70">Changes stay local until you click Save changes. Connect this screen to your storage provider when you are ready for team-wide publishing.</p></div></div></div></aside></main></div>;
}
