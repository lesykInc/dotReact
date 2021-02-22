import { observer } from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react'
import {
    Item,
    Button,
    Label,
    Segment,
    Grid,
    Container,
    TextArea,
    Form,
    Message,
    Divider,
    Modal, Icon
} from 'semantic-ui-react';
import PostStore from '../../app/stores/postStore'
import {makeAutoObservable} from 'mobx';
import { Link } from 'react-router-dom';

const PostWarning: React.FC = () => {

    const postStore = useContext(PostStore);
    const {openEditForm} = postStore;
    
    const [open, setOpen] = useState(false);
    
    return(
        <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='small'
            trigger={<Button color='red' content='Delete' floated='left'/>}
        >
            <Modal.Content style={{textAlign: 'center'}}>
                <h2>Warning</h2>
                <p>
                    Are you sure you would like to delete?
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='green' inverted onClick={() => {setOpen(false); }}>
                    <Icon name='remove' /> No
                </Button>
                <Button color='red' inverted onClick={(e) => {setOpen(false); /* deletePost(e, post.id); */} }>
                    <Icon name='checkmark' /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default observer(PostWarning)