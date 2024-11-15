import { StarIcon } from '@heroicons/react/16/solid'
import React, { useState } from 'react'

type RatingProps = {
  value: number
  onChange: (newRating: number) => void
}

const SetRating: React.FC<RatingProps> = ({ value, onChange }) => {
  const [rating, setRating] = useState(value)

  const handleClick = (newRating: number) => {
    setRating(newRating)
    onChange(newRating)
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '4px' }}>
        <label>Rate this book:</label>
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`h-6 w-6 cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
            onClick={() => handleClick(star)}
          />
        ))}
      </div>
    </div>
  )
}

export default SetRating
