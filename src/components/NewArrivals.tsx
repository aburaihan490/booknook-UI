import { getAllBooks } from '@/query/getAllBooks';
import { ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const NewArrivals = async () => {
    const books = await getAllBooks();
    console.log(books);
    const newArrivals = [...books].reverse().slice(0, 6);
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                <div>
                    <span className="text-emerald-800 font-bold tracking-widest text-xs uppercase bg-emerald-100 px-3 py-1 rounded-md">
                        Fresh Additions
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-stone-900 mt-2 tracking-tight">
                        New Library Arrivals
                    </h2>
                </div>
                <Link
                    href="/books"
                    className="mt-4 md:mt-0 inline-flex items-center gap-2 text-emerald-800 font-bold hover:text-emerald-900 group"
                >
                    See All Books{' '}
                    <ArrowRight
                        size={18}
                        className="transform group-hover:translate-x-1 transition-transform"
                    />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {newArrivals.map((book) => (
                    <div
                        key={book._id}
                        className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                    >
                        <div className="relative h-72 overflow-hidden bg-stone-100">
                            <Image
                                width={500}
                                height={500}
                                src={book.cover}
                                alt={book.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                                {book.category}
                            </span>
                            <span className="absolute top-4 right-4 bg-amber-400 text-stone-950 font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                                <Star size={12} className="fill-current" />{' '}
                                {book.rating}
                            </span>
                        </div>

                        <div className="p-6 flex flex-col grow justify-between space-y-4">
                            <div>
                                <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
                                    {book.title}
                                </h3>
                                <p className="text-sm text-stone-500 font-medium mt-1">
                                    By {book.author}
                                </p>
                                <p className="text-xs text-stone-600 mt-3 line-clamp-2 leading-relaxed">
                                    {book.description}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">
                                    {book.copies} Copies Available
                                </span>
                                <Link
                                    href={`/books/${book._id}`}
                                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-bold rounded-xl shadow-md transition-all hover:scale-105"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-12">
                <Link
                    href="/books"
                    className="px-10 py-4 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-2xl shadow-xl transition-all hover:scale-105"
                >
                    See All Books in Catalog
                </Link>
            </div>
        </section>
    );
};

export default NewArrivals;
