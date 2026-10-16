import Content, {generateMetadata as metadata} from '@/components/nasaq/page'
const params=Promise.resolve({lang:'ar',slug:["privacy"]})
export function generateMetadata(){return metadata({params})}
export default function Page(){return <Content params={params}/> }
