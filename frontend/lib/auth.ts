import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.sub = profile.sub ?? token.sub
        token.email = profile.email ?? token.email
        token.name = profile.name ?? token.name
        token.picture = (profile.picture as string | null | undefined) ?? token.picture ?? undefined
      }
      return token
    },
    async session({ session, token }) {
      if (token.sub) session.user.id = token.sub
      return session
    },
  },
  session: { strategy: 'jwt' },
})
