import { ICountry } from './country';
import { ICity } from './city';
import { IState } from './state';
import { ICategory } from './category';
import { IExperty } from './experty';

export class IAddress {
    country: ICountry;
    state: IState;
    city: ICity;
    addressLine: string;
}
export class IContactNumber {
    contactNumber: string;
}
export class IGeneralDetail {
    gender: string;
    title: string;
    firstName: string;
    lastName: string;
    displayName: string;
    emailAddress: string;
    about: string;
    addressPersonal: IAddress;
    contactsPersonal: IContactNumber[];
}
export class IWorkPlaceDetail {
    title: string;
    addressWorkPlace: IAddress;
    startTime: string;
    endTime: string;
    contactsWork: IContactNumber[];
}
export class IProfessionalDetail {
    category: ICategory;
    experty: IExperty;
    description: string;
    tags: any[];
}
export class IQualificationDetail {
    school: string;
    degree: string;
    fielsOfStude: string;
    startDate: string;
    endDate: string;

}
export class IUserProfile {
    generalDetail: IGeneralDetail;
    professionalDetail: IProfessionalDetail;
    workPlaceDetails: IWorkPlaceDetail[];
    qualificationDetails: IQualificationDetail[];
}
