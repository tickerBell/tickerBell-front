import classNames from 'classnames';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import s from './button.module.scss';

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
  border: 'border border-transparent hover:saturate-10'
};

type ButtonProps = {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  theme?: 'primary' | 'secondary' | 'border';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string
  full?: boolean;
}

const Button = ({ children, size = "medium", theme = "primary", className, full, onClick, ...attr }: ButtonProps) => {
  return (
    <button
      className={classNames(twMerge(`${buttonTheme[theme]} ${buttonSize[size]} px-10 py-4 box-border cursor-pointer whitespace-pre rounded-4
      `, className), {
        [s.is_full]: full
      })}
      onClick={onClick}
      {...attr}
    >
      {children}
    </button>
  );
};

export default Button