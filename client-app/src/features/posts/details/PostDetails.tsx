import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import PostDetailInfo from './PostDetailInfo';

export default observer(function PostDetails() {
    const {postStore} = useStore();
    const {selectedPost: post, loadPost, loadingInitial, clearSelectedPost} = postStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadPost(id);
        return () => clearSelectedPost();
    }, [id, loadPost, clearSelectedPost]);

    if (loadingInitial || !post) return <LoadingComponent />;

    return (
        <Grid>
            <Grid.Column>
                <PostDetailInfo post={post}/>
            </Grid.Column>
        </Grid>
    )
})