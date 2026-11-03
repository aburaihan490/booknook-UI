'use client';

import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteConfirmationProps {
    isOpen: boolean;
    bookTitle: string;
    isDeleting: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteConfirmation = ({
    isOpen,
    bookTitle,
    isDeleting,
    onClose,
    onConfirm,
}: DeleteConfirmationProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md animate-in zoom-in-95 rounded-2xl bg-white p-6 shadow-2xl">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    disabled={isDeleting}
                    className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                    <X size={20} />
                </button>

                {/* Icon */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
                    <AlertTriangle size={30} className="text-rose-600" />
                </div>

                {/* Content */}
                <div className="mt-5 text-center">
                    <h2 className="text-xl font-bold text-slate-800">
                        Delete Book?
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        Are you sure you want to delete{' '}
                        <span className="font-semibold text-slate-800">
                            &quot;{bookTitle}&quot;
                        </span>
                        ? This action cannot be undone.
                    </p>
                </div>

                {/* Actions */}
                <div className="mt-7 flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <Trash2 size={16} />
                        {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;
