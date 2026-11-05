'use client';

import { authClient } from '@/lib/auth-client';
import { toast } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // validation Password
    const validatePassword = (password: string) => {
        if (password.length < 6) {
            return 'Password must be at least 6 characters long.';
        }

        if (!/[A-Z]/.test(password)) {
            return 'Password must contain at least one uppercase letter.';
        }

        if (!/[a-z]/.test(password)) {
            return 'Password must contain at least one lowercase letter.';
        }

        return '';
    };

    const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const image = formData.get('image') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        // Password validation
        const error = validatePassword(password);

        if (error) {
            toast.danger(error);
            return;
        }

        if (password !== confirmPassword) {
            toast.danger('Passwords do not match!');
            return;
        }

        try {
            setIsLoading(true);

            // Better Auth registration integration with image/photo URL
            const { data, error } = await authClient.signUp.email({
                name,
                email,
                password,
                image: image || undefined, // Send image if provided
            });

            if (error) {
                toast.danger('Registration failed', {
                    description: error.message || 'Please try again.',
                });
                return;
            }

            if (data) {
                toast.success('Account created successfully!', {
                    description: `Welcome to BookNook, ${name}!`,
                });
                router.push('/login');
                router.refresh();
            }
        } catch (error) {
            console.error('Registration failed:', error);
            toast.danger('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleRegister} className="space-y-5">
            {/* Full Name */}
            <div>
                <label
                    htmlFor="name"
                    className="mb-3 block text-xs font-bold tracking-wide text-[#263449]"
                >
                    FULL NAME
                </label>

                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    autoComplete="name"
                    className="h-12.5 w-full rounded-xl border border-[#e1e1e1] bg-[#fafafa] px-4 text-sm outline-none transition placeholder:text-[#a0aec0] focus:border-[#10664e] focus:ring-2 focus:ring-[#10664e]/10"
                />
            </div>

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

            {/* Photo-URL */}
            <div>
                <label
                    htmlFor="image"
                    className="mb-3 block text-xs font-bold tracking-wide text-[#263449]"
                >
                    PHOTO URL (OPTIONAL)
                </label>

                <input
                    id="image"
                    name="image"
                    type="url"
                    placeholder="https://example.com/avatar.jpg"
                    autoComplete="url"
                    className="h-[50px] w-full rounded-xl border border-[#e1e1e1] bg-[#fafafa] px-4 text-sm outline-none transition placeholder:text-[#a0aec0] focus:border-[#10664e] focus:ring-2 focus:ring-[#10664e]/10"
                />
            </div>

            {/* Password */}
            <div>
                <label
                    htmlFor="password"
                    className="mb-3 block text-xs font-bold tracking-wide text-[#263449]"
                >
                    PASSWORD
                </label>

                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="At least 6 chars (Uppercase & lowercase)"
                        required
                        minLength={6}
                        autoComplete="new-password"
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

            {/* Confirm Password */}
            <div>
                <label
                    htmlFor="confirmPassword"
                    className="mb-3 block text-xs font-bold tracking-wide text-[#263449]"
                >
                    CONFIRM PASSWORD
                </label>

                <div className="relative">
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        required
                        minLength={6}
                        autoComplete="new-password"
                        className="h-[50px] w-full rounded-xl border border-[#e1e1e1] bg-[#fafafa] px-4 pr-16 text-sm outline-none transition focus:border-[#10664e] focus:ring-2 focus:ring-[#10664e]/10"
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 hover:text-[#10664e]"
                    >
                        {showConfirmPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
            </div>

            {/* Register Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="h-[56px] w-full rounded-2xl bg-[#10634c] text-base font-bold text-white shadow-[0_12px_18px_rgba(16,99,76,0.20)] transition hover:bg-[#0c503d] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
                {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
        </form>
    );
}
