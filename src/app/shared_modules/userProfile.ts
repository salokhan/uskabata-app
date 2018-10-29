export class IAddress {
    country: string;
    state: string;
    city: string;
    addressLine: string;
}
export class IPersonalDetail {
    gender: string;
    title: string;
    firstName: string;
    lastName: string;
    displayName: string;
    emailAddress: string;
    about: string;
    addressPersonal: IAddress;
    contactsPersonal: any[];
}
export class IWorkPlaceDetail {
    Title: string;
    addressWorkPlace: IAddress;
    startTime: string;
    endTime: string;
    contactsWork: any[];
}
export class IProfessionalDetail {
    category: string;
    experty: string;
    description: string;
    tags: any[];
}
export class IQualificationDetail {
    school: string;
    degree: string;
    fielsOfStude: string;
    fromYear: string;
    toYear: string;

}
export class IUserProfile {
    personalDetail: IPersonalDetail;
    professionalDetail: IProfessionalDetail;
    workPlaceDetails: IWorkPlaceDetail[];
    qualificationDetails: IQualificationDetail[];
}
