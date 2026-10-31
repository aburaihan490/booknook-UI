import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
const books = [
    {
        id: 1,
        title: 'The Midnight Library',
        author: 'Matt Haig',
        category: 'Fiction',
        cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600',
        rating: 4.8,
        description:
            'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
        copies: 5,
        addedBy: 'system',
    },
    {
        id: 2,
        title: 'Atomic Habits',
        author: 'James Clear',
        category: 'Self-Help',
        cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600',
        rating: 4.9,
        description:
            'No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear reveals practical strategies that will teach you exactly how to form good habits.',
        copies: 3,
        addedBy: 'system',
    },
    {
        id: 3,
        title: 'Project Hail Mary',
        author: 'Andy Weir',
        category: 'Sci-Fi',
        cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600',
        rating: 4.9,
        description:
            'A lone astronaut must save the earth from a disaster in this incredible new science-fiction thriller from the author of The Martian.',
        copies: 4,
        addedBy: 'system',
    },
    {
        id: 4,
        title: 'Educated: A Memoir',
        author: 'Tara Westover',
        category: 'Biography',
        cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
        rating: 4.7,
        description:
            'A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.',
        copies: 2,
        addedBy: 'system',
    },
    {
        id: 5,
        title: 'Dune',
        author: 'Frank Herbert',
        category: 'Sci-Fi',
        cover: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=600',
        rating: 4.8,
        description:
            'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.',
        copies: 6,
        addedBy: 'system',
    },
    {
        id: 6,
        title: 'The Silent Patient',
        author: 'Alex Michaelides',
        category: 'Mystery',
        cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600',
        rating: 4.6,
        description:
            'Alicia Berenson’s life is suddenly cut short when she shoots her husband five times in the face and never speaks another word.',
        copies: 3,
        addedBy: 'system',
    },
    {
        id: 7,
        title: 'Sapiens: A Brief History',
        author: 'Yuval Noah Harari',
        category: 'History',
        cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600',
        rating: 4.7,
        description:
            'From a notable historian comes a gripping narrative of human creation and evolution—from the Stone Age to modern times.',
        copies: 4,
        addedBy: 'system',
    },
    {
        id: 8,
        title: 'Kite Runner',
        author: 'Khaled Hosseini',
        category: 'Fiction',
        cover: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&q=80&w=600',
        rating: 4.9,
        description:
            "The unforgettable, heartbreaking story of the friendship between a wealthy boy and the son of his father's servant.",
        copies: 2,
        addedBy: 'system',
    },
];

const NewArrivals = () => {
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
                        key={book.id}
                        className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                    >
                        <div className="relative h-72 overflow-hidden bg-stone-100">
                            <img
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
                                    href={`/books/${book.id}`}
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
