import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";
import React, {useEffect, useState} from "react";
import {PagingParams} from "../../../app/models/pagination";
import {Grid, Label, Loader} from "semantic-ui-react";
import ActivityListItemPlaceholder from "../../activities/dashboard/ActivityListItemPlaceholder";
import InfiniteScroll from "react-infinite-scroller";
import PostList from "./PostList";
import PostListItem from "./PostListItem";
import {Post} from "../../../app/models/post";

export default observer(function PostDashboard() {
    const {postStore} = useStore();
    const {loadPosts, postRegistry} = postStore;
    

    // useEffect(() => {
    //     if (postRegistry.size <= 1) loadPosts();
    // }, [postRegistry.size, loadPosts])

    useEffect(() => {
        postStore.loadPosts();
    }, [postStore])
    
    return (
        <Grid>
            <Grid.Column width='16'>
                <PostList />
            </Grid.Column>
        </Grid>
    )
})