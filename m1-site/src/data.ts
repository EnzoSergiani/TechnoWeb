export interface Author {
  id: number
  name: string
  profilePicture?: string
  numberOfBooks: number
  books: Book[]
  rating: number
}

export interface Book {
  id: number
  title: string
  price: number
  publicationYear: number
  rating: number
  author: Author
  reviews: Review[]
  coverPhoto?: string
}
export interface newBook {
  title: string
  author: {
    id: number
  }
  price: number
  publicationYear: number
}
export interface Review {
  id: number
  rating: number // Between 1 and 5 stars
  comment: string
  createdAt: Date
}
