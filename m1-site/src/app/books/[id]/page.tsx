'use client'
import { Avatar } from '@/components/avatar'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Heading, Subheading } from '@/components/heading'
import { Link } from '@/components/link'
import Rating from '@/components/rating'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getBook } from '@/data'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import { CurrencyDollarIcon } from '@heroicons/react/20/solid'
import { notFound } from 'next/navigation'
import { useState } from 'react'

export default function Book({ params }: { params: { id: string } }) {
  let book = getBook(params.id)

  if (!book) {
    notFound()
  }

  let author = book.author
  let review = Number(
    book.reviews
      .map((review) => {
        return review.rating
      })
      .reduce((acc, curr) => acc + curr, 0) / book.reviews.length
  )

  const [asc, setAsc] = useState(true)

  return (
    <>
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
              <Heading>{book.title}</Heading>
              <Rating rating={review} />
              <Badge color={'yellow'} className="flex items-center justify-center">
                <CurrencyDollarIcon className="size-4" />
                <span>{book.price}</span>
              </Badge>
              <Badge color="red">N{book.id}</Badge>
            </div>
            <div className="mt-2 text-sm/6 text-zinc-500">{book.publicationYear}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button>Edit</Button>
          <Button color="red">Delete</Button>
        </div>
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
          <TableRow key={author.id} href={`/authors/${author.id}`} title={`Order #${author.id}`}>
            <TableCell>{author.id}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar src={author.profilePicture} className="size-6" />
                <span>{author.name}</span>
              </div>
            </TableCell>
            <TableCell>{author.numberOfBooks}</TableCell>
            <TableCell>{author.rating}</TableCell>
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
          {book.reviews
            .sort((a, b) =>
              asc ? a.createdAt.getTime() - b.createdAt.getTime() : b.createdAt.getTime() - a.createdAt.getTime()
            )
            .map((review) => (
              <TableRow key={review.id} href={`/reviews/${review.id}`} title={`Review #${review.id}`}>
                <TableCell>{review.id}</TableCell>
                <TableCell>
                  <Rating rating={review.rating} />
                </TableCell>
                <TableCell>{review.comment}</TableCell>
                <TableCell>{review.createdAt.toDateString()}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  )
}
