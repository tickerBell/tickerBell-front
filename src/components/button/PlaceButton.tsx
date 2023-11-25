import React from 'react'

type placeButtonType = {
  type?: string;
  children: React.ReactNode;
}

const PlaceButton = ({ type, children }: placeButtonType) => {
  return (
    <span>
      {children}
    </span>
  )
}

export default PlaceButton