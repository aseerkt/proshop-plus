import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import FormContainer from '../containers/FormContainer';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useLoginMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Login = () => {
  const [, login] = useLoginMutation();
  return (
    <FormContainer title='Login'>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values, action) => {
          try {
            const res = await login(values);
            console.log(res);
            const { errors } = res.data?.login;
            errors.forEach(({ path, message }) => {
              action.setFieldError(path, message);
            });
          } catch (err) {
            console.log(err);
          }
          console.log(values);
        }}
      >
        {({ isSubmitting, values: { email, password } }) => (
          <Form style={{ marginBottom: '1rem' }}>
            <InputField name='email' label='Email' placeholder='Email' />
            <InputField
              type='password'
              name='password'
              label='Password'
              placeholder='Password'
            />
            <Button
              disabled={!email || !password}
              type='submit'
              isLoading={isSubmitting}
              variant='filled'
            >
              Log In
            </Button>
          </Form>
        )}
      </Formik>
      <small>
        New Customer?{' '}
        <NextLink href='/register'>
          <a style={{ color: '#4e478b' }}>Sign Up</a>
        </NextLink>
      </small>
    </FormContainer>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Login);
