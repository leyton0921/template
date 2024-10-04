import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


interface User {
    id: string;
    email: string;
    name: string;
    password: string; 
}

interface Token {
    id?: string;
    name?: string;
    email?: string;
}

const users: User[] = [
    { id: "1", email: "jsmith@example.com", password: "password123", name: "J Smith" },
];

async function getUserByEmail(email: string): Promise<User | null> {
    return users.find(user => user.email === email) || null;
}

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: Record<string, string> | undefined, req) {
                if (!credentials) {
                    throw new Error('No credentials provided');
                }

                const { email, password } = credentials;

                if (!email || !password) {
                    throw new Error('Email and password are required');
                }

                const user = await getUserByEmail(email);

                if (user && user.password === password) {
                    return { id: user.id, name: user.name, email: user.email };
                }

                throw new Error('Invalid credentials'); 
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
              
                token.id = (user as User).id;
                token.name = (user as User).name;
                token.email = (user as User).email;
            }
            return token;
        },
        async session({ session, token }) {

            const customToken = token as Token;
            session.user.id = customToken.id;
            session.user.name = customToken.name;
            session.user.email = customToken.email;
            return session;
        },
    },
});

export { handler as GET, handler as POST };
