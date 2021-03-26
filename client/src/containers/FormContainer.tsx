import Head from 'next/head';
import styles from '../styles/containers/FormContainer.module.scss';

interface FormContainerProps {
  title: string;
}

const FormContainer: React.FC<FormContainerProps> = ({ children, title }) => {
  return (
    <div className='container'>
      <div className={styles.formContainer}>
        <Head>
          <title>{title}</title>
        </Head>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
