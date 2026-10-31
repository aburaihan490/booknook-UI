import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import NavBarSkeleton from '@/skeleton/NavBarSkeleton';
import { Suspense, type ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Suspense fallback={<NavBarSkeleton />}>
                <NavBar />
            </Suspense>
            <main>{children}</main>
            <Footer />
        </>
    );
}
