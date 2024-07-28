import { type ComponentPropsWithoutRef } from 'react';

export type ButtonProps = ComponentPropsWithoutRef<'button'>;

export const Button = ({ ...restProps }: ButtonProps) => {
  return <button {...restProps} />;
};
