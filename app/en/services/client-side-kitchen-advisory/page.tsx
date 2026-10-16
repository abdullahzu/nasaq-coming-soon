import Content, {generateMetadata as metadata} from '@/components/nasaq/page'
const params=Promise.resolve({lang:'en',slug:["services", "client-side-kitchen-advisory"]})
export function generateMetadata(){return metadata({params})}
export default function Page(){return <Content params={params}/> }
