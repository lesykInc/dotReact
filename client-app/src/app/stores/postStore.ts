import {action, computed, makeAutoObservable, observable, runInAction} from "mobx";
import {createContext, useEffect} from 'react';
import { IPost } from '../models/post';
import agent from "../api/agent";
import { observer } from "mobx-react-lite";


export class PostStore {

    constructor() {
        makeAutoObservable(this);
    }
    
    @observable postRegistry = new Map();
    @observable posts: IPost[] = [];
    @observable post: IPost | undefined = undefined;
    @observable loadingInitial = false;
    @observable editMode = false;

    @computed get postsByDate() {
        return Array.from(this.postRegistry.values()).slice().sort(
            (a,b) => Date.parse(a.date) - Date.parse(b.date))
    }
    
    @action selectPost = (id: string) => {
        this.post = this.postRegistry.get(id);
        this.editMode = false;
    };
    
    @action loadPosts = async () => {
        this.loadingInitial = true;
        try {
            const posts = await agent.Posts.list();
            runInAction(() => {
                posts.forEach(post => {
                    post.createdDate = post.createdDate.split('***')[0];
                    post.lastUpdatedDate = post.lastUpdatedDate.split('***')[0];
                    this.postRegistry.set(post.id, post);
                });
                this.loadingInitial = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
        }
    };


    @action loadPost = async (id: string) => {
        let post = this.getPost(id);
        if (post) {
            this.post = post;
        } else {
            this.loadingInitial = true;
            try {
                post = await agent.Posts.details(id);
                runInAction(() => {
                    this.post = post;
                    this.loadingInitial = false;
                })
            } catch (error) {
                runInAction(() => {
                    this.loadingInitial = false;
                })
                console.log(error);
            }
        }
    }
   
    getPost = (id: string) => {
        return this.postRegistry.get(id);
    }

    @action setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
}

export default createContext(new PostStore());