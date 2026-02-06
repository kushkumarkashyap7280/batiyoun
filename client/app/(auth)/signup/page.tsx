import UserSignupForm from "@/components/auth-components/UserSignupForm"

export const metadata = {
  title: "Sign Up - Complete Your Registration",
  description: "Create your account by providing the necessary details to complete your registration.",
}


function page() {
  return (
    <UserSignupForm />
  )
}

export default page