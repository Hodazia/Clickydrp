"use client"

import type React from "react"
import { MapPin, Instagram, Twitter, Music2, Facebook, Github, Youtube } from "lucide-react"

type Social = {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export type LinkItem = {
  label: string
  href: string
  emoji?: string
}

export type UserProfile = {
  name: string
  location?: string
  avatarUrl: string
  bio?: string
  socials: Social[]
  links: LinkItem[]
}

export function ProfilePreview({
  user,
  styles,
  radius,
  blurCards,
  borderColor,
  borderWidth = 1,
  shadow,
  align = "center",
  maxWidth = 560,
  spacingY = 12,
  fontFamily = "system",
  baseFontSize = 16,
  headingWeight = 700,
  socialColor,
  socialSize = 22,
  linkPaddingY = 14,
  linkPaddingX = 18,
  hoverUnderline = false,
  hoverBg = true,
  hoverScale = true,
  hoverIntensity = 0.15,
}: {
  user: UserProfile
  styles: {
    textColor: string
    linkTextColor: string
    cardBg: string
  }
  radius: number
  blurCards: boolean
  borderColor: string
  borderWidth?: number
  shadow: boolean
  align?: "center" | "left"
  maxWidth?: number
  spacingY?: number
  fontFamily?: "system" | "inter" | "roboto" | "playfair"
  baseFontSize?: number
  headingWeight?: 500 | 600 | 700 | 800
  socialColor?: string
  socialSize?: number
  linkPaddingY?: number
  linkPaddingX?: number
  hoverUnderline?: boolean
  hoverBg?: boolean
  hoverScale?: boolean
  hoverIntensity?: number
}) {
  const containerAlign = align === "center" ? "items-center text-center" : "items-start text-left"

  const fontFamilyStyle: React.CSSProperties =
    fontFamily === "inter"
      ? { fontFamily: "var(--font-inter), ui-sans-serif, system-ui" }
      : fontFamily === "roboto"
        ? { fontFamily: "var(--font-roboto), ui-sans-serif, system-ui" }
        : fontFamily === "playfair"
          ? { fontFamily: "var(--font-playfair), ui-serif, Georgia" }
          : {}

  const linkBaseShadow = shadow
    ? `0 ${Math.round(6 + 8 * hoverIntensity)}px ${Math.round(16 + 12 * hoverIntensity)}px rgba(0,0,0,0.10)`
    : "none"

  return (
    <section
      className={`flex w-full flex-col ${containerAlign}`}
      style={{ gap: spacingY, maxWidth, ...fontFamilyStyle, fontSize: baseFontSize }}
    >
      <img
        src={user.avatarUrl || "/placeholder.svg?height=96&width=96&query=profile%20avatar"}
        alt="Profile photo"
        className="h-24 w-24 rounded-full ring-2 ring-white/60 object-cover"
      />
      <div className="flex flex-col" style={{ gap: 6 }}>
        <h1 className="text-balance font-sans text-2xl" style={{ color: styles.textColor, fontWeight: headingWeight }}>
          {user.name} <span aria-hidden="true">👇🏽</span>
        </h1>
        {user.location ? (
          <p className="inline-flex items-center gap-1 text-sm opacity-90" style={{ color: styles.textColor }}>
            <MapPin className="h-4 w-4" aria-hidden />
            <span className="sr-only">Location:</span>
            {user.location}
          </p>
        ) : null}
      </div>

      <div className="mt-1 flex items-center justify-center gap-4" style={{ color: socialColor || styles.textColor }}>
        {user.socials.map((s) => {
          const Icon = s.icon
          return (
            <a
              key={s.name}
              href={s.href}
              onClick={(e) => e.preventDefault()}
              className="transition-opacity hover:opacity-80"
              aria-label={s.name}
              style={{ color: "inherit" }}
            >
              {/* <Icon className="shrink-0"
              style={{ width: socialSize, height: socialSize }} /> */}
              <Icon className={`shrink-0 w-[${socialSize}px] h-[${socialSize}px]`} />
            </a>
          )
        })}
      </div>

      <ul className="mt-1 flex w-full flex-col" style={{ gap: spacingY }}>
        {user.links.map((l, idx) => (
          <li key={idx}>
            <a
              href={l.href}
              onClick={(e) => e.preventDefault()}
              className={[
                "block text-center font-medium transition-all will-change-transform",
                blurCards ? "backdrop-blur-md" : "",
                hoverUnderline ? "hover:underline" : "",
              ].join(" ")}
              style={{
                color: styles.linkTextColor,
                background: styles.cardBg,
                borderRadius: radius,
                border: `${borderWidth}px solid ${borderColor}`,
                padding: `${linkPaddingY}px ${linkPaddingX}px`,
                boxShadow: linkBaseShadow,
                transform: "translateZ(0)",
              }}
              onMouseEnter={(e) => {
                if (!hoverScale && !hoverBg) return
                const el = e.currentTarget
                if (hoverScale) el.style.transform = `scale(${1 + hoverIntensity * 0.06})`
                if (hoverBg) el.style.filter = `brightness(${1 + hoverIntensity * 0.3})`
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.transform = "scale(1)"
                el.style.filter = "none"
              }}
            >
              {l.label} {l.emoji ? <span aria-hidden="true">{l.emoji}</span> : null}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

// Fictional default user
export const defaultUser: UserProfile = {
  name: "Looking To Collab In",
  location: "Azamgarh, IN",
  avatarUrl: "/creator-avatar.png",
  socials: [
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "TikTok", href: "#", icon: Music2 },
    { name: "X", href: "#", icon: Twitter },
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "YouTube", href: "#", icon: Youtube },
    { name: "GitHub", href: "#", icon: Github },
  ],
  links: [
    { label: "VIP Access", href: "#", emoji: "✨" },
    { label: "Free Content", href: "#" },
    { label: "Reviews", href: "#" },
    { label: "Snapchat", href: "#", emoji: "👻" },
    { label: "Telegram", href: "#" },
  ],
}
