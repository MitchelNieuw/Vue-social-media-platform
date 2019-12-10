export interface IUser {
    created_at: string;
    email: string;
    name: string;
    tag: string;
    profilePicture: string|null;
    followingCount: number;
    followerCount: number;
}
