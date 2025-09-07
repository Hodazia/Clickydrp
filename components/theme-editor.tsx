'use client'

import React, { useEffect, useMemo, useState } from 'react'
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
  const [hoveredSocialIdx, setHoveredSocialIdx] = useState<number | null>(null)
  const [hoveredLinkIdx, setHoveredLinkIdx] = useState<number | null>(null)

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

  /*
  fetch the metadata and store it
  fetch the links -> []
  
  
  
  
  */

  
interface Links {
  linkUrl:string,
  linkThumbnail:string,
  description:string
}

interface Social {
  platform:string,
  url:string
}

interface Profile {
  username:string,
  profileimg:string,
  description:string,
  links:Links[],
  socials:Social[],
}

// fetch the data from the api, the data has to be fetched everytime the useEffect runs
// whenever the data changes like links, socials and so on!
const [data,setData] = useState<Profile| null>(null)

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/users/me', { credentials: 'include' })
      if (!res.ok) throw new Error('Failed to load metadata! ')
      const resultantData: Profile = await res.json()
    console.log("Data from the users/me ", resultantData);
      setData(resultantData)
    } catch {
      toast.error('Could not load theme')
    }
  }
  fetchData()
},[])



  // Minimal SVG icons for socials
  const SocialIcons: Record<string, (props: any) => React.ReactElement> = {
    instagram: (props: any) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 3.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm7.2-.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
    ),
    twitter: (props: any) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.28 4.28 0 001.88-2.37 8.56 8.56 0 01-2.71 1.04 4.27 4.27 0 00-7.27 3.9A12.12 12.12 0 013 4.9a4.26 4.26 0 001.32 5.69 4.23 4.23 0 01-1.93-.53v.05a4.27 4.27 0 003.43 4.18 4.24 4.24 0 01-1.92.07 4.27 4.27 0 003.98 2.96A8.56 8.56 0 012 19.54a12.08 12.08 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19-.01-.39-.02-.58A8.7 8.7 0 0024 5.5a8.49 8.49 0 01-2.54.7z"/></svg>
    ),
    tiktok: (props: any) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.3.08.6.13.88.13V9.4c-.33-.03-.67-.05-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4c-.34-.03-.67-.07-1-.1z"/></svg>
    ),
    youtube: (props: any) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.51 3.55 12 3.55 12 3.55s-7.51 0-9.38.5A3.02 3.02 0 00.5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81c.28 1.02 1.1 1.84 2.12 2.14 1.87.5 9.38.5 9.38.5s7.51 0 9.38-.5a3.02 3.02 0 002.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>
    ),
    linkedin: (props: any) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.06c.63-1.18 2.17-2.42 4.47-2.42 4.79 0 5.67 3.15 5.67 7.25V24h-5V16c0-1.9-.03-4.34-2.64-4.34-2.64 0-3.05 2.06-3.05 4.2V24h-5V8z"/></svg>
    ),
    facebook: (props: any) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M22.675 0h-21.35C.595 0 0 .594 0 1.326v21.348C0 23.405.595 24 1.325 24H12.82v-9.294H9.692V11.41h3.127V8.797c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.765v2.313h3.592l-.468 3.296h-3.124V24h6.127C23.406 24 24 23.405 24 22.674V1.326C24 .594 23.406 0 22.675 0z"/></svg>
    ),
    reddit: (props: any) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 0a12 12 0 100 24 12 12 0 000-24zm5.01 4.74a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"/></svg>
    ),
    pinterest: (props: any) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 4.9 3.05 9.07 7.36 10.78-.1-.86-.19-2.18.04-3.13.21-.85 1.35-5.4 1.35-5.4s-.34-.65-.34-1.61c0-1.5.87-2.62 1.96-2.62.9 0 1.34.67 1.34 1.47 0 .9-.57 2.24-.87 3.49-.25 1.04.53 1.89 1.56 1.89 1.87 0 3.31-1.97 3.31-4.81 0-2.51-1.8-4.27-4.37-4.27-2.98 0-4.73 2.23-4.73 4.54 0 .9.35 1.86.78 2.38.08.1.09.19.07.3-.08.33-.26 1.05-.3 1.19-.05.2-.15.24-.35.15-1.29-.6-2.1-2.48-2.1-4 0-3.25 2.36-6.24 6.8-6.24 3.57 0 6.35 2.55 6.35 5.94 0 3.54-2.24 6.4-5.36 6.4-1.04 0-2.02-.54-2.35-1.19l-.64 2.44c-.23.89-.86 2-1.28 2.68.97.3 1.99.46 3.05.46 6.62 0 11.99-5.37 11.99-11.99C24.007 5.367 18.64 0 12.017 0z"/></svg>
    ),
  }

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
              <div className="w-[320px] rounded-[2rem] bg-white shadow-xl border relative 
              overflow-hidden">
                <div className="h-24" style={{ background: cardStyle.background as any }} />
                <div className="-mt-10 flex flex-col items-center px-6 pb-6">
                  <div
                    className="w-20 h-20 bg-white shadow-md"
                    style={{
                      borderRadius:
                        theme.profileShape === 'circle' ? '9999px' : 
                        theme.profileShape === 'rounded' ? '16px' : '0px',
                      border: `${theme.profileBorderWidth || 0}px solid 
                      ${theme.profileBorderColor ||
                         'transparent'}`,
                    }}
                  >
                    <img 
                    src={data?.profileimg}
                    alt="Profile Image"
                    className={`object-fit w-full h-full ${theme.profileShape === 'circle' ? 'rounded-full' : 
                      theme.profileShape === 'rounded' ? 'rounded-lg' : 'rounded-none'}`}
                    />
                  </div>
                  <h4 className="mt-3 font-semibold">{data?.username}</h4>
                  <p
                    className="text-center text-sm mt-1"
                    style={{ color: theme.bioFontColor || '#111827',
                       fontSize: (theme.bioFontSize || 16) + 'px' }}
                  >
                    {data?.description}
                  </p>
                  {/* Socials */}
                  {data?.socials && data.socials.length > 0 && (
                    <div className="mt-4 flex items-center gap-3">
                      {data.socials.map((s, idx) => {
                        const key = s.platform?.toLowerCase?.() || ''
                        // @ts-ignore dynamic lookup
                        const Icon = SocialIcons[key]
                        if (!Icon) return null
                        const color = hoveredSocialIdx === idx ? (theme.socialsIconHoverColor || '#000') : (theme.socialsIconColor || '#111827')
                        const size = (theme.socialsSize || 18) + 4
                        return (
                          <a
                            key={s.platform + idx}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setHoveredSocialIdx(idx)}
                            onMouseLeave={() => setHoveredSocialIdx(null)}
                            className="inline-flex"
                            aria-label={s.platform}
                          >
                            <Icon className="transition-colors" style={{ color, width: size, height: size }} />
                          </a>
                        )
                      })}
                    </div>
                  )}

                  {/* Links */}
                  <div className="w-full mt-4 space-y-3">
                    {data?.links?.map((i, idx) => (
                      <a
                        key={i.description + idx}
                        href={i.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setHoveredLinkIdx(idx)}
                        onMouseLeave={() => setHoveredLinkIdx(null)}
                        className="block"
                        style={{ textDecoration: 'none' }}
                      >
                        <div
                          className="w-full flex items-center gap-3 h-12 px-3 font-medium transition-colors"
                          style={{
                            color: theme.linksFontColor || '#ffffff',
                            background: hoveredLinkIdx === idx ? (theme.linksHoverColor || '#1f2937') : (theme.linksBackground || '#111827'),
                            borderRadius: (theme.linksBorderRadius || 16) + 'px',
                            marginTop: idx === 0 ? 0 : (theme.linksSpacing || 12),
                          }}
                        >
                          <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-200 flex-shrink-0">
                            {i.linkThumbnail ? (
                              <img src={i.linkThumbnail} alt="Link Thumbnail" className="w-full h-full object-cover" />
                            ) : null}
                          </div>
                          <div className="flex-1 truncate">{i.description || i.linkUrl}</div>
                        </div>
                      </a>
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
