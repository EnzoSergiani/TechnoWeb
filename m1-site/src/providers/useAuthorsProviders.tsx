import { Author } from '@/data'
import { createContext, useContext, useEffect, useState } from 'react'

type AuthorContextType = {
  authorsProv: Author[]
  load: () => Promise<Author[]>
  loadById(id: number): Promise<Author | null>
}

export const AuthorContext = createContext<AuthorContextType | undefined>(undefined)

export const AuthorProviders = ({ children }: { children: React.ReactNode }) => {
  const [authorsProv, setAuthors] = useState<Author[]>([])

  const load = async (): Promise<Author[]> => {
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
  const loadById = async (id: number): Promise<Author | null> => {
    try {
      const response = await fetch(`http://localhost:3001/authors/${id}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
      return null
    }
  }
  
  useEffect(() => {
    load()
  }, [])

  return <AuthorContext.Provider value={{ authorsProv, load, loadById }}>{children}</AuthorContext.Provider>
}

export const useAuthor = () => {
  const context = useContext(AuthorContext)
  if (context === undefined) {
    throw new Error('useActiveTab must be used within a ActiveTabProvider')
  }
  return context
}
