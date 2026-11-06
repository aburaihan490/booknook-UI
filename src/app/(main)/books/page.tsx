import AllBooksView from '@/components/AllBooksView';
import { getAllBooks } from '@/query/getAllBooks';
import { BookType } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'BookNook | All Books',
    description: 'Explore all available books in BookNook.',
};

export default async function AllBooksPage() {
    const books: BookType[] = await getAllBooks();

    return <AllBooksView books={books} />;
}
