import classNames from 'classnames';
import React, { HTMLProps } from 'react'

type buttonSizeType = {
  [key: string]: string;
}

type buttonColorType = {
  [key: string]: string;
}

const buttonSize: buttonSizeType = {
  small: 'w-20 h-8 text-xs',
  medium: 'w-24 h-10 text-base',
  large: 'w-32 h-12 text-lg',
};

const buttonTheme: buttonColorType = {
  primary: 'bg-blue text-white',
  secondary: 'hover:bg-gray-400 text-black',
  border: ''
};

type ButtonProps = {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  theme?: 'primary' | 'secondary' | 'border';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string
}

const Button = ({ children, size = "medium", theme = "primary", className, onClick, ...attr }: ButtonProps) => {
  return (
    <button
      className={classNames(`${buttonTheme[theme]} ${buttonSize[size]} w-full h-full px-[6px] py-[8px] rounded border-0 outline-0 box-border cursor-pointer ease-in duration-300
      `, className)}
      onClick={onClick}
      {...attr}
    >
      {children}
    </button>
  );
};

export default Button