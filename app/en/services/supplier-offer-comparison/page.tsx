import Content, {generateMetadata as metadata} from '@/components/nasaq/page'
const params=Promise.resolve({lang:'en',slug:["services", "supplier-offer-comparison"]})
export function generateMetadata(){return metadata({params})}
export default function Page(){return <Content params={params}/> }
