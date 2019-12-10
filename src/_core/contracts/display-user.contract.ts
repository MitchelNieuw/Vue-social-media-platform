import {IMessage} from '@/_core/contracts/message.contract';

export interface IDisplayUser {
    createdAt: string;
    email: string;
    followerCount: number;
    followingCount: number;
    messages: Array<IMessage>;
    name: string;
    tag: string;
    profilePicture: string;
    possibleBan: boolean;
    possibleFollow: boolean;
    possibleTurnOnNotifications: boolean;
    possibleTurnOffNotifications: boolean;
    possibleUnBan: boolean;
    possibleUnFollow: boolean;
}
