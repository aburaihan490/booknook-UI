import AllBooksView from '@/components/AllBooksView';
import { getAllBooks } from '@/query/getAllBooks';
import { BookType } from '@/types';

export default async function AllBooksPage() {
    const books: BookType[] = await getAllBooks();

    return <AllBooksView books={books} />;
}
