import { Formik, Form } from 'formik';
import Button from '../components/Button';
import InputField from '../components/InputField';
import FormContainer from '../containers/FormContainer';

const Register = () => {
  return (
    <FormContainer title='Register'>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={() => {}}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name='Name' placeholder='Full name' label='Name' />
            <InputField name='email' placeholder='Email' label='Email' />
            <InputField
              type='password'
              name='password'
              label='Password'
              placeholder='Enter your password'
            />
            <Button type='submit' isLoading={isSubmitting} variant='filled'>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default Register;
