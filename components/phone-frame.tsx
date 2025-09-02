import type * as React from "react"

type PhoneFrameProps = React.PropsWithChildren<{
  className?: string
  device?: "mobile" | "tablet" | "desktop"
}>

export function PhoneFrame({ children, className, device = "mobile" }: PhoneFrameProps) {
  const maxWidth = device === "desktop" ? 900 : device === "tablet" ? 640 : 420

  return (
    <div
      role="region"
      aria-label={`${device} preview frame`}
      className={[
        "mx-auto w-full rounded-[36px] border border-black/10 bg-black/5 shadow-2xl backdrop-blur-sm",
        className || "",
      ].join(" ")}
      style={{ maxWidth }}
    >
      <div className="mx-auto mt-2 h-6 w-36 rounded-full bg-black/15" aria-hidden="true" />
      <div className="p-4">{children}</div>
    </div>
  )
}
