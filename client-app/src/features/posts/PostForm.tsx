import React, {FormEvent, useContext, useState} from 'react'
import {Button, Form, Segment } from 'semantic-ui-react'
import  {v4 as uuid} from 'uuid';
import { observer } from 'mobx-react-lite';
import { IPost } from '../../app/models/post';
import  PostStore  from '../../app/stores/postStore';
import { Link } from 'react-router-dom';

interface IProps {
    post: IPost;
}

const PostForm: React.FC<IProps> = (
    {
        post: initialFormState
    }) => {

    const postStore = useContext(PostStore);
    const {createPost, editPost, submitting, cancelFormOpen} = postStore;


    const intializeForm = () => {
        if (initialFormState) {
            return initialFormState
        } else {
            return {
                id: '',
                title: '',
                body: '',
                createdDate: '',
                lastUpdatedDate: ''
            };
        }
    };

    const [post, setPost] = useState<IPost>(intializeForm);

    const handleSubmit = () => {
        if (post.id.length === 0) {
            let newPost = {
                ...post,
                id: uuid()
            };
            createPost(newPost);
        } else {
            editPost(post);
        }
    };

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget;
        setPost({...post, [name]: value})
    };


    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleInputChange}
                            name='title'
                            placeholder='Title'
                            value={post.title}
                />
                <Form.Input onChange={handleInputChange}
                               name='body' rows={2}
                               placeholder='Body'
                               value={post.body}
                />
                <Form.Input onChange={handleInputChange}
                            name='createdDate'
                            type='datetime-local'
                            placeholder='CreatedDate'
                            value={post.createdDate}
                />  <Form.Input onChange={handleInputChange}
                            name='lastUpdatedDate'
                            type='datetime-local'
                            placeholder='LastUpdatedDate'
                            value={post.lastUpdatedDate}
               />
                <Button loading={submitting} floated='right' positive type='submit' content='Save' />
                <Button onClick={cancelFormOpen}
                        as={Link} to={`/`}
                        floated='left'
                        type='button'
                        content='Back' />
            </Form>
        </Segment>
    );
};

export default observer(PostForm);