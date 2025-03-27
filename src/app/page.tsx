import Image from "next/image";
import { UserForm } from '@/components/UserForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3 text-gray-900">
            Create Account
          </h1>
          <p className="text-gray-600 text-lg">
            Fill out the form below to create your account.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <UserForm />
        </div>
      </div>
    </main>
  )
}
