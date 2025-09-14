import type { AccountRecord, TagItem } from '@/types/accounts.ts';

export const clampText = (value: string, max: number): string => {
    if (value.length > max) {
        return value.slice(0, max);
    }
    return value;
};

export const normalizeTags = (input: string): TagItem[] | null => {
    const trimmed = input.trim();
    if (trimmed.length === 0) {
        return null;
    }
    const parts = trimmed
        .split(';')
        .map((tagText) => tagText.trim())
        .filter((tagText) => tagText.length > 0)
        .slice(0, 50);
    if (parts.length === 0) {
        return null;
    }
    return parts.map((text) => ({ text }));
};

export const createEmptyAccount = (): AccountRecord => {
    return {
        id: crypto.randomUUID(),
        tagsInput: '',
        tags: null,
        type: 'local',
        login: '',
        password: ''
    };
};

export const validateAccount = (account: AccountRecord): { login: boolean; password: boolean } => {
    const loginOk = account.login.trim().length > 0 && account.login.length <= 100;
    const passwordOk = account.type === 'ldap' ? true : !!account.password && account.password.length > 0 && account.password.length <= 100;

    return { login: loginOk, password: passwordOk };
};

export const finalizeAccount = (account: AccountRecord): boolean => {
    const hasLogin = account.login.trim().length > 0;
    const hasPassword = account.type === 'ldap' ? true : (account.password ?? '').toString().trim().length > 0;
    if (!hasLogin || !hasPassword) {
        return false;
    }
    account.tags = normalizeTags(account.tagsInput);
    return true;
};


