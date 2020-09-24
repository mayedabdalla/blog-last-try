import {useRouter} from "next/router";
import {usePostQuery} from "../generated/graphql"
import Layout from "../components/layout";
import Moment from 'react-moment'
import Head from "next/head";
import ContentLoader from 'react-content-loader'

const PostLoader = ()=>{
    let paragrpah = []
    for (let i = 0; i < 20; i++) {
        paragrpah.push(<rect x="0" y={80 + 30 * i} width="100%" height="19" />)
    }
  return (<ContentLoader width="100%" height="671px">
      <rect x="0" y="0" width="142" height="29" />
      <rect x="0" y="40" width="87" height="19" />
      {paragrpah}
  </ContentLoader> )
};
export default function Post() {
    const router = useRouter()
    const slug = Array.isArray(router.query.slug) ? router.query.slug[0] : router.query.slug;
    const {loading, error, data} = usePostQuery({variables: {slug: slug}})
    if (loading) return (<Layout><PostLoader/></Layout>);
    if (error) return <p>Error :(</p>;
    return (
        <Layout>
            <Head>
                <title>{data.post.title}</title>
            </Head>
            <h2>{data.post.title}</h2>
            <Moment interval={1000} fromNow>{data.post.createdAt}</Moment>
            <p>{data.post.content}</p>
        </Layout>
    )
}
