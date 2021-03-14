import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { Post } from '../../../app/models/post';
import {format} from 'date-fns';
import { useStore } from '../../../app/stores/store';

interface Props {
    post: Post
}

export default function PostListItem({ post }: Props) {

    const {postStore} = useStore();
    const {deletePost} = postStore;
    
    return (
        <Segment.Group>
            <Segment clearing>
                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Container text>
                            <Item.Header as={Link} to={`/posts/${post.id}`}>
                                {post.title}
                            </Item.Header>
                                <p >{post.content}</p>
                            </Container>
                        </Item.Content>
                    </Item>
                </Item.Group>
                    <Button
                        as={Link}
                        // to={`/posts/${post.id}`}
                        to={`/posts/`}
                        color='teal'
                        floated='right'
                        content='View'
                    />
                    <Button
                        onClick={() => deletePost(post.id)}    
                        color='red'
                        floated='right'
                        content='Delete'
                    />
            </Segment>
        </Segment.Group>
    )
}