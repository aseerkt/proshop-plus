import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Button from '../components/Button';
import InputField from '../components/InputField';
import FormContainer from '../containers/FormContainer';
import { useRegisterMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Register = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();

  return (
    <FormContainer title='Register'>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={async (values, action) => {
          try {
            const res = await register({ registerInput: values });
            const { errors, ok } = res.data?.register;
            if (errors)
              errors.forEach(({ path, message }) => {
                action.setFieldError(path, message);
              });
            if (ok) router.push('/login');
          } catch (err) {
            console.log(err);
          }
        }}
      >
        {({ isSubmitting, values: { name, email, password } }) => (
          <Form style={{ marginBottom: '1rem' }}>
            <InputField name='name' placeholder='Full name' label='Name' />
            <InputField name='email' placeholder='Email' label='Email' />
            <InputField
              type='password'
              name='password'
              label='Password'
              placeholder='Enter your password'
            />
            <Button
              disabled={!name || !email || !password}
              type='submit'
              isLoading={isSubmitting}
              variant='filled'
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
      <small>
        Already a member?{' '}
        <NextLink href='/login'>
          <a style={{ color: '#4e478b' }}>Log In</a>
        </NextLink>
      </small>
    </FormContainer>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Register);
