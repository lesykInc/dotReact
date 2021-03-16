import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'
import { Segment, Grid, Icon, Label, Header, Button, TextArea, Form, Container } from 'semantic-ui-react'
import {format} from 'date-fns';
import { Post, PostFormValues } from '../../../app/models/post';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MyDateInput from "../../../app/common/form/MyDateInput";
import {Formik} from "formik";
import PostForm from '../form/PostForm';

interface Props {
    post: Post
}

export default observer(function PostDetailInfo({ post }: Props) {
    
    const {postStore} = useStore();
    const {updatePost} = postStore;
    
    const [edit, setEdit] = useState(false);
    
    return (
        <Segment.Group >
            <Segment attached='top' clearing>
                <Grid centered>
                    {!edit &&
                    <Grid.Column width={12}>
                        <Button onClick={() => setEdit(true)} color={"teal"} floated={"right"} >Edit</Button>
                            <Header>
                        {post.title}
                            </Header>

                            <Container text >
                        {post.content}
                            </Container>
                        
                            <Button color={"instagram"} floated={"right"} as={Link} to={'/posts'}>Back</Button>
                        
                    </Grid.Column>
                    }

                    {edit &&
                    <Grid.Column width={12}>
                        <Button onClick={() => setEdit(true)} color={"teal"} floated={"right"} >Edit</Button>
                        <Header>
                            {post.title}
                        </Header>

                        <PostForm />
                        
                        {/*<Button color={"instagram"} floated={"right"} as={Link} onClick={() => !edit}>Back</Button>*/}

                    </Grid.Column>
                    }
                </Grid>
            </Segment>
        </Segment.Group>
    )
})