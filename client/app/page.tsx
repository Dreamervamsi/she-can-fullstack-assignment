import ContactForm from "./components/ContactForm";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-900 mb-2">
            She Can Foundation
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Get in touch with us
          </p>
        </div>

        <ContactForm />

        <div className="mt-8 text-center">
          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
          >
            Go to Admin Panel
          </Link>
        </div>
      </div>
    </main>
  );
}
