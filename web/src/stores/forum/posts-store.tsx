import type { User } from "../auth-store";

export enum PostStatus {
    Approved,
    Archived,
    Deleted,
}

export interface Comment {
    id: string,
    body: string,
    status: PostStatus,
    author: User,
    postId: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface Post {
    id: string,
    slug: string,
    title: string,
    status: PostStatus,
    body: string,
    author: User,
    isMainPost: Boolean,
    comments: Comment[],
    createdAt: Date,
    updatedAt: Date,
}

export const dummyPosts: Post[] = [
    {
        id: "1",
        slug: "first-post",
        title: "First Post Title",
        status: PostStatus.Approved,
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec auctor, diam in congue efficitur, nisi nisi tincidunt nisi, quis tincidunt ligula nisi nec nisi. Donec et lacus euismod, efficitur nisi vitae, tincidunt nisi. Donec et lacus euismod, efficitur nisi vitae, tincidunt nisi. Donec et lacus euismod, efficitur nisi vitae, tincidunt nisi.",
        author: {
            name: "johndoe",
            email: "<EMAIL>",
        } as User,
        isMainPost: true,
        comments: [
            {
                id: "c1",
                body: "This is the first comment on the first post. It is approved. It is archived. It is deleted. It is all of these things. It is a comment. It is a thing. It is a thing that is a comment.",
                status: PostStatus.Approved,
                author: {
                    name: "anonymous duck",
                    email: "<EMAIL>",
                } as User,
                postId: "1",
                createdAt: new Date("2025-07-10T10:00:00Z"),
                updatedAt: new Date("2025-07-10T10:00:00Z"),
            },
            {
                id: "c2",
                body: "This is the second comment on the first post.",
                status: PostStatus.Archived,
                author: {
                    name: "anonymous cat",
                    email: "<EMAIL>",
                } as User,
                postId: "1",
                createdAt: new Date("2025-07-11T11:00:00Z"),
                updatedAt: new Date("2025-07-11T11:00:00Z"),
            },
        ],
        createdAt: new Date("2025-07-09T09:00:00Z"),
        updatedAt: new Date("2025-07-12T12:00:00Z"),
    },
    {
        id: "2",
        slug: "first-post",
        title: "Second Post Title",
        status: PostStatus.Approved,
        body: "This is the body of the second post.",
        author: {
            name: "janedoe",
            email: "<EMAIL>",
        } as User,
        isMainPost: false,
        comments: [
            {
                id: "c3",
                body: "This is the first comment on the second post.",
                status: PostStatus.Approved,
                author: {
                    name: "anonymous horse",
                    email: "<EMAIL>",
                } as User,
                postId: "2",
                createdAt: new Date("2025-07-10T12:00:00Z"),
                updatedAt: new Date("2025-07-10T12:00:00Z"),
            },
        ],
        createdAt: new Date("2025-07-09T10:00:00Z"),
        updatedAt: new Date("2025-07-12T13:00:00Z"),
    },
    {
        id: "3",
        slug: "first-post",
        title: "Third Post Title",
        status: PostStatus.Archived,
        body: "This is the body of the third post.",
        author: {
            name: "jake",
            email: "<EMAIL>",
        } as User,
        isMainPost: false,
        comments: [
            {
                id: "c4",
                body: "This is the first comment on the third post.",
                status: PostStatus.Deleted,
                author: {
                    name: "anonymous dog",
                    email: "<EMAIL>",
                } as User,
                postId: "3",
                createdAt: new Date("2025-07-10T14:00:00Z"),
                updatedAt: new Date("2025-07-10T14:00:00Z"),
            },
            {
                id: "c5",
                body: "This is the second comment on the third post.",
                status: PostStatus.Approved,
                author: {
                    name: "anonymous monkey",
                    email: "<EMAIL>",
                } as User,
                postId: "3",
                createdAt: new Date("2025-07-11T15:00:00Z"),
                updatedAt: new Date("2025-07-11T15:00:00Z"),
            },
        ],
        createdAt: new Date("2025-07-09T11:00:00Z"),
        updatedAt: new Date("2025-07-12T14:00:00Z"),
    },
    {
        id: "4",
        slug: "first-post",
        title: "Fourth Post Title",
        status: PostStatus.Deleted,
        body: "This is the body of the fourth post.",
        author: {
            name: "jane",
            email: "<EMAIL>",
        } as User,
        isMainPost: false,
        comments: [],
        createdAt: new Date("2025-07-09T12:00:00Z"),
        updatedAt: new Date("2025-07-12T15:00:00Z"),
    },
    {
        id: "5",
        slug: "first-post",
        title: "Fifth Post Title",
        status: PostStatus.Approved,
        body: "This is the body of the fifth post.",
        author: {
            name: "john",
            email: "<EMAIL>",
        } as User,
        isMainPost: false,
        comments: [
            {
                id: "c6",
                body: "This is the first comment on the fifth post.",
                status: PostStatus.Approved,
                author: {
                    name: "anonymous dog",
                    email: "<EMAIL>",
                } as User,
                postId: "3",
                createdAt: new Date("2025-07-11T15:00:00Z"),
                updatedAt: new Date("2025-07-11T15:00:00Z"),
            },
        ],
        createdAt: new Date("2025-07-09T11:00:00Z"),
        updatedAt: new Date("2025-07-12T14:00:00Z"),
    }
]
