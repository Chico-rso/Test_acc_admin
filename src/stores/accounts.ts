import type { AccountRecord } from '../types/accounts';

import { defineStore } from 'pinia';

import { createEmptyAccount, clampText, finalizeAccount, validateAccount } from '../assets/utils/accountUtils';

import { useLocalStorage } from '../composables/useLocalStorage';

const STORAGE_KEY = 'accounts:list:v1';

export const useAccountsStore = defineStore('accounts', () => {
    const { state } = useLocalStorage<AccountRecord[]>(STORAGE_KEY, []);
    const items = state;

    const addAccount = (): void => {
        items.value.push(createEmptyAccount());
    };

    const removeAccount = (id: string): void => {
        items.value = items.value.filter((account) => account.id !== id);
    };

    const updateLogin = (id: string, value: string): void => {
        const row = items.value.find((account) => account.id === id);
        if (!row) {
            return;
        }
        row.login = clampText(value, 100);
    };

    const updatePassword = (id: string, value: string): void => {
        const row = items.value.find((account) => account.id === id);
        if (!row) {
            return;
        }
        row.password = row.type === 'ldap' ? null : clampText(value, 100);
    };

    const updateType = (id: string, type: 'local' | 'ldap'): void => {
        const row = items.value.find((account) => account.id === id);
        if (!row) {
            return;
        }
        row.type = type;
        if (type === 'ldap') {
            row.password = null;
        }
    };

    const updateTagsInput = (id: string, value: string): void => {
        const row = items.value.find((account) => account.id === id);
        if (!row) {
            return;
        }
        row.tagsInput = clampText(value, 50);
    };

    const finalizeRow = (id: string): boolean => {
        const row = items.value.find((account) => account.id === id);
        if (!row) {
            return false;
        }
        return finalizeAccount(row);
    };

    const validateRow = (id: string): { login: boolean; password: boolean } => {
        const row = items.value.find((account) => account.id === id);
        if (!row) {
            return { login: false, password: false };
        }
        return validateAccount(row);
    };

    return {
        items,
        addAccount,
        removeAccount,
        updateLogin,
        updatePassword,
        updateType,
        updateTagsInput,
        finalizeRow,
        validateRow
    };
});


