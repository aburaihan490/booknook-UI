import BannerSlider from '@/components/Banner';
import HowBorrowingWorks from '@/components/HowBorrowingWorks';
import NewArrivals from '@/components/NewArrivals';
import TopCategories from '@/components/TopCategories';
import NewArrivalsSkeleton from '@/skeleton/NewArrivalsSkeleton';
import { Suspense } from 'react';

const HomePage = () => {
    return (
        <div className="flex flex-col gap-y-12">
            <BannerSlider />
            <Suspense fallback={<NewArrivalsSkeleton />}>
                <NewArrivals />
            </Suspense>
            <HowBorrowingWorks />
            <TopCategories />
        </div>
    );
};

export default HomePage;
