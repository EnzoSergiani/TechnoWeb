export interface AuthorInterface {
  id: number
  name?: string
  profilePicture?: string
  numberOfBooks?: number
  books?: BookInterface[]
  rating?: number
  description?: string
}

export interface BookInterface {
  id?: number
  title: string
  price: number
  publicationYear: number
  rating?: number
  author: AuthorInterface
  reviews?: ReviewInterface[]
  coverPhoto?: string
}

export interface ReviewInterface {
  id: number
  rating: number
  comment?: string
  createdAt: Date
  book: BookInterface
}
