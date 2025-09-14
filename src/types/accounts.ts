export type AccountType = 'local' | 'ldap';

export interface TagItem {
    text: string;
}

export interface AccountRecord {
    id: string;
    tagsInput: string;
    tags: TagItem[] | null;
    type: AccountType;
    login: string;
    password: string | null;
}

export const ACCOUNT_TYPE_OPTIONS: Array<{ value: AccountType; label: string }> = [
    { value: 'local', label: 'Локальная' },
    { value: 'ldap', label: 'LDAP' }
];


