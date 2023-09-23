import classNames from 'classnames';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type buttonType = {
  [key: string]: string;
}

const buttonSize: buttonType = {
  small: 'text-xs',
  medium: 'text-base',
  large: 'text-lg',
};

const buttonTheme: buttonType = {
  primary: 'bg-primary text-white',
  secondary: 'hover:bg-gray-400 text-black',
  border: 'border border-transparent hover:border-primary'
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
      className={classNames(twMerge(`${buttonTheme[theme]} ${buttonSize[size]} w-full px-10 py-4 box-border cursor-pointer whitespace-pre rounded-4
      `, className))}
      onClick={onClick}
      {...attr}
    >
      {children}
    </button>
  );
};

export default Button