export class User {
    _id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    primaryEmail: string;
    secondaryEmail: string;
    phoneNumber: string;
    countryCode: string;
    password: string;
    status: string;
    accountType: string;
    createdDate: Date;
    modifiedDate?: Date;
    createdBy: string;
    modifiedBy?: string;
    activationDate: Date;
    terminationDate: Date;
    businessGroupID: string;
}
