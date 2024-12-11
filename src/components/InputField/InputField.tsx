import styles from "./InputField.module.css";

interface InputFieldProps {
  placeholder: string;
  name: string;
  type?: 'text' | 'number' | 'email' | 'password';
  validation: object;
  register: any;
  errors: any;
}

const InputField = ({ placeholder, name, type = 'text', validation, register, errors }: InputFieldProps) => {
  return (
    <div className={styles.inputField}>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, validation)}
      />
      {errors[name] && <span className={styles.p}>{errors[name]?.message}</span>}
    </div>
  );
};

export default InputField;
