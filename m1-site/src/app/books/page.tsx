'use client'

import { Avatar } from '@/components/avatar'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { CreateInput } from '@/components/createInput'
import { Dialog, DialogBody, DialogTitle } from '@/components/dialog'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/dropdown'
import { Heading } from '@/components/heading'
import { Input, InputGroup } from '@/components/input'
import Rating from '@/components/rating'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { BookProps } from '@/data'
import { useBook } from '@/providers/useBookProviders'

import { CurrencyDollarIcon, EllipsisVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useEffect, useRef, useState } from 'react'
export default function Books() {
  const bookProv = useBook()
  const [books, setBooks] = useState<BookProps[]>(bookProv.booksProv)
  const [searchTerm, setSearchTerm] = useState('')
  const timeoutId = useRef<NodeJS.Timeout | null>(null)
  const [openCreateBook, setOpenCreateBook] = useState(false)

  const fetchBooks = async () => {
    try {
      setBooks(await bookProv.load())
    } catch (error) {
      console.error('Error loading books:', error)
    }
  }
  async function getBooks(searchTerm: string = '') {
    const booksToFilter = await bookProv.load()
    return booksToFilter.filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  useEffect(() => {
    setBooks(bookProv.booksProv)
  }, [bookProv.booksProv])

  useEffect(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }

    timeoutId.current = setTimeout(async () => {
      // Perform search
      const booksSearch = await getBooks(searchTerm)
      setBooks(booksSearch)
    }, 1000)

    return () => {
      if (timeoutId.current !== null) {
        clearTimeout(timeoutId.current)
      }
    }
  }, [searchTerm])

  const [asc, setAsc] = useState(true)

  function handleSort(key: keyof BookProps) {
    const sortedBooks = [...books].sort((a, b) => {
      if (a[key] < b[key]) return asc ? -1 : 1
      if (a[key] > b[key]) return asc ? 1 : -1
      return 0
    })
    setBooks(sortedBooks)
    setAsc(!asc)
  }
  function handleCreateBook() {
    setOpenCreateBook(true)
  }
  return (
    <>
      <Dialog title="Sort by" className="dialog" open={openCreateBook} onClose={() => setOpenCreateBook(false)}>
        <DialogTitle>Add a new book</DialogTitle>
        <DialogBody>
          <CreateInput setOpenDialog={setOpenCreateBook} type="book" />
        </DialogBody>
      </Dialog>

      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-4">
          <Heading>Books</Heading>
          <Button className="-my-0.5" onClick={handleCreateBook}>
            Create book
          </Button>
        </div>
        <div className="flex-1">
          <InputGroup>
            <MagnifyingGlassIcon />
            <Input
              name="search"
              placeholder="Search books&hellip;"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>
      <Table className="mt-8 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>
              <button onClick={() => handleSort('id')}>
                Book number <span>&uarr;&darr;</span>
              </button>
            </TableHeader>
            <TableHeader>
              <button onClick={() => handleSort('title')}>
                Title <span>&uarr;&darr;</span>
              </button>
            </TableHeader>
            <TableHeader>
              <button onClick={() => handleSort('price')}>
                Price <span>&uarr;&darr;</span>
              </button>
            </TableHeader>
            <TableHeader>
              <button onClick={() => handleSort('publicationYear')}>
                Publication year <span>&uarr;&darr;</span>
              </button>
            </TableHeader>
            <TableHeader>
              <button onClick={() => handleSort('rating')}>
                Rating <span>&uarr;&darr;</span>
              </button>
            </TableHeader>
            <TableHeader>
              <button onClick={() => handleSort('author')}>
                Author <span>&uarr;&darr;</span>
              </button>
            </TableHeader>
            <TableHeader>Action</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => {
            const review =
              book.reviews?.reduce((acc, review) => acc + review.rating, 0) / (book.reviews?.length || 1) || 0
            return (
              <TableRow key={book.id} href={`books/${book.id}`} title={`Order #${book.id}`}>
                <TableCell>{book.id}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>
                  <Badge color={'yellow'} className="flex items-center justify-center">
                    <CurrencyDollarIcon className="size-4" />
                    <span>{book.price}</span>
                  </Badge>
                </TableCell>
                <TableCell>{book.publicationYear}</TableCell>
                <TableCell>
                  <Rating rating={review} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar src={book.author.profilePicture} className="size-6" />
                    <span>{book.author.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownButton plain aria-label="More options">
                      <EllipsisVerticalIcon />
                    </DropdownButton>
                    <DropdownMenu anchor="bottom end">
                      <DropdownItem>Edit</DropdownItem>
                      <DropdownItem>Delete</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}
