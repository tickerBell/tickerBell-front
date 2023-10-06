import React from 'react';
import DaumPostcode from "react-daum-postcode";
import ModalFrame from '../ModalFrame';

type SearchMapModalType = {
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>,
  isDim?: boolean,
  onClose?: boolean,
  className?: string
  company: any;
  setCompany: any;
}

const SearchMapModal = ({ setOnModal, company, setCompany, isDim = true, className }: SearchMapModalType) => {

  const complete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    console.log(data)
    console.log(fullAddress)
    console.log(data.zonecode)
    setOnModal(false);
    setCompany({
      ...company,
      address: fullAddress,
    })
  }
  return (
    <ModalFrame
      setOnModal={setOnModal}
      isDim={isDim}
      onClose
      className={className}
    >
      <DaumPostcode
        autoClose
        onComplete={complete} />
    </ModalFrame>
  )
}

export default SearchMapModal