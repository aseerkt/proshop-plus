import cn from 'classnames';
import styles from '../styles/components/Button.module.scss';

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  isLoading?: boolean;
  variant?: 'filled' | 'outlined';
};

const Button: React.FC<ButtonProps> = ({
  isLoading = false,
  variant = 'outlined',
  children,
  ...props
}) => {
  return (
    <button
      disabled={isLoading || props.disabled}
      className={cn(
        {
          btn: variant === 'outlined',
          'btn btn-filled': variant === 'filled',
        },
        styles.button
      )}
    >
      {children}
    </button>
  );
};

export default Button;
