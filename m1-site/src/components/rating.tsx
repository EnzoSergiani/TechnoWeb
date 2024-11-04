import { StarIcon } from '@heroicons/react/16/solid'
import React from 'react'
import { Badge } from './badge'

interface RatingProps {
  rating: number
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  return (
    <Badge color={rating > 2.5 ? 'lime' : 'red'} className="flex items-center justify-center">
      <StarIcon className="size-4" />
      <span>{rating}</span>
    </Badge>
  )
}

export default Rating
