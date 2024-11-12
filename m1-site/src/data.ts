export interface AuthorProps {
  id: number
  name: string
  profilePicture?: string
  numberOfBooks: number
  books: BookProps[]
  rating: number
}

export interface BookProps {
  id: number
  title: string
  price: number
  publicationYear: number
  rating: number
  author: AuthorProps
  reviews: ReviewProps[]
  coverPhoto?: string
}
export interface newBookProps {
  title: string
  author: {
    id: number
  }
  price: number
  publicationYear: number
}
export interface ReviewProps {
  id: number
  rating: number // Between 1 and 5 stars
  comment: string
  createdAt: Date
}
