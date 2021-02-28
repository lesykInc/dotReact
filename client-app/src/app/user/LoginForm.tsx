import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Header, Label } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { combineValidators, isRequired } from 'revalidate';
import { IUserFormValues } from '../models/user';
import { FORM_ERROR } from 'final-form';

const validate = combineValidators({
    email: isRequired('Email'),
    password: isRequired('Password')
});

const LoginForm = () => {
     const rootStore = useContext(RootStoreContext);
     const { login } = rootStore.userStore;
    return (
        <FinalForm
            onSubmit={(values: IUserFormValues) =>
                login(values).catch(error => ({
                    [FORM_ERROR]: error
                }))}
            validate={validate}
            render={({
                         handleSubmit,
                         submitting,
                         submitError,
                         invalid,
                         pristine,
                         dirtyFieldsSinceLastSubmit
                     }) => (
                <Form onSubmit={handleSubmit}>
                    <Header as={'h2'} content={'Login to dotReact'} color={"teal"} textAlign={"center"}  />
                    <Field name='email' component={TextInput} placeholder='Email' />
                    <Field
                        name='password'
                        component={TextInput}
                        placeholder='Password'
                        type='password'
                    />
                    {submitError && !dirtyFieldsSinceLastSubmit &&
                    (<Label color="red" basic content={submitError.statusText} />)}
                    <Button
                        disabled={(invalid || !dirtyFieldsSinceLastSubmit) || pristine}
                        loading={submitting}
                        color={"teal"}
                        content='Login'
                        fluid
                    />
                </Form>
            )}
        />
    );
};

export default LoginForm;
