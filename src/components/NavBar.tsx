'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BookOpen, User, LogOut, X, Menu } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import { toast } from '@heroui/react';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Books', href: '/books' },
    { name: 'Add Book', href: '/add-book' },
    { name: 'My Books', href: '/my-books' },
    { name: 'My Borrows', href: '/my-borrows' },
];

const NavBar = () => {
    const { data: currentUser, isPending } = authClient.useSession();

    const router = useRouter();
    const pathname = usePathname();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const userPhoto =
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150';

    // Active link detection logic
    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === '/';
        }

        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const handleLogout = async () => {
        try {
            await authClient.signOut();
            setIsUserDropdownOpen(false);
            setIsMobileMenuOpen(false);
            toast.success('Logged out successfully!');
            router.push('/login');
            router.refresh();
        } catch (error) {
            console.error('Logout failed:', error);
            toast.danger('Logout failed. Please try again.');
        }
    };

    const handleProfileClick = () => {
        setIsUserDropdownOpen(false);
        setIsMobileMenuOpen(false);
        router.push('/profile');
    };

    return (
        <>
            {/* Click Outside Backdrop for Desktop User Dropdown */}
            {isUserDropdownOpen && (
                <div
                    className="fixed inset-0 z-40 bg-transparent"
                    onClick={() => setIsUserDropdownOpen(false)}
                />
            )}

            <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        <div className="w-11 h-11 bg-emerald-800 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                            <BookOpen size={24} />
                        </div>

                        <div>
                            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-900 to-emerald-700 bg-clip-text text-transparent">
                                BookNook
                            </span>

                            <span className="block text-xs font-semibold text-emerald-600 tracking-widest uppercase">
                                Online Library
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8 font-medium text-stone-700">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`transition-colors hover:text-emerald-800 ${
                                    isActive(link.href)
                                        ? 'text-emerald-800 font-bold border-b-2 border-emerald-800 pb-1'
                                        : ''
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Auth */}
                    <div className="hidden md:flex items-center gap-4">
                        {isPending ? (
                            <div className="p-0 animate-pulse"></div>
                        ) : currentUser?.user ? (
                            <div className="relative z-50">
                                <button
                                    onClick={() =>
                                        setIsUserDropdownOpen(
                                            !isUserDropdownOpen,
                                        )
                                    }
                                    className="flex items-center gap-3 p-1.5 pl-3 rounded-full border border-stone-200 hover:border-emerald-600 transition-all bg-stone-50"
                                >
                                    <span className="text-sm font-semibold text-stone-800">
                                        {currentUser?.user?.name}
                                    </span>

                                    <Image
                                        width={40}
                                        height={40}
                                        src={
                                            currentUser?.user.image || userPhoto
                                        }
                                        alt="User"
                                        className="w-9 h-9 rounded-full object-cover border-2 border-emerald-700 shadow-sm"
                                    />
                                </button>

                                {isUserDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-stone-100 py-2 z-50">
                                        <div className="px-4 py-2 border-b border-stone-100">
                                            <p className="text-xs text-stone-500">
                                                Signed in as
                                            </p>

                                            <p className="text-sm font-bold text-stone-800 truncate">
                                                {currentUser?.user?.email}
                                            </p>
                                        </div>

                                        <button
                                            onClick={handleProfileClick}
                                            className="w-full text-left px-4 py-2.5 text-sm text-stone-700 hover:bg-emerald-50 hover:text-emerald-900 flex items-center gap-2 font-medium cursor-pointer"
                                        >
                                            <User size={16} />
                                            My Profile
                                        </button>

                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium cursor-pointer"
                                        >
                                            <LogOut size={16} />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className="px-5 py-2.5 text-sm font-bold text-emerald-800 hover:bg-emerald-50 rounded-xl transition-all"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    className="px-5 py-2.5 text-sm font-bold bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl shadow-lg shadow-emerald-800/20 transition-all hover:scale-105"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-3">
                        {currentUser?.user && (
                            <Image
                                width={32}
                                height={32}
                                src={currentUser?.user?.image || userPhoto}
                                alt="User"
                                className="w-8 h-8 rounded-full object-cover border border-emerald-700"
                            />
                        )}

                        <button
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="p-2 rounded-xl text-stone-700 hover:bg-stone-100"
                            aria-label="Toggle mobile menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? (
                                <X size={24} />
                            ) : (
                                <Menu size={24} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-b border-stone-200 px-6 py-6 space-y-4 shadow-xl">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block w-full text-left font-semibold text-lg py-1 ${
                                    isActive(link.href)
                                        ? 'text-emerald-800'
                                        : 'text-stone-800'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <hr className="border-stone-100 my-2" />

                        {currentUser?.user ? (
                            <div className="space-y-3 pt-2">
                                <div className="flex items-center gap-3">
                                    <Image
                                        width={40}
                                        height={40}
                                        src={
                                            currentUser?.user?.image ||
                                            userPhoto
                                        }
                                        alt=""
                                        className="w-10 h-10 rounded-full object-cover"
                                    />

                                    <div>
                                        <p className="font-bold text-stone-900">
                                            {currentUser?.user?.name}
                                        </p>

                                        <p className="text-xs text-stone-500">
                                            {currentUser?.user?.email}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleProfileClick}
                                    className="block w-full py-3 text-center bg-emerald-50 text-emerald-800 font-bold rounded-xl cursor-pointer"
                                >
                                    My Profile
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="py-3 text-center font-bold text-emerald-800 bg-emerald-50 rounded-xl"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="py-3 text-center font-bold text-white bg-emerald-800 rounded-xl shadow-md"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </header>
        </>
    );
};

export default NavBar;
