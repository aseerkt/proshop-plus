import { useField, FieldHookConfig } from 'formik';
import styles from '../styles/components/InputField.module.scss';

type InputFieldProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string;
  label: string;
  helperText?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  helperText,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);
  return (
    <div className={styles.inputField}>
      <label className={styles.inputField__label} htmlFor={field.name}>
        {label}
      </label>
      <input className={styles.inputField__input} {...field} {...props} />
      {helperText && (
        <small className={styles.inputField__helperText}>{helperText}</small>
      )}
      {error && touched && (
        <small className={styles.inputField__errorText}>{error}</small>
      )}
    </div>
  );
};

export default InputField;
