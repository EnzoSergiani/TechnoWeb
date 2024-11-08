'use client'

import { Avatar } from '@/components/avatar'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Link } from '@/components/link'
import Rating from '@/components/rating'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getAuthor } from '@/data'
import { CalendarIcon, ChevronLeftIcon } from '@heroicons/react/16/solid'
import { notFound } from 'next/navigation'

export default function author({ params }: { params: { id: string } }) {
  let author = getAuthor(params.id)

  if (!author) {
    notFound()
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/authors" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Authors
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>{author.name}</Heading>
          <Badge color="red">N{author.id}</Badge>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <Rating rating={author.rating} />
            <span className="flex items-center gap-1 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CalendarIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>
                Last publication:{' '}
                {author.books[author.books.length - 1]?.publicationYear || "Can't find last year of publication"}
              </span>
            </span>
          </div>
          <div className="flex gap-2">
            <Button>Edit</Button>
            <Button color="red">Delete</Button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Subheading>Summary</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Name</DescriptionTerm>
          <DescriptionDetails>
            <Link href={author.id.toString()} className="flex items-center gap-2">
              <span>{author.name}</span>
            </Link>
          </DescriptionDetails>
          <DescriptionTerm>Number of books</DescriptionTerm>
          <DescriptionDetails>{author.numberOfBooks}</DescriptionDetails>
          <DescriptionTerm>Profile picture</DescriptionTerm>
          <DescriptionDetails className="flex gap-1">
            <Avatar src={author.profilePicture} className="size-6" />
            <span>{author.profilePicture}</span>
          </DescriptionDetails>
        </DescriptionList>
      </div>
      <Subheading className="mt-12">Books</Subheading>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Number</TableHeader>
            <TableHeader>Publication</TableHeader>
            <TableHeader>Title</TableHeader>
            <TableHeader>Review</TableHeader>
            <TableHeader>Action</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {author.books.map((book) => (
            <TableRow key={book.id} href={`/books/${book.id}`} title={`Book #${book.id}`}>
              <TableCell>{book.id}</TableCell>
              <TableCell className="text-zinc-500">{book.publicationYear}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.rating}</TableCell>
              <TableCell
                onClick={() => {
                  throw new Error('Not implemented')
                }}
                className="text-red-500 hover:underline"
              >
                Unassign
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}