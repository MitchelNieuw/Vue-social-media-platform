import {IUser} from '@/_core/contracts/user.contract';

export interface IFollowing {
    follower: IUser;
    user: IUser;
    status: number;
}
