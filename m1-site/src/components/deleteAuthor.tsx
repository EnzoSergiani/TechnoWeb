import { Alert } from '@/components/alert'
import { Button } from '@/components/button'
import { useAuthor } from '@/providers/useAuthorsProviders'
import { useState } from 'react'

type DeleteAuthorProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: (bookId: number) => void
  authorId: number
}

export const DeleteAuthor = ({ isOpen, onClose, onConfirm, authorId }: DeleteAuthorProps) => {
  const authorProv = useAuthor()
  const [error, setError] = useState<string | null>(null)

  const handleBookDelete = async () => {
    setError(null)
    try {
      await authorProv.deleteAuthor(authorId.toString())
      onConfirm(authorId)
      onClose()
    } catch (e) {
      console.error('Error deleting author:', e)
      setError('Failed to delete the author. Please try again.')
    }
  }

  return (
    <Alert size="md" onClose={onClose} open={isOpen}>
      <div>
        Are you sure you want to delete this author?
        {error && <div className="mt-2 text-red-600">{error}</div>}
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button onClick={onClose}>Cancel</Button>
        <Button color="red" onClick={handleBookDelete}>
          Confirm
        </Button>
      </div>
    </Alert>
  )
}
