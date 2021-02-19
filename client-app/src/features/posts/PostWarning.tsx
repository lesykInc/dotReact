import { observer } from 'mobx-react-lite';
import React, {useContext, useEffect} from 'react'
import {Item, Button, Label, Segment, Grid, Container, TextArea, Form, Message, Divider} from 'semantic-ui-react';
import PostStore from '../../app/stores/postStore'
import {makeAutoObservable} from 'mobx';
import { Link } from 'react-router-dom';

const PostWarning: React.FC = () => {

    const postStore = useContext(PostStore);
    
    return(
        <Segment>
            <Message>
                <Message.Header>Warning</Message.Header>
                <Divider />
                <p>Are you sure you would like for delete?</p>
            </Message>
            <Divider />
            
        </Segment>
    )
}

export default observer(PostWarning)