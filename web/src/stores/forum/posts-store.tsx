import type { User } from "../auth-store";

export enum PostStatus {
    Approved,
    Archived,
    Deleted,
}

export interface Comment {
    id: string,
    comment: string,
    status: PostStatus,
    author: NonNullable<User> ,
    postId: string,
    date: Date,
}

export interface Post {
    id: string,
    slug: string,
    title: string,
    status: PostStatus,
    body: string,
    author: NonNullable<User> 
    isMainPost: Boolean,
    comments: Comment[],
    createdAt: Date,
    updatedAt: Date,
}
