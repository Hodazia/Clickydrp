'use client'

import { useEffect, useMemo, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { ChevronRight } from 'lucide-react'

type Theme = {
  id?: string
  viewportType: string
  viewportColor?: string | null
  viewportImage?: string | null
  viewportGradient?: string | null
  cardType: string
  cardColor?: string | null
  cardImage?: string | null
  cardGradient?: string | null
  cardBlur?: number | null
  linksBackground?: string | null
  linksFontColor?: string | null
  linksBorderRadius?: number | null
  linksSpacing?: number | null
  linksHoverColor?: string | null
  bioFontColor?: string | null
  bioFontSize?: number | null
  bioFontFamily?: string | null
  socialsIconColor?: string | null
  socialsIconHoverColor?: string | null
  socialsSize?: number | null
  profileShape: string
  profileBorderColor?: string | null
  profileBorderWidth?: number | null
}

const defaultTheme: Theme = {
  viewportType: 'color',
  viewportColor: '#ffffff',
  viewportImage: '',
  viewportGradient: 'linear-gradient(135deg,#e9efff,#fff0f5)',
  cardType: 'color',
  cardColor: '#ffffff',
  cardImage: '',
  cardGradient: 'linear-gradient(135deg,#ffffff,#fafafa)',
  cardBlur: 0,
  linksBackground: '#111827',
  linksFontColor: '#ffffff',
  linksBorderRadius: 16,
  linksSpacing: 12,
  linksHoverColor: '#1f2937',
  bioFontColor: '#111827',
  bioFontSize: 16,
  bioFontFamily: 'Inter',
  socialsIconColor: '#111827',
  socialsIconHoverColor: '#000000',
  socialsSize: 18,
  profileShape: 'circle',
  profileBorderColor: '#e5e7eb',
  profileBorderWidth: 2,
}

const tabs = ['Background', 'Text', 'Buttons', 'Cards', 'Socials', 'Profile'] as const
type Tab = typeof tabs[number]

export default function ThemeEditor() {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [activeTab, setActiveTab] = useState<Tab>('Background')
  const [submitting, setSubmitting] = useState(false)

  // Load existing theme
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/themes', { credentials: 'include' })
        if (!res.ok) throw new Error('Failed to load theme')
        const data: Theme = await res.json()
        setTheme({ ...defaultTheme, ...data })
      } catch {
        toast.error('Could not load theme')
      }
    }
    load()
  }, [])

  const previewStyle = useMemo<React.CSSProperties>(() => {
    let background = '#ffffff'
    if (theme.viewportType === 'color') background = theme.viewportColor || '#ffffff'
    if (theme.viewportType === 'gradient') background = theme.viewportGradient || 'linear-gradient(135deg,#e9efff,#fff0f5)'
    if (theme.viewportType === 'image') background = `url(${theme.viewportImage}) center/cover no-repeat`
    return { background }
  }, [theme])

  const cardStyle = useMemo<React.CSSProperties>(() => {
    let background = theme.cardColor || '#ffffff'
    if (theme.cardType === 'gradient') background = theme.cardGradient || defaultTheme.cardGradient!
    if (theme.cardType === 'image') background = `url(${theme.cardImage}) center/cover no-repeat`
    return {
      background,
      filter: theme.cardBlur ? `blur(${theme.cardBlur}px)` : undefined,
    }
  }, [theme])

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('http://localhost:3000/api/themes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(theme),
      })
      if (!res.ok) throw new Error('Failed to save theme')
      const saved = await res.json()
      setTheme({ ...theme, ...saved })
      toast.success('Theme saved!')
    } catch (e: any) {
      toast.error(e.message || 'Failed to save')
    } finally {
      setSubmitting(false)
    }
  }

  const Section = ({ children, title }: { children: React.ReactNode; title: string }) => (
    <Card className="glass-card border-accent/20">
      <CardContent className="p-5 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 text-accent">✦</span>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
        <div className="grid gap-4">{children}</div>
      </CardContent>
    </Card>
  )

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-8">
      {/* Controls */}
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-lg border transition ${
                activeTab === t ? 'border-accent text-accent bg-accent/10' : 'border-border hover:bg-muted'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {activeTab === 'Background' && (
          <Section title="Background Settings">
            <div>
              <Label className="text-sm">Background Type</Label>
              <select
                value={theme.viewportType}
                onChange={(e) => setTheme((v) => ({ ...v, viewportType: e.target.value }))}
                className="mt-1 w-full rounded-md border bg-background p-2"
              >
                <option value="color">Solid Color</option>
                <option value="gradient">Gradient</option>
                <option value="image">Image URL</option>
              </select>
            </div>

            {theme.viewportType === 'color' && (
              <div>
                <Label className="text-sm">Background Color</Label>
                <div className="mt-1 flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.viewportColor || '#ffffff'}
                    onChange={(e) => setTheme((v) => ({ ...v, viewportColor: e.target.value }))}
                    className="h-10 w-10 rounded-md"
                  />
                  <Input
                    value={theme.viewportColor || ''}
                    onChange={(e) => setTheme((v) => ({ ...v, viewportColor: e.target.value }))}
                  />
                </div>
              </div>
            )}

            {theme.viewportType === 'gradient' && (
              <div>
                <Label className="text-sm">CSS Gradient</Label>
                <Input
                  placeholder="linear-gradient(135deg,#e9efff,#fff0f5)"
                  value={theme.viewportGradient || ''}
                  onChange={(e) => setTheme((v) => ({ ...v, viewportGradient: e.target.value }))}
                />
              </div>
            )}

            {theme.viewportType === 'image' && (
              <div>
                <Label className="text-sm">Background Image URL</Label>
                <Input
                  placeholder="https://..."
                  value={theme.viewportImage || ''}
                  onChange={(e) => setTheme((v) => ({ ...v, viewportImage: e.target.value }))}
                />
              </div>
            )}
          </Section>
        )}

        {activeTab === 'Text' && (
          <Section title="Text Settings">
            <div>
              <Label className="text-sm">Bio Font Color</Label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="color"
                  value={theme.bioFontColor || '#111827'}
                  onChange={(e) => setTheme((v) => ({ ...v, bioFontColor: e.target.value }))}
                  className="h-10 w-10 rounded-md"
                />
                <Input
                  value={theme.bioFontColor || ''}
                  onChange={(e) => setTheme((v) => ({ ...v, bioFontColor: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">Font Size (px)</Label>
                <Input
                  type="number"
                  min={10}
                  max={28}
                  value={theme.bioFontSize || 16}
                  onChange={(e) => setTheme((v) => ({ ...v, bioFontSize: Number(e.target.value) }))}
                />
              </div>
              <div>
                <Label className="text-sm">Font Family</Label>
                <Input
                  placeholder="Inter, Roboto, ..."
                  value={theme.bioFontFamily || ''}
                  onChange={(e) => setTheme((v) => ({ ...v, bioFontFamily: e.target.value }))}
                />
              </div>
            </div>
          </Section>
        )}

        {activeTab === 'Buttons' && (
          <Section title="Links/Button Settings">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">Background</Label>
                <Input
                  value={theme.linksBackground || ''}
                  onChange={(e) => setTheme((v) => ({ ...v, linksBackground: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-sm">Text Color</Label>
                <Input
                  value={theme.linksFontColor || ''}
                  onChange={(e) => setTheme((v) => ({ ...v, linksFontColor: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-sm">Border Radius</Label>
                <Input
                  type="number"
                  min={0}
                  max={30}
                  value={theme.linksBorderRadius || 16}
                  onChange={(e) => setTheme((v) => ({ ...v, linksBorderRadius: Number(e.target.value) }))}
                />
              </div>
              <div>
                <Label className="text-sm">Spacing</Label>
                <Input
                  type="number"
                  min={4}
                  max={32}
                  value={theme.linksSpacing || 12}
                  onChange={(e) => setTheme((v) => ({ ...v, linksSpacing: Number(e.target.value) }))}
                />
              </div>
              <div>
                <Label className="text-sm">Hover Color</Label>
                <Input
                  value={theme.linksHoverColor || ''}
                  onChange={(e) => setTheme((v) => ({ ...v, linksHoverColor: e.target.value }))}
                />
              </div>
            </div>
          </Section>
        )}

        {activeTab === 'Cards' && (
          <Section title="Card Settings">
            <div>
              <Label className="text-sm">Card Type</Label>
              <select
                value={theme.cardType}
                onChange={(e) => setTheme((v) => ({ ...v, cardType: e.target.value }))}
                className="mt-1 w-full rounded-md border bg-background p-2"
              >
                <option value="color">Solid Color</option>
                <option value="gradient">Gradient</option>
                <option value="image">Image URL</option>
              </select>
            </div>
            {theme.cardType === 'color' && (
              <div>
                <Label className="text-sm">Card Color</Label>
                <Input
                  value={theme.cardColor || ''}
                  onChange={(e) => setTheme((v) => ({ ...v, cardColor: e.target.value }))}
                />
              </div>
            )}
            {theme.cardType === 'gradient' && (
              <div>
                <Label className="text-sm">Card Gradient</Label>
                <Input
                  value={theme.cardGradient || ''}
                  onChange={(e) => setTheme((v) => ({ ...v, cardGradient: e.target.value }))}
                />
              </div>
            )}
            {theme.cardType === 'image' && (
              <div>
                <Label className="text-sm">Card Image URL</Label>
                <Input
                  value={theme.cardImage || ''}
                  onChange={(e) => setTheme((v) => ({ ...v, cardImage: e.target.value }))}
                />
              </div>
            )}
            <div>
              <Label className="text-sm">Card Blur (px)</Label>
              <Input
                type="number"
                min={0}
                max={10}
                value={theme.cardBlur || 0}
                onChange={(e) => setTheme((v) => ({ ...v, cardBlur: Number(e.target.value) }))}
              />
            </div>
          </Section>
        )}

        {activeTab === 'Socials' && (
          <Section title="Social Icon Settings">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-sm">Icon Color</Label>
                <Input
                  value={theme.socialsIconColor || ''}
                  onChange={(e) => setTheme((v) => ({ ...v, socialsIconColor: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-sm">Hover Color</Label>
                <Input
                  value={theme.socialsIconHoverColor || ''}
                  onChange={(e) => setTheme((v) => ({ ...v, socialsIconHoverColor: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-sm">Size (px)</Label>
                <Input
                  type="number"
                  min={12}
                  max={28}
                  value={theme.socialsSize || 18}
                  onChange={(e) => setTheme((v) => ({ ...v, socialsSize: Number(e.target.value) }))}
                />
              </div>
            </div>
          </Section>
        )}

        {activeTab === 'Profile' && (
          <Section title="Profile Image Settings">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-sm">Shape</Label>
                <select
                  value={theme.profileShape}
                  onChange={(e) => setTheme((v) => ({ ...v, profileShape: e.target.value }))}
                  className="mt-1 w-full rounded-md border bg-background p-2"
                >
                  <option value="circle">Circle</option>
                  <option value="rounded">Rounded</option>
                  <option value="square">Square</option>
                </select>
              </div>
              <div>
                <Label className="text-sm">Border Color</Label>
                <Input
                  value={theme.profileBorderColor || ''}
                  onChange={(e) => setTheme((v) => ({ ...v, profileBorderColor: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-sm">Border Width</Label>
                <Input
                  type="number"
                  min={0}
                  max={12}
                  value={theme.profileBorderWidth || 0}
                  onChange={(e) => setTheme((v) => ({ ...v, profileBorderWidth: Number(e.target.value) }))}
                />
              </div>
            </div>
          </Section>
        )}

        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={submitting} className="px-6">
            Save Changes
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Preview */}
      <div>
        <Card className="border-accent/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Preview</h3>
            <div
              className="rounded-2xl border overflow-hidden p-6 flex items-center justify-center"
              style={{ background: previewStyle.background as any }}
            >
              <div className="w-[320px] rounded-[2rem] bg-white shadow-xl border relative overflow-hidden">
                <div className="h-24" style={{ background: cardStyle.background as any }} />
                <div className="-mt-10 flex flex-col items-center px-6 pb-6">
                  <div
                    className="w-20 h-20 bg-white shadow-md"
                    style={{
                      borderRadius:
                        theme.profileShape === 'circle' ? '9999px' : theme.profileShape === 'rounded' ? '16px' : '0px',
                      border: `${theme.profileBorderWidth || 0}px solid ${theme.profileBorderColor || 'transparent'}`,
                    }}
                  />
                  <h4 className="mt-3 font-semibold">Goodtime Monty</h4>
                  <p
                    className="text-center text-sm mt-1"
                    style={{ color: theme.bioFontColor || '#111827', fontSize: (theme.bioFontSize || 16) + 'px' }}
                  >
                    The perfect host for slow travelers. Say hello to learn what Monty can do for you.
                  </p>

                  {/* Links */}
                  <div className="w-full mt-4 space-y-3">
                    {[1, 2, 3].map((i) => (
                      <button
                        key={i}
                        className="w-full h-10 font-medium transition-colors"
                        style={{
                          color: theme.linksFontColor || '#ffffff',
                          background: theme.linksBackground || '#111827',
                          borderRadius: (theme.linksBorderRadius || 16) + 'px',
                        }}
                      >
                        Link {i}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
