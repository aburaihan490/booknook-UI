export default function MyBorrowsSkeleton() {
    return (
        <div className="w-full overflow-x-auto rounded-lg border border-stone-200 bg-[#072113e5]">
            <table className="w-full min-w-[750px] text-left text-sm text-gray-200">
                {/* Table Header */}
                <thead className="border-b border-white/10 text-gray-300">
                    <tr>
                        {[
                            'Image',
                            'Title',
                            'Author',
                            'Borrow Date',
                            'Action',
                        ].map((item) => (
                            <th key={item} className="px-5 py-4 font-medium">
                                {item}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* Skeleton Rows */}
                <tbody>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <tr
                            key={index}
                            className="animate-pulse border-b border-white/5 last:border-0"
                        >
                            {/* Image Skeleton */}
                            <td className="px-5 py-3">
                                <div className="h-[54px] w-[42px] rounded bg-white/10" />
                            </td>

                            {/* Title Skeleton */}
                            <td className="px-5 py-3">
                                <div className="h-4 w-36 rounded bg-white/10" />
                            </td>

                            {/* Author Skeleton */}
                            <td className="px-5 py-3">
                                <div className="h-4 w-24 rounded bg-white/10" />
                            </td>

                            {/* Borrow Date Skeleton */}
                            <td className="px-5 py-3">
                                <div className="h-4 w-28 rounded bg-white/10" />
                            </td>

                            {/* Action Skeleton */}
                            <td className="px-5 py-3 text-right">
                                <div className="ml-auto h-8 w-24 rounded-md bg-white/10" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
