import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";
import React, {useEffect, useState} from "react";
import {PagingParams} from "../../../app/models/pagination";
import {Grid, Label, Loader} from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";
import PostList from "./PostList";
import PostListItem from "./PostListItem";
import {Post} from "../../../app/models/post";
import ActivityListItemPlaceholder from "../../activities/dashboard/ActivityListItemPlaceholder";

export default observer(function PostDashboard() {
    const {postStore} = useStore();
    const {loadPosts, postRegistry, pagination, setPagingParams} = postStore;

    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadPosts().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (postRegistry.size <= 1) loadPosts();
    }, [postRegistry.size, loadPosts()])
    
    return (
        <Grid centered>
            <Grid.Column width='12'>
                {/*{postStore.loadingInitial && !loadingNext ? (*/}
                {/*    <>*/}
                {/*        <ActivityListItemPlaceholder />*/}
                {/*        <ActivityListItemPlaceholder />*/}
                {/*    </>*/}
                {/*) : (*/}
                {/*    <>*/}
                {/*        <InfiniteScroll*/}
                {/*            pageStart={0}*/}
                {/*            loadMore={handleGetNext}*/}
                {/*            hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}*/}
                {/*            initialLoad={false}*/}
                {/*        >*/}
                {/*            <PostList />*/}
                {/*        </InfiniteScroll>*/}
                {/*    </>*/}
                {/*)}*/}
                <PostList />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext}/>
            </Grid.Column>
        </Grid>
    )
})