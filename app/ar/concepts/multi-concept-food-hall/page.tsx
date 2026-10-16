import Content, {generateMetadata as metadata} from '@/components/nasaq/page'
const params=Promise.resolve({lang:'ar',slug:["concepts", "multi-concept-food-hall"]})
export function generateMetadata(){return metadata({params})}
export default function Page(){return <Content params={params}/> }
