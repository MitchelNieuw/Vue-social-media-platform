import {IUser} from '@/_core/contracts/user.contract';

export interface IFollower {
    following: IUser;
    user: IUser;
    status: number;
}
