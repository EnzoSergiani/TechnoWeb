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
}

export interface Review {
  id: number
  rating: number // Between 1 and 5 stars
  comment: string
  createdAt: Date
}

const authors: Author[] = [
  {
    id: 1,
    name: 'F. Scott Fitzgerald',
    profilePicture: '/authors/f-scott-fitzgerald.jpg',
    numberOfBooks: 5,
    books: [],
    rating: 4.7,
  },
  {
    id: 2,
    name: 'Harper Lee',
    profilePicture: '/authors/harper-lee.jpg',
    numberOfBooks: 2,
    books: [],
    rating: 4.9,
  },
  {
    id: 3,
    name: 'J.K. Rowling',
    profilePicture: '/authors/jk-rowling.jpg',
    numberOfBooks: 7,
    books: [],
    rating: 4.8,
  },
  {
    id: 4,
    name: 'George Orwell',
    profilePicture: '/authors/george-orwell.jpg',
    numberOfBooks: 6,
    books: [],
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Jane Austen',
    profilePicture: '/authors/jane-austen.jpg',
    numberOfBooks: 4,
    books: [],
    rating: 4.5,
  },
]

const books: Book[] = [
  {
    id: 1,
    title: 'The Great Gatsby',
    price: 10.99,
    publicationYear: 1925,
    rating: 4.5,
    author: authors[0],
    reviews: [
      {
        id: 1,
        rating: 5,
        comment: 'A masterpiece of American literature.',
        createdAt: new Date('2023-01-01'),
      },
      {
        id: 2,
        rating: 4,
        comment: 'A great read, but a bit dated.',
        createdAt: new Date('2023-02-01'),
      },
    ],
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    price: 7.99,
    publicationYear: 1960,
    rating: 4.8,
    author: authors[1],
    reviews: [
      {
        id: 3,
        rating: 5,
        comment: 'A timeless classic.',
        createdAt: new Date('2023-03-01'),
      },
      {
        id: 4,
        rating: 4,
        comment: 'Very impactful and thought-provoking.',
        createdAt: new Date('2023-04-01'),
      },
    ],
  },
  {
    id: 3,
    title: "Harry Potter and the Sorcerer's Stone",
    price: 12.99,
    publicationYear: 1997,
    rating: 4.9,
    author: authors[2],
    reviews: [
      {
        id: 5,
        rating: 0,
        comment: 'I hated it!',
        createdAt: new Date('2023-05-01'),
      },
      {
        id: 6,
        rating: 4,
        comment: 'An enchanting story, but a bit too long.',
        createdAt: new Date('2023-06-01'),
      },
    ],
  },
  {
    id: 4,
    title: '1984',
    price: 9.99,
    publicationYear: 1949,
    rating: 4.7,
    author: authors[3],
    reviews: [
      {
        id: 7,
        rating: 5,
        comment: 'A chilling dystopian novel that remains relevant today.',
        createdAt: new Date('2023-07-01'),
      },
      {
        id: 8,
        rating: 4,
        comment: 'A thought-provoking read, but quite dark.',
        createdAt: new Date('2023-08-01'),
      },
    ],
  },
  {
    id: 5,
    title: 'Pride and Prejudice',
    price: 8.99,
    publicationYear: 1813,
    rating: 4.6,
    author: authors[4],
    reviews: [
      {
        id: 9,
        rating: 5,
        comment: 'A delightful romantic novel with memorable characters.',
        createdAt: new Date('2023-09-01'),
      },
      {
        id: 10,
        rating: 4,
        comment: 'A charming story, but the language can be challenging.',
        createdAt: new Date('2023-10-01'),
      },
    ],
  },
]

authors.forEach((author) => {
  author.books = books.filter((book) => book.author.id === author.id)
  author.numberOfBooks = author.books.length
})

export function getAuthors() {
  return authors
}

export function getAuthor(id: string) {
  return authors.find((author) => author.id.toString() === id)
}

export function getBooks(searchTerm: string = '') {
  return books.filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()))
}

export function getBook(id: string) {
  console.log('getBook', id)
  return getBooks().find((book) => book.id.toString() === id)
}
