import {IUser} from '@/_core/contracts/user.contract';

export interface IReaction {
    user: IUser;
    content: string;
    created_at: string;
    image: string|null;
    message_id: number;
}
