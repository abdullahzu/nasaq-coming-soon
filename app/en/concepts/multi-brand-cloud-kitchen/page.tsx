import Content, {generateMetadata as metadata} from '@/components/nasaq/page'
const params=Promise.resolve({lang:'en',slug:["concepts", "multi-brand-cloud-kitchen"]})
export function generateMetadata(){return metadata({params})}
export default function Page(){return <Content params={params}/> }
