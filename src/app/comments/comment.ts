import { IUser } from '../shared/user';

export class IComment {
    id: string;
    date: string;
    user: IUser;
    text: string;
}
