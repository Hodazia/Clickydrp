'use client'
import { useRouter } from "next/navigation";
import { useProtectedRoute } from "@/lib/hooks/useprotected";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Links } from "@/lib/schema";
import { Social } from "@/lib/schema";
import { Theme } from "@/lib/schema";
import Icon from 'lucide-react'
import { useMemo } from "react";

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


interface metaprops {
    username: string,
    description: string,
    profileimg: string,
    links: Links[],
    socials: Social[],
    themes: Theme[]
}

export default function Username() {
    const { session, status } = useProtectedRoute();
    const router = useRouter();
    const [usermeta, setusermeta] = useState<metaprops | null>(null);
    const [hoveredLinkIdx, setHoveredLinkIdx] = useState<number | null>(null)
    const [hoveredSocialIdx, setHoveredSocialIdx] = useState<number | null>(null)
    const pathname = usePathname();
    const username = pathname.split('/')[1]
    console.log("pathname ", pathname);
    console.log("Username is ", username)

    const fetchData = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/users/${username}`, { credentials: 'include' })
            if (!res.ok) throw new Error('Failed to load metadata! ')
            const resultantData: metaprops = await res.json()
            console.log("Data from the users/me ", resultantData);
            setusermeta(resultantData)
        } catch {
            console.log('Could not load theme')
        }
    }

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/signin");
        }
    }, [status, router]);

    useEffect(() => {
        if (session) {
            fetchData();
        }
    }, [session]);

    // ** Corrected position of useMemo **
    const theme = usermeta?.themes?.[0];

    const cardStyle = useMemo(() => {
        const backgroundProps: React.CSSProperties = {}
        if (theme?.cardBlur && theme.cardBlur > 0) {
            backgroundProps.backgroundColor = 'rgba(255,255,255,0.2)';
            backgroundProps.backdropFilter = `blur(${theme.cardBlur}px)`;
            backgroundProps.WebkitBackdropFilter = `blur(${theme.cardBlur}px)`;
        } else {
            if (theme?.cardType === 'color') backgroundProps.backgroundColor = theme.cardColor || '#ffffff';
            if (theme?.cardType === 'gradient') backgroundProps.background = theme.cardGradient || "";
            if (theme?.cardType === 'image') backgroundProps.background = `url(${theme.cardImage}) center/cover no-repeat`;
        }
        return {
            ...backgroundProps,
            border: `${theme?.profileBorderWidth || 0}px solid ${theme?.profileBorderColor || 'transparent'}`,
        }
    }, [theme]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (!usermeta) {
        return <p className="text-center mt-10">No data found!</p>;
    }

    const viewportBgStyle = theme?.viewportType === 'image' && theme?.viewportImage
        ? { backgroundImage: `url(${theme.viewportImage})`, backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }
        : theme?.viewportType === 'gradient' && theme?.viewportGradient
            ? { background: theme.viewportGradient, backgroundAttachment: 'fixed' }
            : { backgroundColor: theme?.viewportColor || '#f5f5f5', backgroundAttachment: 'fixed' };

    return (
        <>
            <div
                className="relative min-h-screen w-full flex flex-col items-center justify-start px-4 py-10"
                style={viewportBgStyle}
            >
                {/* readability overlay over the background */}
                <div className="pointer-events-none absolute inset-0 bg-black/20" />
                {/* Card container */}
                <div
                    className="relative w-full max-w-md flex flex-col items-center rounded-3xl p-6 md:p-8 shadow-2xl md:max-w-xl border border-white/10 bg-white/60 backdrop-blur-md"
                    style={cardStyle}
                >
                    {/* Header Section (Profile, Description, Socials) */}
                    <div className="w-full flex flex-col items-center rounded-2xl p-2 pb-3">
                        {/* Profile image */}
                        <img
                            src={usermeta.profileimg}
                            alt={usermeta.username}
                            className="w-28 h-28 rounded-full border-4 border-white/80 shadow-xl ring-4 ring-white/20 object-cover md:w-32 md:h-32"
                        />

                        {/* Username + description */}
                        <h1 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight text-gray-900/90">
                            {usermeta.username}
                        </h1>
                        <p className="mt-2 text-center text-gray-700/90 max-w-prose">
                            {usermeta.description}
                        </p>

                        {/* Social icons */}
                        {usermeta?.socials && usermeta.socials.length > 0 && (
                            <div className="mt-4 flex items-center gap-3">
                                {usermeta.socials.map((social, idx) => {
                                    const key = social.platform?.toLowerCase?.() || '';
                                    const IconComponent = SocialIcons[key];
                                    if (!IconComponent) return null;

                                    const color = hoveredSocialIdx === idx ?
                                        (theme?.socialsIconHoverColor || '#000') :
                                        (theme?.socialsIconColor || '#111827');
                                    const size = (theme?.socialsSize || 18) + 4;

                                    return (
                                        <a
                                            key={social.platform + idx}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onMouseEnter={() => setHoveredSocialIdx(idx)}
                                            onMouseLeave={() => setHoveredSocialIdx(null)}
                                            className="inline-flex"
                                            aria-label={social.platform}
                                        >
                                            <IconComponent
                                                className="transition-colors"
                                                style={{ color, width: size, height: size }}
                                            />
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Scrollable Links Section */}
                    <div className="w-full mt-6 space-y-4 flex flex-col flex-grow overflow-y-auto max-h-[60vh]">
                        {usermeta.links?.map((link, idx) => (
                            <a
                                key={link.description}
                                href={link.linkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => setHoveredLinkIdx(idx)}
                                onMouseLeave={() => setHoveredLinkIdx(null)}
                                className="w-full flex items-center gap-4 p-3 font-medium transition-all rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] text-white"
                                style={{
                                    color: theme?.linksFontColor || '#ffffff',
                                    background: hoveredLinkIdx === idx ? (theme?.linksHoverColor || '#1f2937') :
                                        (theme?.linksBackground || '#111827'),
                                    borderRadius: (theme?.linksBorderRadius || 16) + 'px',
                                    marginTop: idx === 0 ? 0 : (theme?.linksSpacing || 12),
                                }}
                            >
                                <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-200/80 flex-shrink-0 md:w-16 md:h-16">
                                    {link.linkThumbnail ? (
                                        <img src={link.linkThumbnail} alt="Link Thumbnail" className="w-full h-full object-cover" />
                                    ) : null}
                                </div>
                                <div className="flex-1 justify-center truncate">{link.description || link.linkUrl}</div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
