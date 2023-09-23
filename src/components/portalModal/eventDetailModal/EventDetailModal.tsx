import React, { useEffect, useState } from 'react'
import ModalFrame from '../ModalFrame'
import Button from '@/components/button/Button'

type BasicModalType = {
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>,
  children?: React.ReactNode,
  dimClick?: boolean,
  isDim?: boolean,
  onClose?: boolean,
  className?: string
}

const EventDetailModal = ({ setOnModal, children, dimClick, isDim = true, className }: BasicModalType) => {

  const [grade, setGrade] = useState(1);

  return (
    <ModalFrame
      setOnModal={setOnModal}
      isDim={isDim}
      onClose
      dimClick={dimClick}
      className={className}
    >
      실제 결제 모달
      <ul>
        <li>좌석 선택</li>
        <li>정보 확인</li>
      </ul>
      <div>

      </div>
      {/* TODO: 리팩토링 필요함 */}
      <Button>{grade === 1 ? '다음단계' : '결제'}</Button>
    </ModalFrame>
  )
}

export default EventDetailModal