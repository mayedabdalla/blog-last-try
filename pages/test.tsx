import Layout from "../components/layout";
import {usePostsQuery} from "../generated/graphql"
import Link from "next/link";
import Moment from "react-moment";
import ContentLoader from "react-content-loader";

const MyLoading = () => {
    const length = 5
    let header = [];
    for (let i = 0; i < length; i++) {
        header.push(
            <>
                <rect x="0" y={80 * i} width="142" height="29"/>
                <rect x="0" y={40 + 80 * i} width="87" height="19"/>
            </>
        )
    }
    return (
        <ContentLoader width="100%" height={((29+19+11) * length ) + (21 * (length - 1)) }>
            {header}
        </ContentLoader>
    );
}
export default function Test() {
    const {loading, error, data} = usePostsQuery()
    if (loading) return <Layout><MyLoading/></Layout>
    if (error) return <p>Error :(</p>;
    return (
        <Layout>
            <style jsx>{`
                // ul {
                //     list-style-type: none;
                //     padding: 0;
                //     margin: 0;
                // }
            `}</style>
            <ul className="list-none">{
                data.posts.map(post => {
                    return (<li>
                        <Link href={post.slug}>
                            <article>
                                <h2><a>{post.title}</a></h2>
                                <Moment interval={1000} fromNow>{post.createdAt}</Moment>
                            </article>
                        </Link>
                    </li>)
                })
            }</ul>
        </Layout>
    )
}