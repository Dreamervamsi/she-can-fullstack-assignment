"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminPage() {
  const [email, setEmail] = useState("admin@shecan.foundation");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [adminName, setAdminName] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    const storedName = localStorage.getItem("adminName");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedName) {
      setAdminName(storedName);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchAdminData();
    }
  }, [token]);

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const fetchAdminData = async () => {
    setError(null);
    setIsFetching(true);

    try {
      const [usersRes, contactsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/users`, { headers: authHeaders }),
        axios.get(`${API_BASE_URL}/api/contact`, { headers: authHeaders }),
      ]);

      setUsers(usersRes.data.users || []);
      setContacts(contactsRes.data.contacts || []);
    } catch (err: any) {
      setError(
        err?.response?.data?.error ||
          "Unable to load admin data. Please sign in again."
      );
      setToken(null);
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminName");
    } finally {
      setIsFetching(false);
    }
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      const tokenValue = response.data.token;
      const nameValue = response.data.user?.name || "Admin";

      setToken(tokenValue);
      setAdminName(nameValue);
      localStorage.setItem("adminToken", tokenValue);
      localStorage.setItem("adminName", nameValue);
      setPassword("");
    } catch (err: any) {
      setError(
        err?.response?.data?.error || "Invalid login details. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteContact = async (id: string) => {
    setError(null);

    try {
      await axios.delete(`/api/contact/${id}`, { headers: authHeaders });
      setContacts((prev) => prev.filter((contact) => contact._id !== id));
    } catch (err: any) {
      setError(
        err?.response?.data?.error ||
          "Unable to delete the contact message. Please try again."
      );
    }
  };

  const handleSignOut = () => {
    setToken(null);
    setAdminName(null);
    setUsers([]);
    setContacts([]);
    setError(null);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-blue-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-purple-600 font-semibold">
              Admin Panel
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              Manage users and contact messages
            </h1>
            <p className="text-sm text-slate-600 mt-3 max-w-2xl">
              Use your admin credentials to authenticate against the backend, then view registered users and submitted contact inquiries.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-purple-300 bg-white px-5 py-2 text-sm font-semibold text-purple-700 shadow-sm transition hover:bg-purple-50"
          >
            Return to site
          </Link>
        </div>

        {token ? (
          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-500">Signed in as</p>
                  <h2 className="text-2xl font-semibold text-slate-900">{adminName}</h2>
                </div>
                <button
                  onClick={handleSignOut}
                  className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Sign Out
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Total Users</p>
                <p className="mt-3 text-4xl font-semibold text-slate-900">
                  {users.length}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Contact Messages</p>
                <p className="mt-3 text-4xl font-semibold text-slate-900">
                  {contacts.length}
                </p>
              </div>
            </div>

            {error && (
              <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}

            {isFetching ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">
                Loading admin data...
              </div>
            ) : (
              <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Recent contact messages
                  </h3>
                  {contacts.length === 0 ? (
                    <p className="text-sm text-slate-500">No contact messages found.</p>
                  ) : (
                    <div className="space-y-4">
                      {contacts.map((contact) => (
                        <article
                          key={contact._id}
                          className="rounded-3xl border border-slate-200 p-4"
                        >
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <p className="text-sm text-slate-500">{contact.email}</p>
                              <p className="text-lg font-semibold text-slate-900">
                                {contact.name}
                              </p>
                            </div>
                            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
                              {new Date(contact.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="mt-3 text-slate-700 whitespace-pre-line">
                            {contact.message}
                          </p>
                          <button
                            onClick={() => handleDeleteContact(contact._id)}
                            className="mt-4 inline-flex items-center rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                          >
                            Delete message
                          </button>
                        </article>
                      ))}
                    </div>
                  )}
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Registered users</h3>
                  {users.length === 0 ? (
                    <p className="text-sm text-slate-500">No registered users found.</p>
                  ) : (
                    <div className="space-y-3">
                      {users.map((user) => (
                        <div
                          key={user.id}
                          className="rounded-3xl bg-slate-50 p-4"
                        >
                          <p className="font-semibold text-slate-900">{user.name}</p>
                          <p className="text-sm text-slate-600">{user.email}</p>
                          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                            Role: {user.role}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        ) : (
          <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              Admin sign in
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Use your admin account to access the dashboard and manage contact messages.
            </p>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  placeholder="admin@shecan.foundation"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  placeholder="Enter your password"
                />
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-3xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}
