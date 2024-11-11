import { Alert } from '@/components/alert'
import { Button } from '@/components/button'

type ModalProps = {
  text: string
  isOpen: boolean
  onClose: () => void
  onConfirm: (authorId: number, bookId: number) => void
  authorId: number
  bookId: number
}

export const Modal = ({ text, isOpen, onClose, onConfirm, authorId, bookId }: ModalProps) => (
  <Alert size="md" onClose={onClose} open={isOpen}>
    {text}
    <div className="mt-4 flex justify-end gap-2">
      <Button onClick={onClose}>Cancel</Button>
      <Button color="red" onClick={() => onConfirm(authorId, bookId)}>
        Confirm
      </Button>
    </div>
  </Alert>
)
