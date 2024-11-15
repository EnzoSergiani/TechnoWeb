import { Button } from '@/components/button'
import { useBook } from '@/providers/useBookProviders'
import { Drawer } from '@mui/material'
import React, { useEffect, useState } from 'react'

interface CommentDrawerProps {
  isOpen: boolean
  onClose: () => void
  id: number | undefined
}

const CommentDrawer: React.FC<CommentDrawerProps> = ({ isOpen, onClose, id }) => {
  const bookProv = useBook()

  const [drawerOpen, setDrawerOpen] = useState(isOpen)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<string[]>([])

  useEffect(() => {
    setDrawerOpen(isOpen)
    fetchComments()
  }, [isOpen])

  const fetchComments = async () => {
    if (!id) return
    try {
      const book = await bookProv.loadById(id.toString())
      const reviews = book?.reviews || []
      setComments(reviews.map((review) => review.comment || ''))
    } catch (error) {
      console.error('Error loading comments:', error)
    }
  }

  const handleSendComment = () => {
    if (!id) return
    setComments([...comments, comment])
    setComment('')
  }

  return (
    <div>
      <Drawer anchor="left" open={drawerOpen} onClose={onClose}>
        <div className="h-full w-96 p-10">
          <span className="text-lg font-bold">Commentaires :</span>

          <div className="mt-4">
            {comments
              .slice(0)
              .reverse()
              .map((comment, index) => (
                <div key={index} className="border-b border-gray-200 py-2">
                  <p>{comment}</p>
                </div>
              ))}
          </div>

          <div className="sticky bottom-0 bg-white p-4">
            <div className="w-full rounded border border-black bg-white p-2">
              <textarea
                placeholder="Enter your comment"
                className="h-32 w-full p-2"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button className="mt-2" onClick={handleSendComment}>
                Send
              </Button>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default CommentDrawer
