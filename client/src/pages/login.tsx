import FormContainer from '../containers/FormContainer';
import { Formik, Form } from 'formik';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useLoginMutation } from '../generated/graphql';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Login = () => {
  const [{ fetching }, login] = useLoginMutation();
  return (
    <FormContainer title='Login'>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          try {
            const res = await login(values);
            console.log(res);
          } catch (err) {
            console.log(err);
          }
          console.log(values);
        }}
      >
        {({}) => (
          <Form>
            <InputField name='email' label='Email' placeholder='Email' />
            <InputField
              type='password'
              name='password'
              label='Password'
              placeholder='Password'
            />
            <Button isLoading={fetching} type='submit' variant='filled'>
              Log In
            </Button>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Login);
