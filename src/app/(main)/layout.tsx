import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import type { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <NavBar />

            <main>{children}</main>

            <Footer />
        </>
    );
}
