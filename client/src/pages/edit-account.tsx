import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import Button from '../components/Button';
import InputField from '../components/InputField';
import Loader from '../components/Loader';
import Layout from '../containers/Layout';
import {
  useMeQuery,
  useEditProfileMutation,
  useChangePasswordMutation,
} from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import styles from '../styles/pages/EditAccount.module.scss';

const EditAccount = () => {
  const [{ data, fetching }] = useMeQuery();
  const [, editProfile] = useEditProfileMutation();
  const [, changePassword] = useChangePasswordMutation();

  let editAccountBody = null;

  if (fetching) editAccountBody = <Loader />;
  else if (data && data.me) {
    const { email: oldEmail, name: oldName } = data.me;
    console.log(oldEmail, oldName);
    editAccountBody = (
      <div className={styles.editAccount}>
        <Formik
          initialValues={{ email: oldEmail, name: oldName }}
          onSubmit={async (values, action) => {
            try {
              console.log(values);
              console.log(oldName, oldEmail);
              const res = await editProfile(values);
              const { errors } = res.data?.editProfile;
              if (errors) {
                errors.forEach(({ path, message }) => {
                  action.setFieldError(path, message);
                });
              }
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {({ isSubmitting, values: { email, name } }) => (
            <Form>
              <h3>Edit Profile</h3>
              <InputField label='Full name' name='name' />
              <InputField label='Email' name='email' />
              <Button
                type='submit'
                isLoading={isSubmitting}
                disabled={
                  !email || !name || (email === oldEmail && name === oldName)
                }
              >
                Edit profile
              </Button>
            </Form>
          )}
        </Formik>
        <Formik
          initialValues={{
            oldPassword: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={async (values, action) => {
            try {
              const res = await changePassword({ changePasswordInput: values });
              const { errors } = res.data?.changePassword;
              if (errors) {
                errors.forEach(({ path, message }) => {
                  action.setFieldError(path, message);
                });
              }
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {({
            isSubmitting,
            values: { oldPassword, password, confirmPassword },
          }) => (
            <Form>
              <h3>Change Password</h3>
              <InputField
                type='password'
                label='Old Password'
                name='oldPassword'
              />
              <InputField
                type='password'
                label='New Password'
                name='password'
              />
              <InputField
                type='password'
                label='Confirm New Password'
                name='confirmPassword'
              />
              <Button
                type='submit'
                isLoading={isSubmitting}
                disabled={
                  !oldPassword || !password || password !== confirmPassword
                }
              >
                Change Password
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }

  return (
    <Layout isPrivate title='Edit Account'>
      {editAccountBody}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EditAccount);
