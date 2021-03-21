import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";
import React, {useEffect, useState} from "react";
import {PagingParams} from "../../../app/models/pagination";
import {Button, Grid, Label, Loader, Menu} from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";
import PostList from "./PostList";
import PostListItem from "./PostListItem";
import {Post} from "../../../app/models/post";
import ActivityListItemPlaceholder from "../../activities/dashboard/ActivityListItemPlaceholder";
import {NavLink} from "react-router-dom";

export default observer(function PostDashboard() {
    const {postStore} = useStore();
    const {loadPosts, postRegistry, pagination, setPagingParams, searchPost} = postStore;

    const [loadingNext, setLoadingNext] = useState(false);

    const [search, setSearch] = useState("");
    const [searchedPosts, setSearchedPosts] = useState([]);


    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadPosts().then(() => setLoadingNext(false));
    }

    const handleSearch = async (e) => {
        let searchTerm = e.target.value;
        setSearch(searchTerm);
        if (searchTerm) {
            let posts = await searchPost(searchTerm);
            setSearchedPosts(posts);
        }
    }

    useEffect(() => {
        if (postRegistry.size <= 1) loadPosts();
    }, [postRegistry.size, loadPosts])

    return (
        <Grid centered>
            <Grid.Column width='12'>
                {postStore.loadingInitial && !loadingNext ? (
                    <>
                        <ActivityListItemPlaceholder/>
                        <ActivityListItemPlaceholder/>
                    </>
                ) : (
                    <>
                        {
                            search
                                ?
                                searchedPosts.map(post => (
                                    <PostListItem key={post.id} post={post}/>
                                ))
                                :
                                <InfiniteScroll
                                    pageStart={0}
                                    loadMore={handleGetNext}
                                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                                    initialLoad={false}
                                >
                                    <PostList/>
                                </InfiniteScroll>
                        }


                    </>
                )}
            </Grid.Column>
            <Grid.Column width={4}>
                <Button as={NavLink} to='/createPost' positive content='Create Post'/>
                <input value={search} onChange={handleSearch}/>
            </Grid.Column>
            <Grid.Column width={12}>
                <Loader active={loadingNext}/>
            </Grid.Column>
        </Grid>
    )
})