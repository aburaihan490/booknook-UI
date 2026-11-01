import AddBookForm from '@/components/AddBookForm';

const AddBookView = async () => {
    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="bg-white rounded-3xl border border-stone-200 shadow-xl p-8 sm:p-12 space-y-8">
                {/* Header */}
                <div>
                    <span className="text-emerald-800 font-bold tracking-widest text-xs uppercase bg-emerald-100 px-3 py-1 rounded-md">
                        Contribution
                    </span>

                    <h1 className="text-3xl font-black text-stone-900 mt-2 tracking-tight">
                        Add a New Book
                    </h1>

                    <p className="text-sm text-stone-600 mt-1">
                        Contribute a book to the BookNook community library.
                    </p>
                </div>

                {/* Form */}
                <AddBookForm />
            </div>
        </div>
    );
};

export default AddBookView;
