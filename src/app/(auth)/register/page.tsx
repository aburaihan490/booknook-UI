import RegisterForm from '@/components/RegisterForm';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#fafafa] px-4 py-8">
            <div className="w-full min-w-112.5 rounded-[25px] border border-[#e5e5e5] bg-white px-7 py-10 shadow-[0_15px_25px_rgba(0,0,0,0.10)] sm:px-10">
                {/* Header */}
                <div className="mb-9 text-center">
                    <span className="inline-block rounded-md bg-[#d1fae5] px-3 py-1 text-[11px] font-bold tracking-wider text-[#065f46]">
                        JOIN BOOKNOOK
                    </span>

                    <h1 className="mt-3 text-[28px] font-extrabold leading-tight text-[#172033]">
                        Create Account
                    </h1>

                    <p className="mt-2 text-sm text-[#8b8b8b]">
                        Join BookNook and explore your reading journey.
                    </p>
                </div>

                {/* Register Form */}
                <RegisterForm />

                {/* Divider */}
                <div className="my-8 flex items-center gap-4">
                    <div className="h-px flex-1 bg-[#e5e5e5]" />

                    <span className="whitespace-nowrap text-xs font-semibold text-[#999]">
                        OR CONTINUE WITH
                    </span>

                    <div className="h-px flex-1 bg-[#e5e5e5]" />
                </div>

                {/* Google Register */}
                <button
                    type="button"
                    className="flex h-[51px] w-full items-center justify-center gap-3 rounded-2xl border border-[#e1e1e1] bg-[#fafafa] text-sm font-bold text-[#263449] shadow-sm transition hover:bg-gray-100 active:scale-[0.98]"
                >
                    <svg
                        width="21"
                        height="21"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                    >
                        <path
                            fill="#FFC107"
                            d="M43.6 24.5c0-1.4-.1-2.9-.4-4.3H24v8.2h11a9.4 9.4 0 0 1-4.1 6.1v5.1h6.6c3.9-3.6 6.1-8.9 6.1-15.1Z"
                        />
                        <path
                            fill="#34A853"
                            d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
                        />
                        <path
                            fill="#4285F4"
                            d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"
                        />
                        <path
                            fill="#EA4335"
                            d="M24 12c3 0 5.7 1 7.8 3l5.8-5.8A19.4 19.4 0 0 0 24 4 20 20 0 0 0 5.8 15.1l6.8 5.3C14.2 15.6 18.7 12 24 12Z"
                        />
                    </svg>
                    Continue with Google
                </button>

                {/* Login Link */}
                <p className="mt-8 text-center text-sm text-[#777]">
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        className="font-bold text-[#006b55] hover:underline"
                    >
                        Login here
                    </Link>
                </p>
            </div>
        </main>
    );
}
