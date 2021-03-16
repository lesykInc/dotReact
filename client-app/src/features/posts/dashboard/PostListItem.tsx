import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Button, Container, Grid, Icon, Item, Label, Segment, Image, TextArea, Header, Modal,} from 'semantic-ui-react';
import { Post } from '../../../app/models/post';
import {format} from 'date-fns';
import { useStore } from '../../../app/stores/store';
import { Profile } from '../../../app/models/profile';
import { observer } from 'mobx-react-lite';

interface Props {
    post: Post
}

export default observer(function PostListItem({ post }: Props ) {
    
    
    const {postStore, profileStore} = useStore();
    const {deletePost} = postStore;

    const [open, setOpen] = useState(false)
    
    return (
        <Segment.Group >
            <Segment clearing >
                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Grid>
                                
                                <Grid.Column width={3}>
                                    <Label>Title: </Label><br/>
                                    <Item.Header as={Link} to={`/posts/${post.id}`}>
                                        {post.title}
                                    </Item.Header>
                                </Grid.Column>
                                
                                <Grid.Column width={9}>
                                    <Label>Content: </Label>
                                    <Item.Description>
                                        <Container fluid content={post.content} >
                                        </Container>
                                    </Item.Description>
                                </Grid.Column>
                                
                                <Grid.Column width={4}>
                                    <Label>Last update:</Label><br/>
                                    {format(post.date!, 'dd MMM yyyy h:mm aa')}
                                </Grid.Column>
                            </Grid>
                            <Container fluid >
                                <Button
                                    as={Link}
                                    to={`/posts/${post.id}`}
                                    color='teal'
                                    floated='right'
                                    content='View'
                                />
                                <Button
                                    onClick={ () => setOpen(true)}
                                    color='red'
                                    floated='right'
                                    content='Delete'
                                />
                                <Modal
                                    basic
                                    onClose={() => setOpen(false)}
                                    onOpen={() => setOpen(true)}
                                    open={open}
                                    size='small'
                                >
                                    <Header icon>
                                        <Icon name='delete' />
                                        Delete Post?
                                    </Header>
                                    <Modal.Content>
                                        <p style={{textAlign: "center"}}>
                                            Are you sure you really want to delete the post?
                                        </p>
                                    </Modal.Content>
                                    <Modal.Actions style={{textAlign: "center"}}>
                                        <Button  basic color='green' inverted onClick={() => setOpen(false)}>
                                            <Icon name='remove' /> No
                                        </Button>
                                        <Button color='red' inverted onClick={() => deletePost(post.id) }>
                                            <Icon name='checkmark' /> Yes
                                        </Button>
                                    </Modal.Actions>
                                </Modal>
                            </Container>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        </Segment.Group>
    )
})