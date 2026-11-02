'use client';

import { useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { toast } from '@heroui/react';
import { redirect, useRouter } from 'next/navigation';

export default function LoginForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            setIsLoading(true);

            // TODO: Better Auth integration
            const { data, error } = await authClient.signIn.email({
                email: email,
                password: password,
                // rememberMe: true,
            });

            if (error) {
                console.error('Login failed:', error);
                toast.danger(error.message || 'Login failed!');
                return;
                // Handle login error (e.g., show an error message)
            }

            if (data) {
                console.log('Login successful:', data);
                toast.success('Login successful! Welcome back.');
            }
            router.push('/');
        } catch (error) {
            console.error('Login failed:', error);
            toast.danger('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
                <label
                    htmlFor="email"
                    className="mb-3 block text-xs font-bold tracking-wide text-[#263449]"
                >
                    EMAIL ADDRESS
                </label>

                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="reader@booknook.com"
                    required
                    autoComplete="email"
                    className="h-[50px] w-full rounded-xl border border-[#e1e1e1] bg-[#fafafa] px-4 text-sm outline-none transition placeholder:text-[#a0aec0] focus:border-[#10664e] focus:ring-2 focus:ring-[#10664e]/10"
                />
            </div>

            {/* Password */}
            <div>
                <div className="mb-3 flex items-center justify-between">
                    <label
                        htmlFor="password"
                        className="text-xs font-bold tracking-wide text-[#263449]"
                    >
                        PASSWORD
                    </label>

                    <Link
                        href="/forgot-password"
                        className="text-xs font-semibold text-[#006b55] hover:underline"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        required
                        autoComplete="current-password"
                        className="h-[50px] w-full rounded-xl border border-[#e1e1e1] bg-[#fafafa] px-4 pr-16 text-sm outline-none transition focus:border-[#10664e] focus:ring-2 focus:ring-[#10664e]/10"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 hover:text-[#10664e]"
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
            </div>

            {/* Login Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="h-[56px] w-full rounded-2xl bg-[#10634c] text-base font-bold text-white shadow-[0_12px_18px_rgba(16,99,76,0.20)] transition hover:bg-[#0c503d] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
}
