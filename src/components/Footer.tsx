import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import getTime from '@/utils/getTime';

const quickLinks = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'All Books Catalog',
        href: '/all-books',
    },
    {
        label: 'Contribute a Book',
        href: '/add-book',
    },
    {
        label: 'Track Borrows',
        href: '/my-borrows',
    },
];

const Footer = () => {
    return (
        <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                {/* Logo & About */}
                <div className="space-y-4">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-700 rounded-xl flex items-center justify-center text-white">
                            <BookOpen size={22} />
                        </div>

                        <span className="text-2xl font-black text-white tracking-tight">
                            BookNook
                        </span>
                    </Link>

                    <p className="text-sm text-stone-400 leading-relaxed">
                        Your digital sanctuary for timeless reads, seamless
                        borrowing, and a vibrant community of passionate book
                        lovers.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-bold text-base mb-4 tracking-wide">
                        Quick Navigation
                    </h4>

                    <ul className="space-y-2.5 text-sm">
                        {quickLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="hover:text-emerald-400 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-white font-bold text-base mb-4 tracking-wide">
                        Contact Details
                    </h4>

                    <ul className="space-y-2.5 text-sm text-stone-400">
                        <li>104 Library Lane, Bookworm Avenue</li>
                        <li>New York, NY 10001, USA</li>
                        <li>
                            Email:{' '}
                            <a href="mailto:support@booknook.library">
                                support@booknook.library
                            </a>
                        </li>
                        <li>
                            Phone:{' '}
                            <a href="tel:+15553826665">+1 (555) 382-6665</a>
                        </li>
                    </ul>
                </div>

                {/* Social Links & Newsletter */}
                <div>
                    <h4 className="text-white font-bold text-base mb-4 tracking-wide">
                        Connect With Us
                    </h4>

                    <div className="flex items-center gap-3 mb-6">
                        {/* X */}
                        <a
                            href="https://x.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-xl bg-stone-800 hover:bg-emerald-700 flex items-center justify-center text-white transition-colors"
                            title="X (Twitter)"
                            aria-label="X (Twitter)"
                        >
                            <svg
                                className="w-4 h-4 fill-current"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>

                        {/* Facebook */}
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            className="w-10 h-10 rounded-xl bg-stone-800 hover:bg-emerald-700 flex items-center justify-center text-white transition-colors"
                            title="Facebook"
                        >
                            <span className="font-bold text-sm">fb</span>
                        </a>

                        {/* Instagram */}
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-xl bg-stone-800 hover:bg-emerald-700 flex items-center justify-center text-white transition-colors"
                            title="Instagram"
                            aria-label="Instagram"
                        >
                            <span className="font-bold text-sm">ig</span>
                        </a>
                    </div>

                    <p className="text-xs text-stone-500">
                        Subscribe for weekly reading recommendations and
                        literary events.
                    </p>
                </div>
            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-stone-800/80 text-center text-sm text-stone-500">
                <p>
                    © {getTime()} BookNook Online Library. All rights reserved.
                    Built with passion for readers worldwide.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
