import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export default NextAuth({
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        phone: { label: 'Phone', type: 'text' },
        token: { label: 'token', type: 'text' },
        id: { label: 'id', type: 'number' },
        first_login: { label: 'first_login', type: 'text' },
      },
      authorize: (credentials) => {
        // database look up
        if (
          credentials.phone &&
          credentials.id &&
          credentials.token &&
          credentials.first_login
        ) {
          return {
            id: credentials.id,
            phone: credentials.phone,
            token: credentials.token,
            first_login: credentials.first_login,
          };
        }
        // login failed
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.token;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  secret: 'test',
  jwt: {
    secret: 'test',
    encryption: true,
  },
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
});
