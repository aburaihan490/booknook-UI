import LoginForm from '@/components/LoginForm';
import SocialLogin from '@/components/SocialLogin';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'BookNook | Login',
};
export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#fafafa] px-4 py-8">
            <div className="w-full max-w-[416px] rounded-[25px] border border-[#e5e5e5] bg-white px-7 py-10 shadow-[0_15px_25px_rgba(0,0,0,0.10)] sm:px-10">
                {/* Header */}
                <div className="mb-9 text-center">
                    <span className="inline-block rounded-md bg-[#d1fae5] px-3 py-1 text-[11px] font-bold tracking-wider text-[#065f46]">
                        WELCOME BACK
                    </span>

                    <h1 className="mt-3 text-[28px] font-extrabold leading-tight text-[#172033]">
                        Login to BookNook
                    </h1>

                    <p className="mt-2 text-sm text-[#8b8b8b]">
                        Access your borrowed books and library dashboard.
                    </p>
                </div>

                {/* Login Form */}
                <LoginForm />

                {/* Divider */}
                <div className="my-10 flex items-center gap-4">
                    <div className="h-px flex-1 bg-[#e5e5e5]" />

                    <span className="whitespace-nowrap text-xs font-semibold text-[#999]">
                        OR CONTINUE WITH
                    </span>

                    <div className="h-px flex-1 bg-[#e5e5e5]" />
                </div>

                {/* Google Login */}
                <SocialLogin />

                {/* Register */}
                <p className="mt-8 text-center text-sm text-[#777]">
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/register"
                        className="font-bold text-[#006b55] hover:underline"
                    >
                        Register here
                    </Link>
                </p>
            </div>
        </main>
    );
}
