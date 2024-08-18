import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Configuration options for NextAuth
export const authOptions = {
  // Providers for authentication
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Send credentials to API for authentication
        const res = await fetch(`${process.env.API_ROOT}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
      
        const user = await res.json();
      
        // Return user object if authentication is successful
        if (res.ok && user) {
          return {
            id: user.id || 'default-id',  // Provide a default id if none is returned
            username: user.username,
            name: user.name,
            // image: user.img,  // Uncomment if image is part of the user object
            token: user.token,
          };
        }
        
        return null;
      }
    }),
  ],
  // Custom pages for authentication flows
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: undefined,  // Default value
  },
  // Callbacks for custom behavior
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string; }) {
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      // Attach user data to JWT token
      if (user) {
        token.id = user.id;
        token.username = user.username;
        // token.image = user.image;  // Uncomment if image is part of the user object
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Pass user data to session object
      session.user.id = token.id;
      session.user.username = token.username;
      // session.user.image = token.img;  // Uncomment if image is part of the user object
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,  // Secret for encryption
};

// Create NextAuth handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
