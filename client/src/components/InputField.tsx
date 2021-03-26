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
        <p className={styles.inputField__helperText}>{helperText}</p>
      )}
      {error && touched && (
        <p className={styles.inputField__errorText}>{error}</p>
      )}
    </div>
  );
};

export default InputField;
