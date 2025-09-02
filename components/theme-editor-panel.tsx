"use client"

import { useEffect, useMemo, useRef } from "react"
import { toRGBA } from "@/lib/color-utils"

export type ThemeState = {
  presetName?: string
  background: {
    mode: "color" | "image"
    color: string
    colorAlpha: number
    imageUrl: string
    objectUrl?: string
    size: "cover" | "contain"
    position: "center" | "top" | "bottom" | "left" | "right"
    blur: number
    opacity: number
    gradient?: string | null
  }
  profile: {
    photoUrl: string
    photoObjectUrl?: string
    radius: "circle" | "rounded" | "square"
    size: number
    borderColor: string
    borderWidth: number
  }
  typography: {
    font: "system" | "inter" | "roboto" | "playfair"
    baseSize: number
    headingWeight: 500 | 600 | 700 | 800
    textColor: string
  }
  links: {
    textColor: string
    bgColor: string
    hoverUnderline: boolean
    hoverBg: boolean
    hoverScale: boolean
    hoverIntensity: number
    radius: number
    paddingY: number
    paddingX: number
    shadow: boolean
    elevation: number
    borderColor: string
    borderWidth: number
  }
  cards: {
    bgColor: string
    bgAlpha: number
    borderColor: string
    borderWidth: number
    gap: number
  }
  layout: {
    spacingY: number
    align: "center" | "left"
    maxWidth: number
  }
  social: {
    color: string
    size: number
    visible: {
      instagram: boolean
      tiktok: boolean
      x: boolean
      facebook: boolean
      youtube: boolean
      github: boolean
    }
  }
  preview: {
    slowNetwork: boolean
  }
}

export const defaultTheme: ThemeState = {
  presetName: "Fresh Blue",
  background: {
    mode: "image",
    color: "#0ea5e9",
    colorAlpha: 1,
    imageUrl: "/images/demo-bg.png",
    size: "cover",
    position: "center",
    blur: 0,
    opacity: 1,
    gradient: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.55) 100%)",
  },
  profile: {
    photoUrl: "/images/demo-avatar.png",
    radius: "circle",
    size: 92,
    borderColor: "#ffffff",
    borderWidth: 3,
  },
  typography: {
    font: "inter",
    baseSize: 16,
    headingWeight: 700,
    textColor: "#ffffff",
  },
  links: {
    textColor: "#111827",
    bgColor: "#ffffff",
    hoverUnderline: false,
    hoverBg: true,
    hoverScale: true,
    hoverIntensity: 0.15,
    radius: 999,
    paddingY: 14,
    paddingX: 18,
    shadow: true,
    elevation: 0.25,
    borderColor: "#000000",
    borderWidth: 0.5,
  },
  cards: {
    bgColor: "#ffffff",
    bgAlpha: 0.18,
    borderColor: "#ffffff",
    borderWidth: 0,
    gap: 14,
  },
  layout: {
    spacingY: 12,
    align: "center",
    maxWidth: 560,
  },
  social: {
    color: "#ffffff",
    size: 22,
    visible: { instagram: true, tiktok: true, x: true, facebook: true, youtube: false, github: false },
  },
  preview: {
    slowNetwork: false,
  },
}

export const themePresets: { name: string; theme: ThemeState }[] = [
  { name: "Fresh Blue", theme: { ...defaultTheme, presetName: "Fresh Blue" } },
  {
    name: "Dark Neon",
    theme: {
      ...defaultTheme,
      presetName: "Dark Neon",
      background: {
        ...defaultTheme.background,
        mode: "color",
        color: "#0b1221",
        colorAlpha: 1,
        gradient:
          "radial-gradient(80% 60% at 50% 20%, rgba(0,255,170,0.2) 0%, rgba(11,18,33,0.9) 60%, rgba(11,18,33,1) 100%)",
        imageUrl: "",
      },
      typography: { ...defaultTheme.typography, textColor: "#e5e7eb", font: "system" },
      social: { ...defaultTheme.social, color: "#a7f3d0" },
      links: {
        ...defaultTheme.links,
        textColor: "#0b1221",
        bgColor: "#a7f3d0",
        borderColor: "#7ae6be",
        hoverBg: true,
      },
      cards: { ...defaultTheme.cards, bgAlpha: 0.06, borderWidth: 0, gap: 16 },
    },
  },
  {
    name: "Paper Minimal",
    theme: {
      ...defaultTheme,
      presetName: "Paper Minimal",
      background: {
        ...defaultTheme.background,
        mode: "color",
        color: "#f8fafc",
        colorAlpha: 1,
        gradient: null,
        imageUrl: "",
      },
      typography: { ...defaultTheme.typography, textColor: "#111827", font: "system" },
      social: { ...defaultTheme.social, color: "#111827" },
      links: {
        ...defaultTheme.links,
        textColor: "#111827",
        bgColor: "#ffffff",
        radius: 14,
        borderColor: "#e5e7eb",
        borderWidth: 1,
        shadow: false,
      },
      cards: { ...defaultTheme.cards, bgColor: "#ffffff", bgAlpha: 1, borderColor: "#e5e7eb", borderWidth: 1, gap: 12 },
    },
  },
]

type Props = {
  theme: ThemeState
  currentDevice: "mobile" | "tablet" | "desktop"
  onChange: (t: ThemeState) => void
  onDeviceChange: (d: "mobile" | "tablet" | "desktop") => void
  onExport: () => void
  onReset: () => void
  onApplyPreset: (name: string) => void
}

export default function ThemeEditorPanel({
  theme,
  onChange,
  currentDevice,
  onDeviceChange,
  onExport,
  onReset,
  onApplyPreset,
}: Props) {
  const fileBgRef = useRef<HTMLInputElement>(null)
  const fileAvatarRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      if (theme.background.objectUrl) URL.revokeObjectURL(theme.background.objectUrl)
      if (theme.profile.photoObjectUrl) URL.revokeObjectURL(theme.profile.photoObjectUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const cardAlphaPreview = useMemo(() => toRGBA(theme.cards.bgColor, theme.cards.bgAlpha), [theme.cards])
  const bgColorPreview = useMemo(() => toRGBA(theme.background.color, theme.background.colorAlpha), [theme.background])

  const update = <K extends keyof ThemeState>(key: K, value: Partial<ThemeState[K]>) =>
    onChange({ ...theme, [key]: { ...(theme[key] as object), ...value } })

  return (
    <aside className="rounded-2xl border bg-white p-4 shadow-sm">
      {/* Top toolbar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <label className="text-sm text-neutral-600" htmlFor="preset">
            Preset
          </label>
          <select
            id="preset"
            aria-label="Theme preset"
            className="rounded-md border px-2 py-1 text-sm"
            value={theme.presetName || "Custom"}
            onChange={(e) => onApplyPreset(e.target.value)}
          >
            {themePresets.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
            <option value="Custom">Custom</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Export theme"
            onClick={onExport}
            className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
          >
            Export JSON
          </button>
          <button
            aria-label="Reset theme"
            onClick={onReset}
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-neutral-50"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Device toggles */}
      <div className="mb-3 flex items-center gap-2">
        <span className="text-xs text-neutral-500">Preview</span>
        {(["mobile", "tablet", "desktop"] as const).map((d) => (
          <button
            key={d}
            aria-label={`${d} preview`}
            onClick={() => onDeviceChange(d)}
            className={`rounded-md border px-2 py-1 text-xs ${currentDevice === d ? "bg-neutral-100" : ""}`}
          >
            {d[0].toUpperCase() + d.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pr-1">
        {/* Background */}
        <section aria-label="Background controls" className="rounded-xl border p-3">
          <h3 className="mb-2 text-sm font-medium">Background</h3>
          <div className="grid grid-cols-2 gap-2">
            <label className="col-span-1 flex items-center gap-2 text-sm">
              <input
                aria-label="Use color background"
                type="radio"
                name="bg-mode"
                checked={theme.background.mode === "color"}
                onChange={() => update("background", { mode: "color" })}
              />
              <span>Color</span>
            </label>
            <label className="col-span-1 flex items-center gap-2 text-sm">
              <input
                aria-label="Use image background"
                type="radio"
                name="bg-mode"
                checked={theme.background.mode === "image"}
                onChange={() => update("background", { mode: "image" })}
              />
              <span>Image</span>
            </label>

            {theme.background.mode === "color" ? (
              <>
                <div className="col-span-2 flex items-center gap-2">
                  <input
                    aria-label="Background color"
                    type="color"
                    className="h-9 w-12 rounded border"
                    value={theme.background.color}
                    onChange={(e) => update("background", { color: e.target.value })}
                  />
                  <input
                    aria-label="Background color hex"
                    className="w-full rounded border px-2 py-1 text-sm"
                    value={theme.background.color}
                    onChange={(e) => update("background", { color: e.target.value })}
                  />
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <label className="text-xs text-neutral-600">Alpha</label>
                  <input
                    aria-label="Background alpha"
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={theme.background.colorAlpha}
                    onChange={(e) => update("background", { colorAlpha: Number(e.target.value) })}
                    className="w-full"
                  />
                  <span className="w-10 text-right text-xs">{Math.round(theme.background.colorAlpha * 100)}%</span>
                </div>
                <div
                  className="col-span-2 rounded-md border bg-[length:16px_16px] p-2 text-xs"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, #eee 25%, transparent 25%), linear-gradient(-45deg, #eee 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(-45deg, transparent 75%, #eee 75%)",
                    backgroundSize: "16px 16px",
                    backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
                    backgroundColor: bgColorPreview,
                  }}
                >
                  Live color with alpha preview
                </div>
              </>
            ) : (
              <>
                <input
                  aria-label="Background image URL"
                  className="col-span-2 w-full rounded border px-2 py-1 text-sm"
                  placeholder="Paste image URL…"
                  value={theme.background.imageUrl}
                  onChange={(e) => update("background", { imageUrl: e.target.value })}
                />
                <div className="col-span-2 flex items-center gap-2">
                  <input
                    ref={fileBgRef}
                    aria-label="Upload background image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      const url = URL.createObjectURL(file)
                      if (theme.background.objectUrl) URL.revokeObjectURL(theme.background.objectUrl)
                      update("background", { objectUrl: url })
                    }}
                  />
                  <button
                    aria-label="Clear uploaded background"
                    className="rounded-md border px-2 py-1 text-xs"
                    onClick={() => {
                      if (theme.background.objectUrl) URL.revokeObjectURL(theme.background.objectUrl)
                      update("background", { objectUrl: undefined, imageUrl: "" })
                      if (fileBgRef.current) fileBgRef.current.value = ""
                    }}
                  >
                    Clear
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-neutral-600">Size</label>
                  <select
                    aria-label="Background size"
                    className="w-full rounded border px-2 py-1 text-sm"
                    value={theme.background.size}
                    onChange={(e) => update("background", { size: e.target.value as any })}
                  >
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-neutral-600">Position</label>
                  <select
                    aria-label="Background position"
                    className="w-full rounded border px-2 py-1 text-sm"
                    value={theme.background.position}
                    onChange={(e) => update("background", { position: e.target.value as any })}
                  >
                    <option value="center">Center</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-neutral-600">Blur</label>
                  <input
                    aria-label="Background blur"
                    type="range"
                    min={0}
                    max={20}
                    step={1}
                    value={theme.background.blur}
                    onChange={(e) => update("background", { blur: Number(e.target.value) })}
                    className="w-full"
                  />
                  <span className="w-8 text-right text-xs">{theme.background.blur}px</span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-neutral-600">Opacity</label>
                  <input
                    aria-label="Background opacity"
                    type="range"
                    min={0.1}
                    max={1}
                    step={0.01}
                    value={theme.background.opacity}
                    onChange={(e) => update("background", { opacity: Number(e.target.value) })}
                    className="w-full"
                  />
                  <span className="w-10 text-right text-xs">{Math.round(theme.background.opacity * 100)}%</span>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Profile */}
        <section aria-label="Profile controls" className="rounded-xl border p-3">
          <h3 className="mb-2 text-sm font-medium">Profile</h3>
          <div className="grid grid-cols-2 gap-2">
            <input
              aria-label="Profile image URL"
              className="col-span-2 w-full rounded border px-2 py-1 text-sm"
              placeholder="Paste avatar URL…"
              value={theme.profile.photoUrl}
              onChange={(e) => update("profile", { photoUrl: e.target.value })}
            />
            <input
              ref={fileAvatarRef}
              aria-label="Upload profile image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (!file) return
                const url = URL.createObjectURL(file)
                if (theme.profile.photoObjectUrl) URL.revokeObjectURL(theme.profile.photoObjectUrl)
                update("profile", { photoObjectUrl: url })
              }}
            />
            <div className="flex items-center gap-2">
              <label className="text-xs text-neutral-600">Shape</label>
              <select
                aria-label="Profile shape"
                className="w-full rounded border px-2 py-1 text-sm"
                value={theme.profile.radius}
                onChange={(e) => update("profile", { radius: e.target.value as any })}
              >
                <option value="circle">Circle</option>
                <option value="rounded">Rounded</option>
                <option value="square">Square</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-neutral-600">Size</label>
              <input
                aria-label="Profile size"
                type="range"
                min={56}
                max={140}
                value={theme.profile.size}
                onChange={(e) => update("profile", { size: Number(e.target.value) })}
                className="w-full"
              />
              <span className="w-10 text-right text-xs">{theme.profile.size}px</span>
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <label className="text-xs text-neutral-600">Border</label>
              <input
                aria-label="Profile border color"
                type="color"
                className="h-9 w-12 rounded border"
                value={theme.profile.borderColor}
                onChange={(e) => update("profile", { borderColor: e.target.value })}
              />
              <input
                aria-label="Profile border width"
                type="range"
                min={0}
                max={8}
                value={theme.profile.borderWidth}
                onChange={(e) => update("profile", { borderWidth: Number(e.target.value) })}
                className="w-full"
              />
              <span className="w-8 text-right text-xs">{theme.profile.borderWidth}px</span>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section aria-label="Typography controls" className="rounded-xl border p-3">
          <h3 className="mb-2 text-sm font-medium">Typography</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <label className="text-xs text-neutral-600">Font</label>
              <select
                aria-label="Font family"
                className="w-full rounded border px-2 py-1 text-sm"
                value={theme.typography.font}
                onChange={(e) => update("typography", { font: e.target.value as any })}
              >
                <option value="system">System</option>
                <option value="inter">Inter</option>
                <option value="roboto">Roboto</option>
                <option value="playfair">Playfair Display</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-neutral-600">Base size</label>
              <input
                aria-label="Base font size"
                type="range"
                min={14}
                max={20}
                value={theme.typography.baseSize}
                onChange={(e) => update("typography", { baseSize: Number(e.target.value) })}
                className="w-full"
              />
              <span className="w-8 text-right text-xs">{theme.typography.baseSize}px</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-neutral-600">Heading weight</label>
              <select
                aria-label="Heading weight"
                className="w-full rounded border px-2 py-1 text-sm"
                value={theme.typography.headingWeight}
                onChange={(e) => update("typography", { headingWeight: Number(e.target.value) as any })}
              >
                <option value={500}>500</option>
                <option value={600}>600</option>
                <option value={700}>700</option>
                <option value={800}>800</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-neutral-600">Text color</label>
              <input
                aria-label="Text color"
                type="color"
                className="h-9 w-12 rounded border"
                value={theme.typography.textColor}
                onChange={(e) => update("typography", { textColor: e.target.value })}
              />
              <input
                aria-label="Text color hex"
                className="w-full rounded border px-2 py-1 text-sm"
                value={theme.typography.textColor}
                onChange={(e) => update("typography", { textColor: e.target.value })}
              />
            </div>
          </div>
        </section>

        {/* Links / Buttons */}
        <section aria-label="Links controls" className="rounded-xl border p-3">
          <h3 className="mb-2 text-sm font-medium">Links / Buttons</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <label className="text-xs text-neutral-600">Text</label>
              <input
                aria-label="Link text color"
                type="color"
                className="h-9 w-12 rounded border"
                value={theme.links.textColor}
                onChange={(e) => update("links", { textColor: e.target.value })}
              />
              <input
                aria-label="Link text hex"
                className="w-full rounded border px-2 py-1 text-sm"
                value={theme.links.textColor}
                onChange={(e) => update("links", { textColor: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-neutral-600">Background</label>
              <input
                aria-label="Link background color"
                type="color"
                className="h-9 w-12 rounded border"
                value={theme.links.bgColor}
                onChange={(e) => update("links", { bgColor: e.target.value })}
              />
              <input
                aria-label="Link background hex"
                className="w-full rounded border px-2 py-1 text-sm"
                value={theme.links.bgColor}
                onChange={(e) => update("links", { bgColor: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-neutral-600">Radius</label>
              <input
                aria-label="Button radius"
                type="range"
                min={0}
                max={999}
                value={theme.links.radius}
                onChange={(e) => update("links", { radius: Number(e.target.value) })}
                className="w-full"
              />
              <span className="w-10 text-right text-xs">{theme.links.radius}px</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-neutral-600">Padding Y</label>
              <input
                aria-label="Button padding Y"
                type="range"
                min={6}
                max={24}
                value={theme.links.paddingY}
                onChange={(e) => update("links", { paddingY: Number(e.target.value) })}
                className="w-full"
              />
              <span className="w-10 text-right text-xs">{theme.links.paddingY}px</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-neutral-600">Padding X</label>
              <input
                aria-label="Button padding X"
                type="range"
                min={10}
                max={32}
                value={theme.links.paddingX}
                onChange={(e) => update("links", { paddingX: Number(e.target.value) })}
                className="w-full"
              />
              <span className="w-10 text-right text-xs">{theme.links.paddingX}px</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-neutral-600">Shadow</label>
              <input
                aria-label="Enable link shadow"
                type="checkbox"
                checked={theme.links.shadow}
                onChange={(e) => update("links", { shadow: e.target.checked })}
              />
              <input
                aria-label="Shadow elevation"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={theme.links.elevation}
                onChange={(e) => update("links", { elevation: Number(e.target.value) })}
                className="w-full"
              />
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <label className="text-xs text-neutral-600">Border</label>
              <input
                aria-label="Link border color"
                type="color"
                className="h-9 w-12 rounded border"
                value={theme.links.borderColor}
                onChange={(e) => update("links", { borderColor: e.target.value })}
              />
              <input
                aria-label="Link border width"
                type="range"
                min={0}
                max={3}
                value={theme.links.borderWidth}
                onChange={(e) => update("links", { borderWidth: Number(e.target.value) })}
                className="w-full"
              />
              <span className="w-8 text-right text-xs">{theme.links.borderWidth}px</span>
            </div>
            <div className="col-span-2 grid grid-cols-3 gap-2 text-xs">
              <label className="flex items-center gap-2">
                <input
                  aria-label="Hover underline"
                  type="checkbox"
                  checked={theme.links.hoverUnderline}
                  onChange={(e) => update("links", { hoverUnderline: e.target.checked })}
                />
                Underline
              </label>
              <label className="flex items-center gap-2">
                <input
                  aria-label="Hover background change"
                  type="checkbox"
                  checked={theme.links.hoverBg}
                  onChange={(e) => update("links", { hoverBg: e.target.checked })}
                />
                Background change
              </label>
              <label className="flex items-center gap-2">
                <input
                  aria-label="Hover scale"
                  type="checkbox"
                  checked={theme.links.hoverScale}
                  onChange={(e) => update("links", { hoverScale: e.target.checked })}
                />
                Scale
              </label>
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <label className="text-xs text-neutral-600">Hover intensity</label>
              <input
                aria-label="Hover intensity"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={theme.links.hoverIntensity}
                onChange={(e) => update("links", { hoverIntensity: Number(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>

          <div className="mt-3 rounded-md border p-2 text-xs" style={{ backgroundColor: cardAlphaPreview }}>
            Link container preview
          </div>
        </section>

        {/* Layout & Cards */}
        <section aria-label="Cards and layout controls" className="rounded-xl border p-3">
          <h3 className="mb-2 text-sm font-medium">Cards & Layout</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <label className="text-xs text-neutral-600">Card BG</label>
              <input
                aria-label="Card background color"
                type="color"
                className="h-9 w-12 rounded border"
                value={theme.cards.bgColor}
                onChange={(e) => update("cards", { bgColor: e.target.value })}
              />
              <input
                aria-label="Card BG alpha"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={theme.cards.bgAlpha}
                onChange={(e) => update("cards", { bgAlpha: Number(e.target.value) })}
                className="w-full"
              />
              <span className="w-10 text-right text-xs">{Math.round(theme.cards.bgAlpha * 100)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-neutral-600">Card gap</label>
              <input
                aria-label="Card gap"
                type="range"
                min={6}
                max={28}
                value={theme.cards.gap}
                onChange={(e) => update("cards", { gap: Number(e.target.value) })}
                className="w-full"
              />
              <span className="w-8 text-right text-xs">{theme.cards.gap}px</span>
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <label className="text-xs text-neutral-600">Card border</label>
              <input
                aria-label="Card border color"
                type="color"
                className="h-9 w-12 rounded border"
                value={theme.cards.borderColor}
                onChange={(e) => update("cards", { borderColor: e.target.value })}
              />
              <input
                aria-label="Card border width"
                type="range"
                min={0}
                max={2}
                value={theme.cards.borderWidth}
                onChange={(e) => update("cards", { borderWidth: Number(e.target.value) })}
                className="w-full"
              />
              <span className="w-8 text-right text-xs">{theme.cards.borderWidth}px</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-neutral-600">Vertical spacing</label>
              <input
                aria-label="Vertical spacing between elements"
                type="range"
                min={8}
                max={40}
                value={theme.layout.spacingY}
                onChange={(e) => update("layout", { spacingY: Number(e.target.value) })}
                className="w-full"
              />
              <span className="w-8 text-right text-xs">{theme.layout.spacingY}px</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-neutral-600">Align</label>
              <select
                aria-label="Layout alignment"
                className="w-full rounded border px-2 py-1 text-sm"
                value={theme.layout.align}
                onChange={(e) => update("layout", { align: e.target.value as any })}
              >
                <option value="center">Center</option>
                <option value="left">Left</option>
              </select>
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <label className="text-xs text-neutral-600">Max width</label>
              <input
                aria-label="Max width of content"
                type="range"
                min={360}
                max={880}
                value={theme.layout.maxWidth}
                onChange={(e) => update("layout", { maxWidth: Number(e.target.value) })}
                className="w-full"
              />
              <span className="w-12 text-right text-xs">{theme.layout.maxWidth}px</span>
            </div>
          </div>
        </section>

        {/* Social Icons */}
        <section aria-label="Social icons controls" className="rounded-xl border p-3">
          <h3 className="mb-2 text-sm font-medium">Social icons</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <label className="text-xs text-neutral-600">Icon color</label>
              <input
                aria-label="Social icon color"
                type="color"
                className="h-9 w-12 rounded border"
                value={theme.social.color}
                onChange={(e) => update("social", { color: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-neutral-600">Icon size</label>
              <input
                aria-label="Social icon size"
                type="range"
                min={14}
                max={30}
                value={theme.social.size}
                onChange={(e) => update("social", { size: Number(e.target.value) })}
                className="w-full"
              />
              <span className="w-8 text-right text-xs">{theme.social.size}px</span>
            </div>
            <div className="col-span-2 grid grid-cols-3 gap-2 text-xs">
              {Object.entries(theme.social.visible).map(([key, val]) => (
                <label key={key} className="flex items-center gap-2 capitalize">
                  <input
                    aria-label={`Toggle ${key} icon visibility`}
                    type="checkbox"
                    checked={val}
                    onChange={(e) =>
                      update("social", { visible: { ...theme.social.visible, [key]: e.target.checked } })
                    }
                  />
                  {key}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Preview Tools */}
        <section aria-label="Preview tools" className="rounded-xl border p-3">
          <h3 className="mb-2 text-sm font-medium">Preview</h3>
          <label className="flex items-center gap-2 text-sm">
            <input
              aria-label="Simulate slow network"
              type="checkbox"
              checked={theme.preview.slowNetwork}
              onChange={(e) => onChange({ ...theme, preview: { ...theme.preview, slowNetwork: e.target.checked } })}
            />
            Simulate slow network
          </label>
        </section>
      </div>
    </aside>
  )
}
