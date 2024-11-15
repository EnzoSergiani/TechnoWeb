import { AuthorProps } from '@/data'
import { createContext, useContext, useEffect, useState } from 'react'
import axiosApi from './axiosApi'

type AuthorContextType = {
  authorsProv: AuthorProps[]
  load: () => Promise<AuthorProps[]>
  loadById(id: string): Promise<AuthorProps | null>
  deleteAuthor: (id: string) => Promise<void>
  createAuthor(authorData: Omit<AuthorProps, 'id'>): Promise<AuthorProps>
}

export const AuthorContext = createContext<AuthorContextType | undefined>(undefined)

export const AuthorProviders = ({ children }: { children: React.ReactNode }) => {
  const [authorsProv, setAuthors] = useState<AuthorProps[]>([])

  const load = async (): Promise<AuthorProps[]> => {
    try {
      const response = await fetch('http://localhost:3001/authors')
      const data = await response.json()
      setAuthors(data)
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
      return []
    }
  }
  const loadById = async (id: string): Promise<AuthorProps | null> => {
    try {
      const response = await fetch(`http://localhost:3001/authors/${id}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
      return null
    }
  }

  const deleteAuthor = async (id: string) => {
    try {
      const response = await axiosApi.delete(`/authors/${id}`)
      console.log('Author deleted:', response.data)
      load()
    } catch (error) {
      console.error('Error deleting author:', error)
    }
  }

  const createAuthor = async (authorData: Omit<AuthorProps, 'id'>): Promise<AuthorProps> => {
    try {
      const response = await axiosApi.post('/authors', authorData)
      console.log('Author created:', response.data)
      load()
      return response.data
    } catch (error) {
      console.error('Error creating author:', error)
      throw error
    }
  }
  useEffect(() => {
    load()
  }, [])

  return (
    <AuthorContext.Provider value={{ authorsProv, load, loadById, deleteAuthor, createAuthor }}>
      {children}
    </AuthorContext.Provider>
  )
}

export const useAuthor = () => {
  const context = useContext(AuthorContext)
  if (context === undefined) {
    throw new Error('useActiveTab must be used within a ActiveTabProvider')
  }
  return context
}
