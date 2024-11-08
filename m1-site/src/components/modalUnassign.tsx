import { Alert } from '@/components/alert'
import { Button } from '@/components/button'

type ModalUnassignProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: (authorId: number, bookId: number) => void
  authorId: number
  bookId: number
}

export const ModalUnassign = ({ isOpen, onClose, onConfirm, authorId, bookId }: ModalUnassignProps) => (
  <Alert size="md" onClose={onClose} open={isOpen}>
    You want to unassign this author from this book ?
    <div className="mt-4 flex justify-end gap-2">
      <Button onClick={onClose}>Cancel</Button>
      <Button color="red" onClick={() => onConfirm(authorId, bookId)}>
        Unassign
      </Button>
    </div>
  </Alert>
)
