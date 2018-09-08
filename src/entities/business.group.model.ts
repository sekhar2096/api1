export class BusinessGroup {
    _id: string;
    businessGroupName: string;
    businessGroupIdentifier: string;
    phoneNumber: string;
    countryCode: string;
    primaryEmail: string;
    secondaryEmail: string;
    businessEntityTypeID: string;
    parentBusinessGroupID: string;
    streetAddress: string;
    suiteNo: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    createdDate: Date;
    modifiedDate?: Date;
    createdBy: string;
    modifiedBy?: string;
    activationDate: Date;
    terminationDate: Date;
    status: string;
}
