export class IPersoanlAddress {
    country: string;
    state: string;
    city: string;
}
export class IPersonalDetail {
    gender: string;
    title: string;
    firstName: string;
    lastName: string;
    displayName: string;
    emailAddress: string;
    about: string;
    addressPersonal: IPersoanlAddress;
    contactsPersonal: any[];
}
export class IWorkAddress {
    Title: string;
    country: string;
    state: string;
    city: string;
    addressLine: string;
    startTime: string;
    endTime: string;
}
export class IProfessionalDetail {
    category: string;
    experty: string;
    description: string;
    tags: any[];
    addressesWork: IWorkAddress[];
    contactsWork: any[];
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
    professionalDetails: IProfessionalDetail;
    qualificationDetails: IQualificationDetail;
}
