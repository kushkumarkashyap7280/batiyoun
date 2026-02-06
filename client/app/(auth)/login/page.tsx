import UserLoginForm from '@/components/auth-components/UserLoginForm'

export const metadata = {
  title: "Login - Access Your Account",
  description: "Enter your credentials to access your account and manage your preferences.",
}

function page() {
  return (
    <UserLoginForm />
  )
}

export default page