import { Book } from '@/data'
import { createContext, useContext, useState } from 'react'

type BookContextType = {
  booksProv: Book[]
  load: () => Promise<Book[]>
  loadById(id: string): Promise<Book | null>
  // onCreate: (book: Book) => void
}

export const BookContext = createContext<BookContextType | undefined>(undefined)

export const BookProviders = ({ children }: { children: React.ReactNode }) => {
  const [booksProv, setBooks] = useState<Book[]>([])

  const load = async (): Promise<Book[]> => {
    try {
      const response = await fetch('http://localhost:3001/books')
      const data = await response.json()
      setBooks(data)
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
      return []
    }
  }
  const loadById = async (id: string): Promise<Book | null> => {
    try {
      const response = await fetch(`http://localhost:3001/books/${id}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
      return null
    }
  }

  return <BookContext.Provider value={{ booksProv, load, loadById }}>{children}</BookContext.Provider>
}

export const useBook = () => {
  const context = useContext(BookContext)
  if (context === undefined) {
    throw new Error('useActiveTab must be used within a ActiveTabProvider')
  }
  return context
}
