import { Button } from '@/components/button'
import { Drawer } from '@mui/material'
import React, { useEffect, useState } from 'react'

interface CommentDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const CommentDrawer: React.FC<CommentDrawerProps> = ({ isOpen, onClose }) => {
  const [drawerOpen, setDrawerOpen] = useState(isOpen)

  useEffect(() => {
    setDrawerOpen(isOpen)
  }, [isOpen])

  return (
    <div>
      <Drawer anchor="left" open={drawerOpen} onClose={onClose}>
        <div className="w-96 pl-10 pr-10 pt-5">
          <span className="text-lg font-bold">Commentaires :</span>
          <div className="mt-4">
            <input type="text" placeholder="Enter your comment" className="w-full rounded border border-gray-300 p-2" />
            <Button className="mt-2">Send</Button>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default CommentDrawer
