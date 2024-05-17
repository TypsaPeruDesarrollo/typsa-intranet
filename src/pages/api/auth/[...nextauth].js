import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const res = await fetch('http://localhost:3001/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userName: credentials.username, password: credentials.password })
        });
        const user = await res.json();

        if (res.ok && user) {
          const userDetailsRes = await fetch(`http://localhost:3001/api/usuario-empleado/${user.userInfo.email}`, {
            headers: {
              'Authorization': `Bearer ${user.token}`, 
              'Content-Type': 'application/json'
            }
          });

          const userDetails = await userDetailsRes.json();

          if (userDetailsRes.ok) {
            return {
              id: user.userInfo.id,
              empleadoId: userDetails.EmpleadoId,
              name: userDetails.Nombres, 
              surname: userDetails.Apellidos,
              email: user.userInfo.email,
              token: user.token,
              roles: user.userInfo.roles,
            };
          } else {
            throw new Error('No se pudieron obtener los detalles del usuario');
          }
        } else {
          throw new Error(user.message || 'No se pudo autenticar');
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (account && user) {
        token.accessToken = user.token;
        token.id = user.id;
        token.empleadoId = user.empleadoId;
        token.name = user.name;
        token.surname = user.surname;
        token.email = user.email;
        token.roles = user.roles;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        id: token.id,
        empleadoId: token.empleadoId,
        name: token.name,
        surname : token.surname,
        email: token.email,
        accessToken: token.accessToken,
        roles: token.roles
      }
      return session;
    }
  }
});
