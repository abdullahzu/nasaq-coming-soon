import type {MetadataRoute} from 'next'
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',allow:'/',disallow:['/api/','/FOH','/foh/']},sitemap:'https://nasaqfb.com/sitemap.xml'}}
