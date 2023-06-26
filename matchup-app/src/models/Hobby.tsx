export type Hobby = {
    id: number;
    name: string;
}
export type HobbyComment = {
    id: number;
    hobbyId: number;
    comment: string;
}