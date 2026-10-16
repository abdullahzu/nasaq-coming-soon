import type {MetadataRoute} from 'next'
import {allPaths,href} from '@/content/site'
export default function sitemap():MetadataRoute.Sitemap{return allPaths.flatMap(path=>(['ar','en'] as const).map(lang=>({url:`https://nasaqfb.com${href(lang,path)}`,alternates:{languages:{ar:`https://nasaqfb.com${href('ar',path)}`,en:`https://nasaqfb.com${href('en',path)}`}},changeFrequency:'monthly' as const,priority:path?0.7:1})))}
