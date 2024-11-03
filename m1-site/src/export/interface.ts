export interface AuthorInterface {
    id: number;
    name?: string;
    profilePicture?: string;
    numberOfBooks?: number;
    books?: BookInterface[];
    rating?: number;
}

export interface BookInterface {
    id?: number;
    title: string;
    price: number;
    publicationYear: number;
    rating?: number;
    author: AuthorInterface;
    reviews?: ReviewInterface[];
}

export interface ReviewInterface {
    id: number;
    rating: 0 | 1 | 2 | 3 | 4 | 5; 
    comment?: string;
    createdAt: Date;
    book: BookInterface;
}