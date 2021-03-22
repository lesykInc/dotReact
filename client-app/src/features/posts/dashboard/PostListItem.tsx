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
                                        {post.title}<br/>
                                    </Item.Header>
                                    <Label>Author: </Label><br/>
                                    <Item.Header>
                                        {(post.authorUserName)}
                                    </Item.Header>
                                </Grid.Column>
                                
                                <Grid.Column width={9}>
                                    <Label>Content: </Label>
                                    <Item.Description>
                                        <Container fluid content={post.content} >
                                        </Container>
                                    </Item.Description>
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
                            </Container>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        </Segment.Group>
    )
})