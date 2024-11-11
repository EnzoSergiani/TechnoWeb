import { Book } from '@/data'
import { useAuthor } from '@/providers/useAuthorsProviders'
import { useBook } from '@/providers/useBookProviders'
import { useState } from 'react'
import { Button } from './button'
import { Field, Fieldset, Label } from './fieldset'
import { Input } from './input'
import { Listbox, ListboxLabel, ListboxOption } from './listbox'

export const CreateBook = (props: { setOpenDialog: (open: boolean) => void }) => {
  // Add props parameter
  const [title, setTitle] = useState('')
  const [authorId, setAuthorId] = useState<number>(1)
  const [publicationDate, setPublicationDate] = useState('')
  const [price, setPrice] = useState(-1)
  const authorProv = useAuthor()
  const bookProv = useBook()
  const [newBook, setNewBook] = useState<Book | null>()

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newBook = {
      title: title,
      author: {
        id: authorId,
      },
      price: price,
      publicationYear: parseInt(publicationDate),
      coverPhoto: 'default.jpg',
    }
    try {
      bookProv.createBook(newBook)
      props.setOpenDialog(false)
    } catch (e) {
      console.error('Error creating book:', e)
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Fieldset>
        <Field>
          <Label>Name</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
            id="title"
            required
          />
        </Field>

        <Field>
          <Label>Author</Label>
          <Listbox name="status" defaultValue={1} value={authorId} onChange={(e) => setAuthorId(e || 1)}>
            {authorProv.authorsProv.map((author) => (
              <ListboxOption key={author.id} value={author.id}>
                <ListboxLabel>{author.name}</ListboxLabel>
              </ListboxOption>
            ))}
          </Listbox>
        </Field>
        <Field>
          <Label>Price</Label>
          <Input
            type="number"
            value={price !== -1 ? price : ''}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            placeholder="Enter book price"
            id="price"
            required
          />
        </Field>

        <Field>
          <Label>Publication Year</Label>
          <Input
            type="number"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            placeholder="Enter publication year"
            id="publicationYear"
            required
          />
        </Field>
      </Fieldset>

      <Button plain onClick={() => props.setOpenDialog(false)}>
        Cancel
      </Button>
      <Button type="submit">Create book</Button>
    </form>
  )
}
