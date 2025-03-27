import { UserForm } from "@/components/UserForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">Create Account</h1>
        <UserForm />
      </div>
    </main>
  );
}
