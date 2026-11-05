'use client';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="p-12 text-center">
            <h2 className="text-xl font-bold">Something went wrong</h2>
            <button onClick={reset} className="mt-4 underline">
                Try again
            </button>
        </div>
    );
}
