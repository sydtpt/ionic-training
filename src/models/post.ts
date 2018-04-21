export interface Post {
    image: string;
    legend: string;
    likes?: string[]
    comments?: Comments[];
    createdAt?: string;
}


export interface Comments {
    user: string;
    comment: string;
}
