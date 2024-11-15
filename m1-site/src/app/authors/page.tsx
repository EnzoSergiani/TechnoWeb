'use client'

import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { CreateInput } from '@/components/createInput'
import { Dialog, DialogBody } from '@/components/dialog'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/dropdown'
import { Heading } from '@/components/heading'
import Rating from '@/components/rating'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { AuthorProps } from '@/data'
import { useAuthor } from '@/providers/useAuthorsProviders'
import { DialogTitle } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'
import { useEffect, useState } from 'react'

export default function Authors() {
  const authorsProv = useAuthor()
  const [authors, setAuthors] = useState<AuthorProps[]>([])
  const [openCreateAuthor, setOpenCreateAuthor] = useState(false)
  const fetchAuthors = async () => {
    try {
      setAuthors(await authorsProv.load())
    } catch (error) {
      console.error('Error loading books:', error)
    }
  }
  function handleCreateAuthor() {
    setOpenCreateAuthor(true)
  }
  useEffect(() => {
    setAuthors(authorsProv.authorsProv)
  }, [authorsProv.authorsProv])

  useEffect(() => {
    fetchAuthors()
  }, [])
  return (
    <>
      <Dialog title="Sort by" className="dialog" open={openCreateAuthor} onClose={() => setOpenCreateAuthor(false)}>
        <DialogTitle>Add a new book</DialogTitle>
        <DialogBody>
          <CreateInput setOpenDialog={setOpenCreateAuthor} type="author" />
        </DialogBody>
      </Dialog>

      <div className="flex items-end justify-between gap-4">
        <Heading>Authors</Heading>
        <Button className="-my-0.5" onClick={handleCreateAuthor}>
          Create author
        </Button>
      </div>
      <Table className="mt-8 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Author number</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Number of books</TableHeader>
            <TableHeader>Rating</TableHeader>
            <TableHeader>Action</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {authors.map((author) => (
            <TableRow key={author.id} href={`authors/${author.id}`} title={`Order #${author.id}`}>
              <TableCell>{author.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar src={author.profilePicture} className="size-6" />
                  <span>{author.name}</span>
                </div>
              </TableCell>
              <TableCell>{author.numberOfBooks}</TableCell>
              <TableCell>
                <Rating rating={author.rating || 0} />
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
          ))}
        </TableBody>
      </Table>
    </>
  )
}
