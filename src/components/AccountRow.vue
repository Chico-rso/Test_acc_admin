<script setup lang="ts">
import { computed, ref } from 'vue';
import { ACCOUNT_TYPE_OPTIONS, type AccountRecord, type AccountType } from '../types/accounts';
import { useAccountsStore } from '../stores/accounts';
import BaseSelect from './ui/BaseSelect.vue';

const props = defineProps<{ row: AccountRecord }>();

const store = useAccountsStore();

const validation = computed(() => store.validateRow(props.row.id));
const isLoginTouched = ref(false);
const isPasswordTouched = ref(false);

const onBlur = (field?: 'login' | 'password' | 'tags'): void => {
    if (field === 'login') {
        isLoginTouched.value = true;
    }
    if (field === 'password') {
        isPasswordTouched.value = true;
    }

    store.finalizeRow(props.row.id);
};
</script>

<template>
    <div class="row" :class="{ ldap: row.type === 'ldap' }">
        <div class="cell cell-tags">
            <input
                class="input"
                type="text"
                :value="row.tagsInput"
                placeholder="Метки; метки"
                @input="(event) => store.updateTagsInput(row.id, (event.target as HTMLInputElement).value)"
                @blur="onBlur('tags')"
            />
        </div>
        <div class="cell cell-type">
            <BaseSelect :model-value="row.type" :options="ACCOUNT_TYPE_OPTIONS" @update:modelValue="(newValue) => { store.updateType(row.id, newValue as AccountType); onBlur(); }" />
        </div>
        <div class="cell cell-login" :class="{ error: isLoginTouched && !validation.login }">
            <input
                class="input"
                type="text"
                :value="row.login"
                placeholder="Логин"
                @input="(event) => store.updateLogin(row.id, (event.target as HTMLInputElement).value)"
                @blur="onBlur('login')"
            />
        </div>
        <div class="cell cell-password" :class="{ error: isPasswordTouched && !validation.password }">
            <input
                v-if="row.type === 'local'"
                class="input"
                type="password"
                :value="row.password ?? ''"
                placeholder="Пароль"
                @input="(event) => store.updatePassword(row.id, (event.target as HTMLInputElement).value)"
                @blur="onBlur('password')"
            />
        </div>
        <div class="cell cell-actions">
            <button class="icon-btn" type="button" aria-label="Удалить" @click="store.removeAccount(row.id)">🗑️</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.row {
    display: grid;
    grid-template-columns: 1.4fr 0.9fr 1.1fr 1.1fr auto;
    column-gap: 12px;
    row-gap: 8px;
    align-items: center;
    padding: 8px 0;
}

.row.ldap .cell-login {
    grid-column: 3 / span 2;
}

.row.ldap .cell-password {
    display: none;
}

.cell {
    &.error .input {
        border-color: #e53935;
    }
}

.input, .select {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #cfd8dc;
    border-radius: 6px;
    background: #fff;
    box-sizing: border-box;
}

.icon-btn {
    padding: 6px 8px;
    border: 1px solid #cfd8dc;
    border-radius: 6px;
    background: #fff;

    cursor: pointer;
    transition: border-color .3s ease;

    &:hover {
        border-color: #78909c;
    }
}
</style>


