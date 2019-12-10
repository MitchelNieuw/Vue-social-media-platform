import {IUser} from './user.contract';
import {IReaction} from './reaction.contract';

export interface IMessage {
    id: number;
    content: string;
    createdAt: string;
    image: string|null;
    reactions: Array<IReaction>;
    user: IUser;
}
