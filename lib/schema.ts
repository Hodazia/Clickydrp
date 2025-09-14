import z from "zod"

export const signupSchema = z.object({
    username:z.string(),
    email:z.string().email(),
    password:z.string()
})

export const signinSchema = z.object({
    email:z.string(),
    password:z.string()
})

export interface Links {
    linkUrl:string,
    linkThumbnail:string,
    description:string
  }
  
export interface Social {
    id:string,
    platform:string,
    url:string
  }
  
export interface Theme {
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