import Content, {generateMetadata as metadata} from '@/components/nasaq/page'
const params=Promise.resolve({lang:'en',slug:["services", "stainless-steel-scope"]})
export function generateMetadata(){return metadata({params})}
export default function Page(){return <Content params={params}/> }
