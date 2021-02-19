import {action, computed, makeAutoObservable, observable, runInAction} from "mobx";
import {createContext, SyntheticEvent, useEffect} from 'react';
import { IPost } from '../models/post';
import agent from "../api/agent";
import { observer } from "mobx-react-lite";
import {IActivity} from "../models/activity";


export class PostStore {

    constructor() {
        makeAutoObservable(this);
    }
    
    @observable postRegistry = new Map();
    @observable posts: IPost[] = [];
    @observable post: IPost | undefined = undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';

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
                    post.createdDate = post.createdDate.split('T')[0];
                    post.lastUpdatedDate = post.lastUpdatedDate.split('T')[0];
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

    @action createPost = async (post: IPost) => {
        this.submitting = true;
        try {
            await agent.Posts.create(post);
            runInAction( () => {
                this.postRegistry.set(post.id, post);
                this.editMode = false;
                this.submitting = false;
            })
        } catch (error) {
            runInAction( () => {
                this.submitting = false;
            })
            console.log(error);
        }
    };

    @action editPost = async (post: IPost) => {
        this.submitting = true;
        try {
            await agent.Posts.update(post);
            runInAction(() => {
                this.postRegistry.set(post.id, post);
                this.post = post;
                this.editMode = false;
                this.submitting = false;
            });
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            });
            console.log(error);
        }
    };

    @action deletePost = async  (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await  agent.Posts.delete(id);
            runInAction(() => {
                this.postRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            });
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
                this.target = '';
            });
            console.log(error);
        }

    }
    
    @action cancelFormOpen = () => {
        this.editMode = false;
    }

    @action openEditForm  = (id: string) => {
        this.post = this.postRegistry.get(id);
        this.editMode = true;
    }

    
}

export default createContext(new PostStore());