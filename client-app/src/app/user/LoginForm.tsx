import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Header } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';


import { combineValidators, isRequired } from 'revalidate';

const validate = combineValidators({
    email: isRequired('Email'),
    password: isRequired('Password')
});

const LoginForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { login } = rootStore.userStore;
    return (
        <FinalForm
            onSubmit={(values) =>
                console.log(values)
            }
            render={({
                         handleSubmit
                     }) => (
                <Form onSubmit={handleSubmit} error>
                    <Field name='email' component={TextInput} placeholder='Email' />
                    <Field
                        name='password'
                        component={TextInput}
                        placeholder='Password'
                        type='password'
                    />
                    
                    <Button
                        positive
                        content='Login'
                    />
                </Form>
            )}
        />
    );
};

export default LoginForm;
