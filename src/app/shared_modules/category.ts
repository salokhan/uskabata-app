import { IExperty } from './experty';

export class ICategory {
    id: string;
    name: string;
    type: string;
    experties: IExperty[];
}
