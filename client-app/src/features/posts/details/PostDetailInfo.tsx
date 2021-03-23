import {observer} from 'mobx-react-lite';
import React, {useState} from 'react'
import {Segment, Grid, Icon, Label, Header, Button, TextArea, Form, Container, Modal} from 'semantic-ui-react'
import {format} from 'date-fns';
import {Post, PostFormValues} from '../../../app/models/post';
import MyTextInput from '../../../app/common/form/MyTextInput';
import {Link, useHistory} from 'react-router-dom';
import {useStore} from '../../../app/stores/store';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MyDateInput from "../../../app/common/form/MyDateInput";
import {Formik} from "formik";
import PostForm from '../form/PostForm';

interface Props {
    post: Post
}

export default observer(function PostDetailInfo({post}: Props) {

    const {postStore, userStore} = useStore();
    const {updatePost, deletePost} = postStore;

    const [edit, setEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const history = useHistory();
    // let isCurrentUserAuthor = userStore.user?.username === post.authorUsername;
    post.isAuthor = userStore.user?.username === post.authorUsername;
    
    return (
        <>
        {!edit && <>
        <Segment.Group style={ {width: 700, margin: '0 auto'} }>
            <Segment clearing>
                <Grid width={12} centered>
                    
                    <Grid.Column width={12}>
                        <br/>
                        <Header>
                            {post.title}
                        </Header>

                        <Container content={post.content}>
                        </Container>
                        <br/>
                        <Button color={"instagram"} floated={"right"} as={Link} to={`/posts`}>Back</Button>
                        {post.isAuthor &&
                        <>
                            < Button onClick={() => setEdit(true)} color={"teal"} floated={"right"}>Edit</Button>
                            <Button
                                onClick={() => setOpen(true)}
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
                                    <Icon name='delete'/> Delete Post?
                                </Header>
                                <Modal.Content>
                                    <p style={{textAlign: "center"}}>
                                        Are you sure you really want to delete the post?
                                    </p>
                                </Modal.Content>
                                <Modal.Actions style={{textAlign: "center"}}>
                                    <Button basic color='green' inverted onClick={() => setOpen(false)}>
                                        <Icon name='remove'/> No
                                    </Button>
                                    <Button color='red' inverted onClick={() => {
                                        deletePost(post.id);
                                        setOpen(false);
                                        history.push(`/posts`)
                                    }}>
                                        <Icon name='checkmark'/> Yes
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                        </>
                        }
                    </Grid.Column>
                    
                </Grid>
            </Segment>
        </Segment.Group></>}
        
    {edit && <>
    <Grid.Column >
        <PostForm/>
    </Grid.Column>
    </>}
        </>)
})