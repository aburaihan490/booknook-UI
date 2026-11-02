import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { jwt } from 'better-auth/plugins';
const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db('booknook');
export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
    },
    database: mongodbAdapter(db, {
        client,
    }),
    plugins: [jwt()],
    session: {
        cookieCache: {
            enabled: true,
            strategy: 'jwt',
            maxAge: 7 * 24 * 60 * 60, // Cache duration in seconds (7 days)
        },
    },
    // socialProviders: {
    //     github: {
    //         clientId: process.env.GITHUB_CLIENT_ID as string,
    //         clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    //     },
    // },
});
