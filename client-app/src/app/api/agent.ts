import axios, {AxiosResponse }from 'axios';
import { IActivity } from '../models/activity';
import { IPost } from '../models/post';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (responce: AxiosResponse) => responce.data;

const sleep = (ms: number) => (response: AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(()=> resolve(response), ms))


const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)
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