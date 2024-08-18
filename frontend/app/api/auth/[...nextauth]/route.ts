import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.API_ROOT}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
      
        const user = await res.json();
        console.log('API Response:', user);
      
        // Ensure that you return an object with at least an id, username, image, and token
        if (res.ok && user) {
          return {
            id: user.id || 'default-id',  // If the API does not return an id, provide a default or generate one
            username: user.username,
            name: user.name,
            // image: user.img,
            token: user.token,
          };
        }
        
        return null;
      }
      
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: undefined,
  },
   callbacks: {
    async redirect({ url, baseUrl }:{url:string;baseUrl:string;}) {
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
    async jwt({ token, user }:{token:any;user:any}) {
      // If user exists, attach the user data to the token
      if (user) {
        token.id = user.id
        token.username = user.username;
        // token.image = user.image;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }:{session:any;token:any}) {
      // Pass user data to the session
      session.user.id = token.id
      session.user.username = token.username;
      // session.user.image = token.img;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
