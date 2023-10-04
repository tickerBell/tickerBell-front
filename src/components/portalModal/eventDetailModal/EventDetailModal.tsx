import React, { useEffect, useState } from 'react'
import ModalFrame from '../ModalFrame'
import Button from '@/components/button/Button'
import { ArrayGenerator } from '@/hooks/ArrayGenerator'
import classNames from 'classnames'
import { Modal } from '../Modal'

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
  const [select, setSelect] = useState<string[]>([]);

  const itemsA = ArrayGenerator(1, 20, 'a-');
  const itemsB = ArrayGenerator(1, 20, 'b-');
  const itemsC = ArrayGenerator(1, 20, 'c-');

  const selectSheet = (val: string) => {
    if (select.includes(val)) {
      setSelect(select.filter((item) => item !== val));
    } else if (select.length <= 1) {
      setSelect([...select, val]);
    }
  }

  console.log('cc', select);

  return (
    <ModalFrame
      setOnModal={setOnModal}
      isDim={isDim}
      onClose
      dimClick={dimClick}
      className={className}
    >
      <Modal.Title>
        좌석 선택
      </Modal.Title>
      <Modal.Content>
        <div className='flex items-end'>
          {/* a */}
          <div className='grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] max-w-100 gap-4'>
            {itemsA.map((item, index: any) => (
              <div key={index} onClick={() => selectSheet(item)} className={classNames('cursor-pointer border hover:border-primary p-2 text-center', {
                'border-red border-2': select.includes(item)
              })}>{item}</div>
            ))}
          </div>
          {/* b */}
          <div className='grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] max-w-470 gap-4 mx-10'>
            {itemsB.map((item, index: any) => (
              <div key={index} onClick={() => selectSheet(item)} className={classNames('cursor-pointer border hover:border-primary p-2 text-center', {
                'border-red border-2': select.includes(item)
              })}>{item}</div>
            ))}
          </div>
          {/* c */}
          <div className='grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] max-w-100 gap-4'>
            {itemsC.map((item, index: any) => (
              <div key={index} onClick={() => selectSheet(item)} className={classNames('cursor-pointer border hover:border-primary p-2 text-center', {
                'border-red border-2': select.includes(item)
              })}>{item}</div>
            ))}
          </div>
        </div>
      </Modal.Content>
      {/* TODO: 리팩토링 필요함 */}
      <Modal.Buttons>
        <div className='flex gap-12'>
          <ul>
            <li>선택한 좌석 : a-1</li>
            <li>가격 : 10000</li>
          </ul>
          <ul>
            <li>선택한 좌석 : a-1</li>
            <li>가격 : 10000</li>
          </ul>
        </div>
        <Button className='ml-auto w-100' size='medium'>결제하기</Button>
      </Modal.Buttons>
    </ModalFrame>
  )
}

export default EventDetailModal