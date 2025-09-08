"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Calls NextAuth credentials provider
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setErr("Invalid email or password");
      return;
    }

    router.push("/blogs");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl px-8 py-10 flex flex-col gap-6"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">Sign In</h1>

        {err && <p className="text-red-600 text-sm">{err}</p>}

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
