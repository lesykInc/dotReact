export interface Post {
    id: string;
    title: string;
    date: Date | null;
    content: string;
}

export class Post implements Post {
    constructor(init?: PostFormValues) {
        Object.assign(this, init);
    }
}

export class PostFormValues {
    id?: string = undefined;
    title: string = '';
    content: string = '';
    date: Date | null = null;

    constructor(post?: PostFormValues) {
        if (post) {
            this.id = post.id;
            this.title = post.title;
            this.content = post.content;
            this.date = post.date;
        }
    }
} 