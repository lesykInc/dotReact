import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import ProfileStore from '../../../app/stores/profileStore';
import {useStore} from '../../../app/stores/store';
import PostListItem from './PostListItem';


export default observer(function PostList() {
    const {postStore, profileStore} = useStore();
    const {groupedPosts} = postStore;

    return (
        <>
            {groupedPosts.map(([group, posts]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    {posts.map(post => (
                        <PostListItem key={post.id} post={post} />
                    ))}
                </Fragment>
            ))}
        </>

    )
})