export interface BookType {
    _id: number;
    title: string;
    author: string;
    category: string;
    cover: string;
    rating: number;
    description: string;
    copies: number;
}

export interface BorrowType {
    _id: string;
    bookId: string;
    title: string;
    author: string;
    cover: string;
    userEmail: string;
    userId: string;
    borrowDate: string;
    returnDate: string;
}
