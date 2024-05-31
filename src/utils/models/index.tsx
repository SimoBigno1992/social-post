export type User = {
    id: number
    email: string
    name: string
    gender?: string
    posts?: Post[]
    status: string
}

export type Post = {
    body: string
    comments: Comment[];
    id: number
    title: string
    user: User
    userId: number
}