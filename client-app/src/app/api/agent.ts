import axios, {AxiosResponse }from 'axios';
import { IActivity } from '../models/activity';
import { IPost } from '../models/post';
import {history} from '../..';
import {toast} from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(undefined, error => {

    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network error - make sure API is running!')
    }
    
    const {status, data, config} = error.response;
    
    if (status === 404) {
        history.push('/notfound');
    }
    if(status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
        history.push('/notfound');
    }
    if (status === 500) {
        toast.error('Server error - check the terminal for more info!')
    }
    throw error;
});

const responseBody = (responce: AxiosResponse) => responce.data;

const sleep = (ms: number) => (response: AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(()=> resolve(response), ms))


const requests = {
    get: (url: string) => axios.get(url).then(sleep(250)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(250)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(250)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(250)).then(responseBody)
}

const Activities = {
    list: (): Promise<IActivity[]> => requests.get('/activities'),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post(`/activities`, activity),
    update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del(`/activities/${id}`)
}

const Posts = {
    list: (): Promise<IPost[]> => requests.get('/posts'),
    details: (id: string) => requests.get(`/posts/${id}`),
    create: (post: IPost) => requests.post(`/posts`, post),
    update: (post: IPost) => requests.put(`/posts/${post.id}`, post),
    delete: (id: string) => requests.del(`/posts/${id}`)
}

export default {
    Activities,
    Posts
}