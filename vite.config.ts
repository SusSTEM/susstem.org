import { defineConfig } from 'vite'
import path from 'path'
import fs from 'node:fs'
import { execFileSync } from 'node:child_process'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

function galleryManifestPlugin() {
  const galleryDirectory = path.resolve(__dirname, 'public/assets/gallery')
  const syncScript = path.resolve(__dirname, 'scripts/unzip-gallery.js')
  let syncing = false

  const syncManifest = () => {
    if (syncing || !fs.existsSync(galleryDirectory)) return false
    syncing = true
    try {
      execFileSync(process.execPath, [syncScript], { stdio: 'ignore' })
    } finally {
      syncing = false
    }
    return true
  }

  return {
    name: 'gallery-manifest-sync',
    buildStart: syncManifest,
    configureServer(server) {
      syncManifest()
      server.watcher.add(galleryDirectory)
      const handleChange = (file) => {
        if (file.startsWith(galleryDirectory) && !file.endsWith('manifest.json') && syncManifest()) {
          server.ws.send({ type: 'full-reload' })
        }
      }
      server.watcher.on('add', handleChange)
      server.watcher.on('unlink', handleChange)
      server.watcher.on('change', handleChange)
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    galleryManifestPlugin(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app'),
    },
  },
})
