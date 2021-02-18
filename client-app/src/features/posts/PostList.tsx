import { observer } from 'mobx-react-lite';
import React, {useContext, useEffect} from 'react'
import {Item, Button, Label, Segment, Grid, Container, TextArea, Form} from 'semantic-ui-react';
import PostStore from '../../app/stores/postStore'
import {makeAutoObservable} from 'mobx';
import { Link } from 'react-router-dom';

const PostList: React.FC = () => {

    const postStore = useContext(PostStore);
    const {postsByDate, selectPost} = postStore;

    useEffect(() => {
        postStore.loadPosts();
    }, [postStore])
    
    return (
        // <Segment clearing>
        // <Grid>
        //     <Grid.Column floated='left' width={8}>
        //         {postsByDate.map(post =>(
        //             <Item key={post.id}>
        //         ))};
        //              <h2>Tilte</h2>
        //              <Form>
        //                 <TextArea rows={2} placeholder='Tell us more' />
        //              </Form>
        //      </Grid.Column>
        //     <Grid.Column floated='right' width={8}>
        //         <Container>
        //             <h2>Hello List</h2>
        //             <Button color='red' content='Delete' />
        //             <Button color='grey' content='View' />
        //         </Container>
        //        
        //     </Grid.Column>
        // </Grid>
        // </Segment>
        
        <Segment clearing>
            <Item.Group divided>
                {postsByDate.map(post =>(
                    <Item key={post.id}>
                        <Item.Content>
                            <Item.Header as='a'>{post.title}</Item.Header>
                            <Item.Meta>{post.lastUpdatedDate}</Item.Meta>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
    
    
}

export default observer(PostList)