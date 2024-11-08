import { Alert } from '@/components/alert'
import { Button } from '@/components/button'

type ModalUnassignProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: (bookId: number) => void
  bookId: number
}

export const ModalUnassign = ({ isOpen, onClose, onConfirm, bookId }: ModalUnassignProps) => (
  <Alert size="md" onClose={onClose} open={isOpen}>
    You want to unassign this author from this book ?
    <div className="mt-4 flex justify-end gap-2">
      <Button onClick={onClose}>Cancel</Button>
      <Button color="red" onClick={() => onConfirm(bookId)}>
        Unassign
      </Button>
    </div>
  </Alert>
)
