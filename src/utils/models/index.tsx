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
    id: number
    title: string
    user_id: number
}

export type Comment = {
    id: string
    post_id: number
    email: string
    name: string
    body: string
}

export type SetAtom<Args extends any[], Result> = (...args: Args) => Result;

export interface StoreModel {
    user: User
}
