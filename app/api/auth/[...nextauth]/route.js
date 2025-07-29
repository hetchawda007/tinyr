import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import connectDb from "@/db/connectDb";
import User from "@/app/models/User";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log("User signed in:", user);
            console.log("Account details:", account);
            console.log("Profile details:", profile);
            const email = user.email
            const name = user.name
            await connectDb()
            const existingUser = await User.findOne({ email })
            if (!existingUser) {
                const newUser = await User.create({ email, name, image: user.image })
                console.log("New user created:", newUser)
            } else {
                console.log("User already exists:", existingUser)
            }
            return true
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }