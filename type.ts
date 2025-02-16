export interface IUser {
    username: string;
    email?: string;
    phoneNumber?: string; // Optional phone number field
    password: string;
    profilePicture?: string;
    role?: string;
    firstName?: string; 
    lastName?: string; 
    location?: string; 
    bio?: string;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface IBlog {
    authorId: string;
    image?:string;
    content?: string;
    views?: number;
    likes?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IComment {
    blogId: string;
    authorId: string;
    comment: string;
    createdAt?: Date;
}