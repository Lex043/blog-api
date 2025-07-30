export interface RegisterDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface PostDTO {
    title: string;
    content: string;
    coverImageUrl?: string;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
}
