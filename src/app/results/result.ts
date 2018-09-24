export class IAddress {
    addressLine: string;
    city: string;
    country: string;
}

export class IContact {
    landLine: string;
    mobile: string;
    other: string;
}

export class IResult {

        title: string;
        description: string;
        type: string;
        subtype: string;
        address: IAddress;
        contactNumber: IContact;
        manager: string;
        website: string;
        imageUrl: string;


}
