import { Alert } from '@/components/alert'
import { Button } from '@/components/button'
import { useBook } from '@/providers/useBookProviders'
import { useState } from 'react'

type DeleteBookProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: (bookId: number) => void
  bookId: number
}

export const DeleteBook = ({ isOpen, onClose, onConfirm, bookId }: DeleteBookProps) => {
  const bookProv = useBook()
  const [error, setError] = useState<string | null>(null)

  const handleBookDelete = async () => {
    setError(null)
    try {
      await bookProv.deleteBook(bookId)
      onConfirm(bookId)
      onClose()
    } catch (e) {
      console.error('Error deleting book:', e)
      setError('Failed to delete the book. Please try again.')
    }
  }

  return (
    <Alert size="md" onClose={onClose} open={isOpen}>
      <div>
        Are you sure you want to delete this book?
        {error && <div className="mt-2 text-red-600">{error}</div>}
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button onClick={onClose}>Cancel</Button>
        <Button
          color="red"
          onClick={() => {
            handleBookDelete()
          }}
        >
          Confirm
        </Button>
      </div>
    </Alert>
  )
}
