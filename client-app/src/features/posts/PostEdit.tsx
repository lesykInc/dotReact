import { observer } from 'mobx-react-lite';
import React, {useContext, useEffect} from 'react'
import {Item, Button, Label, Segment, Grid, Container, TextArea, Form, Message, Divider} from 'semantic-ui-react';
import PostStore from '../../app/stores/postStore'
import {makeAutoObservable} from 'mobx';
import { Link } from 'react-router-dom';

const PostEdit: React.FC = () => {

    const postStore = useContext(PostStore);

    return(
        <Segment>
            <Container>
                <Form>
                    <Form.Field>
                        <label>Title</label>
                        <input placeholder='First Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>Content</label>
                        <input placeholder='Last Name' />
                    </Form.Field>
                </Form>
            </Container>
            <Container>
                <Button color='green' content='Save' floated='right'/>
                <Button color='grey' content='Back' floated='right'/>
            </Container>
        </Segment>
    )
}

export default observer(PostEdit)