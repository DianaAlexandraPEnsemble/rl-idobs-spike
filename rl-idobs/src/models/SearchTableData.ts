export interface SearchTableData {
    status: string;
    code: string;
    name: string;
    description: string;
    repository: string;
    groupType: string;
    owner?: string;
    dynamicGroups: boolean;
    accounts: number;
    directAccounts: number;
    generalInfo: GeneralInfo;
    managerInfo: ManagerInfo;
    membershipInfo: MembershipInfo;
    conceptInfo: ConceptInfo;
}

interface GeneralInfo {
    employeeNumber: string;
    email: string;
    phone: string;
    mobile: string;
    givenName: string;
    surname: string;
    person: string;
}

interface ManagerInfo {
    managerId: string;
}

interface MembershipInfo {
    membershipId: string;
    membershipName: string;
}

interface ConceptInfo {
    conceptName: string;
}