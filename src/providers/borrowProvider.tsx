'use client';
import { BorrowContext } from '@/context/borrowContext';
import React from 'react';
interface Props {
    children: React.ReactNode;
}

const borrowProvider = ({ children }: Props) => {
    const handleAddBorrow = (bookId: string) => {
        // Logic to add a borrow entry for the given bookId
    };

    return (
        <BorrowContext.Provider value={{ handleAddBorrow }}>
            {children}
        </BorrowContext.Provider>
    );
};

export default borrowProvider;
