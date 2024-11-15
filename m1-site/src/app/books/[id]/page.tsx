'use client'
import { Avatar } from '@/components/avatar'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import CommentDrawer from '@/components/commentDrawer'
import { DeleteBook } from '@/components/deleteBook'
import { Heading, Subheading } from '@/components/heading'
import Rating from '@/components/rating'
import SetRating from '@/components/setRating'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import type { BookProps } from '@/data'
import { useBook } from '@/providers/useBookProviders'
import { ChevronLeftIcon, CurrencyDollarIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'
import { notFound, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Book({ params }: { params: { id: string } }) {
  const router = useRouter()

  const bookProv = useBook()

  const [book, setBook] = useState<BookProps | null>()
  const [loading, setLoading] = useState(true)
  const [currentBookId, setCurrentBookId] = useState<number | null>(null)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [rating, setRating] = useState<number>(0)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const fetchBookById = async () => {
    try {
      setBook(await bookProv.loadById(params.id))
    } catch (error) {
      console.error('Error loading books:', error)
    } finally {
      setLoading(false)
    }
  }

  const openAlert = () => setIsAlertOpen(true)
  const closeAlert = () => setIsAlertOpen(false)

  const handleDeleteBook = (bookId: number) => {
    setCurrentBookId(bookId)
    openAlert()
  }

  const handleConfirmDeleteBook = async () => {
    try {
      router.push('/books')
    } catch (error) {
      console.error('Erreur lors de la suppression du livre :', error)
    } finally {
      closeAlert()
    }
  }

  const handleRateBook = async (newRating: number) => {
    if (book) {
      await bookProv.rateBook(book.id, newRating)
      setRating(newRating)
      const updatedBook = await bookProv.loadById(book.id.toString())
      setBook(updatedBook)
    }
  }

  useEffect(() => {
    fetchBookById()
  }, [])

  useEffect(() => {
    if (!book && !loading) {
      notFound()
    }
  }, [book])

  let author = book?.author
  let review = Number(
    book?.reviews
      ?.map((review: { rating: any }) => {
        return review.rating
      })
      .reduce((acc: any, curr: any) => acc + curr, 0) / (book?.reviews?.length ?? 0)
  )

  if (isNaN(review)) {
    review = 0
  }

  const [asc, setAsc] = useState(true)

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open)
  }

  const handleCloseComment = () => {
    setDrawerOpen(false)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Button
        onClick={() => {
          toggleDrawer(true)
        }}
      >
        Comment
      </Button>
      <CommentDrawer isOpen={drawerOpen} onClose={handleCloseComment} />
      <div className="max-lg:hidden">
        <Link href="/books" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Books
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Heading>{book?.title}</Heading>
              <Rating rating={book?.rating ?? 0} />
              <Badge color={'yellow'} className="flex items-center justify-center">
                <CurrencyDollarIcon className="size-4" />
                <span>{book?.price}</span>
              </Badge>
              <Badge color="red">N{book?.id}</Badge>
            </div>
            <div className="mt-2 text-sm/6 text-zinc-500">{book?.publicationYear}</div>
          </div>
          {book?.coverPhoto && (
            <div className="mt-4">
              <img
                src={book.coverPhoto}
                alt={`${book.title} Cover`}
                style={{ width: '150px', height: '200px', objectFit: 'cover' }}
                className="rounded shadow-md"
              />
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button>Edit</Button>
          <Button
            color="red"
            onClick={() => {
              handleDeleteBook(book?.id || 0)
            }}
          >
            Delete
          </Button>
        </div>
      </div>
      <div className="flex justify-center p-4">
        <SetRating value={rating} onChange={handleRateBook} />
      </div>

      <Subheading className="mt-12">Author</Subheading>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Number</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Number of books</TableHeader>
            <TableHeader>Rating</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={author?.id} href={`/authors/${author?.id}`} title={`Order #${author?.id}`}>
            <TableCell>{author?.id}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar src={author?.profilePicture} className="size-6" />
                <span>{author?.name}</span>
              </div>
            </TableCell>
            <TableCell>{author?.numberOfBooks}</TableCell>
            <TableCell>{author?.rating.toPrecision(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Subheading className="mt-12">Reviews</Subheading>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Number</TableHeader>
            <TableHeader>Rating</TableHeader>
            <TableHeader>Comment</TableHeader>
            <TableHeader>
              <button onClick={() => setAsc(!asc)}>
                Date <span>&uarr;&darr;</span>
              </button>
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {book?.reviews
            ?.sort((a, b) =>
              asc ? a.createdAt.getTime() - b.createdAt.getTime() : b.createdAt.getTime() - a.createdAt.getTime()
            )
            .map((review) => (
              <TableRow key={review?.id} href={`/reviews/${review?.id}`} title={`Review #${review?.id}`}>
                <TableCell>{review?.id}</TableCell>
                <TableCell>
                  <Rating rating={Number(review?.rating.toPrecision(2))} />
                </TableCell>
                <TableCell>{review?.comment}</TableCell>
                <TableCell>{review?.createdAt.toDateString()}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <DeleteBook
        isOpen={isAlertOpen}
        onClose={closeAlert}
        onConfirm={handleConfirmDeleteBook}
        bookId={currentBookId || 0}
      />
    </>
  )
}
