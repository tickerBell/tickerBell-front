import React from 'react'
import ModalFrame from '../ModalFrame';


type MapModalType = {
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>,
  dimClick?: boolean,
  isDim?: boolean,
  onClose?: boolean,
  className?: string
}

const MapModal = ({ setOnModal, dimClick, isDim = true, className }: MapModalType) => {


  return (
    <ModalFrame
      setOnModal={setOnModal}
      isDim={isDim}
      onClose
      dimClick={dimClick}
      className={className}
    >
      지도
    </ModalFrame>
  )
}

export default MapModal