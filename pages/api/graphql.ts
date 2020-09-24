import {ApolloServer, gql} from 'apollo-server-micro'
import {PrismaClient} from '@prisma/client'
import {Resolvers} from '../../generated/graphql';

const prisma = new PrismaClient()

const typeDefs = gql`
    scalar Date

    type Query {
        posts: [Post]
        post(slug:String): Post
    }

    type Post {
        id: Int
        title: String
        content: String
        slug: String
        createdAt: Date
    }
`

const resolvers: Resolvers = {
    Query: {
        post: (parent, args, context) => {
            return prisma.post.findOne({
                where: {
                    slug: args.slug
                }
            })
        },
        posts: (parent, args, context) => {
            return prisma.post.findMany()
        }
    }
}

const apolloServer = new ApolloServer({typeDefs, resolvers})

export const config = {
    api: {
        bodyParser: false,
    },
}

export default apolloServer.createHandler({path: '/api/graphql'})