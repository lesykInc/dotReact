﻿import {Post, PostFormValues} from "../models/post";
import {Pagination, PagingParams} from "../models/pagination";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {store} from "./store";
import {format} from "date-fns";
import {Activity, ActivityFormValues} from "../models/activity";
import {Profile} from "../models/profile";

export default class PostStore {
    postRegistry = new Map<string, Post>();
    selectedPost: Post | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    predicate = new Map().set('all', true);

    constructor() {
        makeAutoObservable(this);
    }

    get postsByDate() {
        return Array.from(this.postRegistry.values()).sort((a, b) =>
            a.date!.getTime() - b.date!.getTime());
    }

    get groupedPosts() {
        return Object.entries(
            this.postsByDate.reduce((posts, post) => {
                const date = format(post.date!, 'dd MMM yyyy');
                posts[date] = posts[date] ? [...posts[date], post] : [post];
                return posts;
            }, {} as {[key: string]: Post[]})
        )
    }

    loadPosts = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Posts.list(this.axiosParams);
            // @ts-ignore
            result.data.forEach(post => {
                this.setPost(post);
            })
            // this.setPagination(result.pagination)
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    private setPost = (post: Post) => {
        const user = store.userStore.user;
        post.date = new Date(post.date!);
        this.postRegistry.set(post.id, post);
    }
    
    private getPost = (id: string) => {
        return this.postRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        this.predicate.forEach((value, key) => {
            if (key === 'startDate') {
                params.append(key, (value as Date).toISOString())
            } else {
                params.append(key, value);
            }
        })
        return params;
    }
    
    loadPost = async (id: string) => {
        let post = this.getPost(id);
        if (post) {
            this.selectedPost = post;
            return post;
        } else {
            this.loadingInitial = true;
            try {
                post = await agent.Posts.details(id);
                this.setPost(post);
                runInAction(() => {
                    this.selectedPost = post;
                })
                this.setLoadingInitial(false);
                return post;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    
    createPost = async (post: PostFormValues) => {
        const user = store.userStore.user;
        try {
            await agent.Posts.create(post);
            const newPost = new Post(post);
            this.setPost(newPost);
            runInAction(() => {
                this.selectedPost = newPost;
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    deletePost = async (id: string) => {
        this.loading = true;
        try {
            await agent.Posts.delete(id);
            runInAction(() => {
                this.postRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updatePost = async (post: PostFormValues) => {
        try {
            await agent.Posts.update(post);
            runInAction(() => {
                if (post.id) {
                    let updatedPost = {...this.getPost(post.id), ...post}
                    this.postRegistry.set(post.id, updatedPost as Post);
                    this.selectedPost = updatedPost as Post;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    clearSelectedPost = () => {
        this.selectedPost = undefined;
    }
}