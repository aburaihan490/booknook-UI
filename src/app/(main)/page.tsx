import BannerSlider from '@/components/Banner';
import HowBorrowingWorks from '@/components/HowBorrowingWorks';
import NewArrivals from '@/components/NewArrivals';
import TopCategories from '@/components/TopCategories';
import React from 'react';

const HomePage = () => {
    return (
        <div className="flex flex-col gap-y-12">
            <BannerSlider />
            <NewArrivals />
            <HowBorrowingWorks />
            <TopCategories />
        </div>
    );
};

export default HomePage;
