import { Author, BookProps } from '@/data'
import { useAuthor } from '@/providers/useAuthorsProviders'
import { useBook } from '@/providers/useBookProviders'
import { ChangeEvent, useEffect, useState } from 'react'
import { Button } from './button'
import { Field, Fieldset, Label } from './fieldset'
import { Input } from './input'
import { Listbox, ListboxLabel, ListboxOption } from './listbox'

export const CreateInput = (props: {
  setOpenDialog: (open: boolean) => void
  type: 'author' | 'book'
  bookInformation?: BookProps | undefined
}) => {
  // Add props parameter
  const [title, setTitle] = useState('')
  const [authorId, setAuthorId] = useState<number>(1)
  const [publicationDate, setPublicationDate] = useState('')
  const [price, setPrice] = useState(-1)
  const [preview, setPreview] = useState(null)
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null)
  const authorProv = useAuthor()
  const bookProv = useBook()

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (props.type === 'book') {
      if (props.bookInformation) {
        const updatedBook = {
          id: props.bookInformation.id,
          title: title ? title : props.bookInformation.title,
          price: price >= 0 ? price : props.bookInformation.price,
          publicationYear: publicationDate ? parseInt(publicationDate) : props.bookInformation.publicationYear,
          coverPhoto: coverPhoto ? coverPhoto : props.bookInformation.coverPhoto,
        }
        try {
          bookProv.updateBook(updatedBook)
          props.setOpenDialog(false)
          return
        } catch (e) {
          console.error('Error updating book: ', e)
        }
      }
      const newBook = {
        title: title,
        author: {
          id: authorId,
        },
        price: price,
        publicationYear: parseInt(publicationDate),
        coverPhoto: coverPhoto,
      }
      try {
        bookProv.createBook(newBook)
        props.setOpenDialog(false)
      } catch (e) {
        console.error('Error creating book:', e)
      }
    } else {
      const newAuthor: Omit<Author, 'id'> = {
        name: title,
        profilePicture: 'default.png',
        numberOfBooks: 0,
        books: [],
        rating: 0,
      }
      try {
        authorProv.createAuthor(newAuthor)
        props.setOpenDialog(false)
      } catch (e) {
        console.error('Error creating author:', e)
      }
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverPhoto(reader.result as string)
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    if (props.bookInformation?.title) {
      setTitle(props.bookInformation.title)
      if (props.bookInformation?.coverPhoto) setPreview(props.bookInformation.coverPhoto as string)
      if (props.bookInformation?.publicationYear) setPublicationDate(props.bookInformation.publicationYear)
    }
  }, [props.bookInformation?.title])

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <Fieldset>
          <Field>
            <Label>{props.type === 'book' ? 'Title' : 'Name'}</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={props.type === 'book' ? 'Enter book title' : "Enter author's name"}
              id="title"
              required
            />
          </Field>
          {props.type === 'book' && (
            <>
              {props.bookInformation === undefined && (
                <>
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
                </>
              )}

              <Field>
                <Label>Price</Label>
                <Input
                  type="number"
                  value={price !== -1 ? price : props.bookInformation ? props.bookInformation.price : ''}
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
            </>
          )}
        </Fieldset>
        <label>
          {props.bookInformation?.coverPhoto ? 'Current Cover Photo:' : 'Cover Photo:'}
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        {preview && <img src={preview} alt="Image preview" style={{ width: 100, height: 100 }} />}

        <Button plain onClick={() => props.setOpenDialog(false)} style={{ marginTop: '20px' }}>
          Cancel
        </Button>
        <Button type="submit" style={{ marginTop: '20px' }}>
          {props.bookInformation ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  )
}
