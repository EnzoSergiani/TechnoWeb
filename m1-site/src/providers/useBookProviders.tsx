import { BookInterface } from '@/export/interface'
import { createContext, useContext, useState } from 'react'
import axiosApi from './axiosApi'

type BookContextType = {
  booksProv: BookInterface[]
  load: () => Promise<BookInterface[]>
  loadById(id: string): Promise<BookInterface | null>
  createBook: (book: any) => Promise<void>
  updateBook: (book: any) => Promise<void>
  deleteBook: (id: number) => Promise<void>
  rateBook: (id: number, rating: number) => Promise<void>
}

export const BookContext = createContext<BookContextType | undefined>(undefined)

export const BookProviders = ({ children }: { children: React.ReactNode }) => {
  const [booksProv, setBooks] = useState<BookInterface[]>([])

  const load = async (): Promise<BookInterface[]> => {
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
  const loadById = async (id: string): Promise<BookInterface | null> => {
    try {
      const response = await fetch(`http://localhost:3001/books/${id}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
      return null
    }
  }
  const createBook = async (bookData: any) => {
    try {
      const response = await axiosApi.post('/books', bookData)
      //console.log("Book created:", response.data);
      load()
      return response.data
    } catch (error) {
      console.error('Error creating book:', error)
    }
  }
  const updateBook = async (bookData: any) => {
    try {
      const response = await axiosApi.put(`/books/${bookData.id}`, bookData)
      //console.log('Book updated:', response.data)
      return response.data
    } catch (error) {
      console.error('Error creating book:', error)
    }
  }
  const deleteBook = async (id: number) => {
    try {
      const response = await axiosApi.delete(`/books/${id}`)
      //console.log('Book deleted:', response.data)
      load()
    } catch (error) {
      console.error('Error deleting book:', error)
    }
  }
  const rateBook = async (id: number, rating: number) => {
    try {
      const response = await axiosApi.post(`/books/${id}/reviews`, { rating })
      //console.log('Book rated:', response.data)
      load()
      return response.data
    } catch (error) {
      console.error('Error rating book:', error)
    }
  }

  return (
    <BookContext.Provider value={{ booksProv, load, loadById, createBook, updateBook, deleteBook, rateBook }}>
      {children}
    </BookContext.Provider>
  )
}

export const useBook = () => {
  const context = useContext(BookContext)
  if (context === undefined) {
    throw new Error('useActiveTab must be used within a ActiveTabProvider')
  }
  return context
}
