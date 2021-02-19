import { observer } from 'mobx-react-lite';
import React, {useContext, useEffect} from 'react'
import {Item, Button, Label, Segment, Grid, Container, TextArea, Form, Pagination, Modal, Icon, Divider} from 'semantic-ui-react';
import PostStore from '../../app/stores/postStore'
import {makeAutoObservable} from 'mobx';
import { Link } from 'react-router-dom';

const PostList: React.FC = () => {

    const postStore = useContext(PostStore);
    const {postsByDate, selectPost, deletePost, submitting, target} = postStore;
    
    const [open, setOpen] = React.useState(false)

    useEffect(() => {
        postStore.loadPosts();
    }, [postStore])
    
    if (postStore.postRegistry===undefined) 
        return (
          <Segment textAlign={"center"}>
              <p>
              No posts created yet, click <Button color={"green"} >here</Button> to create' Title if no posts
              </p>          
          </Segment>  
        );
    
    return (
        <Segment clearing>
            <Item.Group divided>
                {postsByDate.map(post =>(
                    <Item key={post.id}>
                        <Item.Content>
                            <Grid.Column floated='left' width={14}>
                                <Item.Header as='a'>{post.title}</Item.Header>
                                {/*<Container text content={post.body}></Container>*/}
                                <Form>
                                    <TextArea as={TextArea} rows={3} placeholder='Tell us more' value={post.body} />
                                </Form>
                            </Grid.Column>
                            <Grid.Column floated='right' width={2}>
                                <Item.Meta>{post.lastUpdatedDate}</Item.Meta>
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
                                        <Button basic color='green' inverted onClick={() => setOpen(false)}>
                                            <Icon name='remove' /> No
                                        </Button>
                                        <Button color='red' inverted onClick={() => setOpen(false)}>
                                            <Icon name='checkmark' /> Yes
                                        </Button>
                                    </Modal.Actions>
                                </Modal>
                                <Button 
                                    // onClick={() => selectPost(post.id)}
                                    as={Link} to={`/posts/${post.id}`}
                                    color='blue' content='View' floated={"right"}/>
                            </Grid.Column>  
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
            <Container textAlign={"center"}>
            <Divider/>   
            <Pagination
                boundaryRange={1}
                defaultActivePage={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={10}
            />
            </Container>
        </Segment>
        
    );
    
    
}

export default observer(PostList)