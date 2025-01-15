export interface IUser {
    username: string;
    email: string;
    password: string;
    profilePicture?: string;
    roles: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IBlog {
    authorId: string;
    title: string;
    content: string;
    views: number;
    likes: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IComment {
    blogId: string;
    authorId: string;
    comment: string;
    createdAt?: Date;
}