// ModalFrame.tsx

import React from "react";
import ModalPortal from "./PortalModal";
import { IoCloseOutline } from "react-icons/io5";
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

type modalFrameType = {
  children: React.ReactNode;
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>,
  onClose?: boolean;
  isDim?: boolean;
  zindex?: number;
  dimClick?: boolean;
  onClick?: () => {};
  className?: string
}

const ModalFrame = ({
  children,
  setOnModal,
  onClose,
  isDim,
  zindex,
  dimClick,
  onClick,
  className
}: modalFrameType) => {
  return (
    <ModalPortal>
      <div className="fixed top-0 left-0 w-full h-full" onClick={onClick}>
        <div className={classNames(twMerge("absolute top-0 bottom-0 left-0 right-0 px-20 pt-20 m-auto bg-white min-w-[90%] min-h-200 w-fit h-fit pb-30 rounded-12", className), {})}>
          <div className="flex flex-col items-stretch w-full">
            {children}
            {onClose && (
              <div className="absolute inline-flex cursor-pointer right-20 top-20" onClick={() => setOnModal(false)}>
                <IoCloseOutline size={30} />
              </div>
            )}
          </div>
        </div>
        {isDim && <div className="w-full h-full bg-dim" onClick={() => (dimClick && setOnModal(false))}></div>}
      </div>
    </ModalPortal>
  );
};

export default ModalFrame;
