import { StarIcon } from '@heroicons/react/16/solid'
import React from 'react'
import { Badge } from './badge'

interface RatingProps {
  rating: number
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  return (
    <Badge color={rating > 3 ? 'lime' : 'red'} className="flex items-center justify-center">
      <StarIcon className="size-4" />
      <span>{(rating ?? 0).toPrecision(2)}</span>
    </Badge>
  )
}

export default Rating
