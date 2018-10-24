import { Injectable } from '@angular/core';

export class ITitle {
    name: string;
}
export class IGender {
    name: string;
}
@Injectable()
export class BaseDataSourcesService {
    genders: IGender[];
    titles: ITitle[];
    constructor() {

    }

    public getGender(): IGender[] {
        return [
            { name: 'Male' },
            { name: 'Female' }
        ];
    }
    public getTitles(): ITitle[] {
        return [
            { name: 'Mr' },
            { name: 'Mrs' },
            { name: 'Miss' },
            { name: 'Ms' },
            { name: 'Mx' },
            { name: 'Dr' }
        ];

    }
}
