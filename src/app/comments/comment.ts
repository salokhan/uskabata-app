import { IUser } from '../shared_modules/user';

export class IComment {
    id: string;
    date: string;
    user: IUser;
    text: string;
}
