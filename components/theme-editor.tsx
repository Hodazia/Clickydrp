"use client"

import * as React from "react"
import { PhoneFrame } from "./phone-frame"
import { ProfilePreview, defaultUser } from "./profile-preview"
import { cn } from "@/lib/utils"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

type ThemeState = {
  bgType: "image" | "color"
  bgColor: string
  bgImageUrl: string
  textColor: string
  linkTextColor: string
  cardColorHex: string
  cardOpacity: number // 0..100
  cardBorderColor: string
  cardBorderWidth: number
  radius: number
  blurCards: boolean
  shadow: boolean
  overlayDarken: number // 0..80
}

const defaultTheme: ThemeState = {
  bgType: "image",
  bgColor: "#0ea5e9",
  bgImageUrl: "/subtle-abstract-background.png",
  textColor: "#ffffff",
  linkTextColor: "#111827",
  cardColorHex: "#ffffff",
  cardOpacity: 70,
  cardBorderColor: "#111827",
  cardBorderWidth: 1,
  radius: 9999,
  blurCards: true,
  shadow: false,
  overlayDarken: 12,
}

function hexToRgba(hex: string, opacityPct: number) {
  const o = Math.max(0, Math.min(100, opacityPct)) / 100
  let c = hex.replace("#", "")
  if (c.length === 3)
    c = c
      .split("")
      .map((ch) => ch + ch)
      .join("")
  const bigint = Number.parseInt(c, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, ${o})`
}

const STORAGE_KEY = "v0-theme-editor"

export default function ThemeEditor() {
  const [theme, setTheme] = React.useState<ThemeState>(defaultTheme)
  const [device, setDevice] = React.useState<"mobile" | "tablet" | "desktop">("mobile")
  const objectUrlRef = React.useRef<string | null>(null)

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setTheme((t) => ({ ...t, ...(JSON.parse(raw) as ThemeState) }))
    } catch {}
  }, [])

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(theme))
    } catch {}
  }, [theme])

  React.useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    }
  }, [])

  const cardBg = React.useMemo(
    () => hexToRgba(theme.cardColorHex, theme.cardOpacity),
    [theme.cardColorHex, theme.cardOpacity],
  )

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(theme, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "theme.json"
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 md:py-10">
      <div className="flex gap-6 md:gap-8">
        {/* Controls */}
        <aside className="w-[320px] shrink-0 md:sticky md:top-4 md:self-start">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Theme Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs
                defaultValue={theme.bgType}
                onValueChange={(v) => setTheme((t) => ({ ...t, bgType: v as ThemeState["bgType"] }))}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="image">Background Image</TabsTrigger>
                  <TabsTrigger value="color">Background Color</TabsTrigger>
                </TabsList>
                <TabsContent value="image" className="space-y-3">
                  <Label htmlFor="bg-image">Image URL</Label>
                  <Input
                    id="bg-image"
                    aria-label="Background image URL"
                    value={theme.bgImageUrl}
                    onChange={(e) => setTheme((t) => ({ ...t, bgImageUrl: e.target.value }))}
                    placeholder="/images/theme-bg.png"
                  />
                  <div className="flex items-center gap-3">
                    <Label htmlFor="bg-file" className="sr-only">
                      Upload background
                    </Label>
                    <Input
                      id="bg-file"
                      type="file"
                      accept="image/*"
                      aria-label="Upload background image"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
                        const url = URL.createObjectURL(file)
                        objectUrlRef.current = url
                        setTheme((t) => ({ ...t, bgType: "image", bgImageUrl: url }))
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Paste a public URL or upload an image file.</p>
                </TabsContent>
                <TabsContent value="color" className="space-y-3">
                  <Label htmlFor="bg-color">Page Background</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="bg-color"
                      type="color"
                      className="h-10 w-16 p-1"
                      value={theme.bgColor}
                      onChange={(e) => setTheme((t) => ({ ...t, bgColor: e.target.value }))}
                      aria-label="Background color"
                    />
                    <Input
                      value={theme.bgColor}
                      onChange={(e) => setTheme((t) => ({ ...t, bgColor: e.target.value }))}
                      aria-label="Background hex color"
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-2">
                <Label htmlFor="text-color">Primary Text</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="text-color"
                    type="color"
                    className="h-10 w-16 p-1"
                    value={theme.textColor}
                    onChange={(e) => setTheme((t) => ({ ...t, textColor: e.target.value }))}
                  />
                  <Input
                    value={theme.textColor}
                    onChange={(e) => setTheme((t) => ({ ...t, textColor: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="link-text-color">Link Text</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="link-text-color"
                    type="color"
                    className="h-10 w-16 p-1"
                    value={theme.linkTextColor}
                    onChange={(e) => setTheme((t) => ({ ...t, linkTextColor: e.target.value }))}
                  />
                  <Input
                    value={theme.linkTextColor}
                    onChange={(e) => setTheme((t) => ({ ...t, linkTextColor: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Card Color</Label>
                <div className="flex items-center gap-3">
                  <Input
                    type="color"
                    className="h-10 w-16 p-1"
                    value={theme.cardColorHex}
                    onChange={(e) => setTheme((t) => ({ ...t, cardColorHex: e.target.value }))}
                  />
                  <Input
                    value={theme.cardColorHex}
                    onChange={(e) => setTheme((t) => ({ ...t, cardColorHex: e.target.value }))}
                  />
                </div>
                <div className="pt-2">
                  <Label className="mb-2 block">Card Opacity: {theme.cardOpacity}%</Label>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={[theme.cardOpacity]}
                    onValueChange={([v]) => setTheme((t) => ({ ...t, cardOpacity: v }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Border</Label>
                <div className="flex items-center gap-3">
                  <Input
                    type="color"
                    className="h-10 w-16 p-1"
                    value={theme.cardBorderColor}
                    onChange={(e) => setTheme((t) => ({ ...t, cardBorderColor: e.target.value }))}
                    aria-label="Card border color"
                  />
                  <div className="flex-1">
                    <Label className="mb-1 block">Width: {theme.cardBorderWidth}px</Label>
                    <Slider
                      min={0}
                      max={4}
                      step={1}
                      value={[theme.cardBorderWidth]}
                      onValueChange={([v]) => setTheme((t) => ({ ...t, cardBorderWidth: v }))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Corner Radius: {theme.radius}px</Label>
                <Slider
                  min={8}
                  max={9999}
                  step={1}
                  value={[theme.radius]}
                  onValueChange={([v]) => setTheme((t) => ({ ...t, radius: v }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="blur">Backdrop Blur</Label>
                <Switch
                  id="blur"
                  checked={theme.blurCards}
                  onCheckedChange={(v) => setTheme((t) => ({ ...t, blurCards: v }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="shadow">Card Shadow</Label>
                <Switch
                  id="shadow"
                  checked={theme.shadow}
                  onCheckedChange={(v) => setTheme((t) => ({ ...t, shadow: v }))}
                />
              </div>

              <div className="pt-2">
                <Label className="mb-2 block">Background Darken: {theme.overlayDarken}%</Label>
                <Slider
                  min={0}
                  max={80}
                  step={1}
                  value={[theme.overlayDarken]}
                  onValueChange={([v]) => setTheme((t) => ({ ...t, overlayDarken: v }))}
                />
                <p className="mt-1 text-xs text-muted-foreground">Adds a subtle dark overlay for readability.</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  onClick={() => navigator.clipboard?.writeText(JSON.stringify(theme, null, 2)).catch(() => {})}
                  aria-label="Copy theme JSON to clipboard"
                >
                  Copy JSON
                </Button>
                <Button variant="secondary" onClick={handleDownload} aria-label="Download theme JSON">
                  Download JSON
                </Button>
                <Button variant="ghost" onClick={() => setTheme(defaultTheme)} aria-label="Reset theme to defaults">
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Live Preview */}
        <section
          className={cn("relative isolate min-h-[720px] flex-1 overflow-hidden rounded-xl border bg-black")}
          aria-live="polite"
        >
          <div className="absolute right-3 top-3 z-10 flex rounded-md border bg-background p-1 shadow-sm">
            {(["mobile", "tablet", "desktop"] as const).map((d) => (
              <Button
                key={d}
                size="sm"
                variant={device === d ? "default" : "ghost"}
                onClick={() => setDevice(d)}
                aria-label={`Preview ${d}`}
              >
                {d[0].toUpperCase() + d.slice(1)}
              </Button>
            ))}
          </div>

          <div
            className="absolute inset-0 -z-10 bg-cover bg-center"
            style={{
              backgroundColor: theme.bgType === "color" ? theme.bgColor : undefined,
              backgroundImage:
                theme.bgType === "image"
                  ? `url(${theme.bgImageUrl?.trim() ? theme.bgImageUrl : "/subtle-abstract-background.png"})`
                  : undefined,
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10"
            style={{ background: `rgba(0,0,0,${theme.overlayDarken / 100})` }}
            aria-hidden="true"
          />

          <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-start px-4 py-6 md:py-10">
            <PhoneFrame className="bg-transparent border-0 shadow-none" device={device}>
              <ProfilePreview
                user={defaultUser}
                styles={{
                  textColor: theme.textColor,
                  linkTextColor: theme.linkTextColor,
                  cardBg,
                }}
                radius={theme.radius}
                blurCards={theme.blurCards}
                borderColor={theme.cardBorderColor}
                borderWidth={theme.cardBorderWidth}
                shadow={theme.shadow}
              />
            </PhoneFrame>
          </div>
        </section>
      </div>
    </div>
  )
}
