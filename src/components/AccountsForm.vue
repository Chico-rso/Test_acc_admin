<script setup lang="ts">
import { computed } from 'vue';
import { useAccountsStore } from '../stores/accounts';
import AccountRow from './AccountRow.vue';

const store = useAccountsStore();

const list = computed(() => store.items);
const showPasswordHead = computed(() => list.value.some((account) => account.type === 'local'));

</script>

<template>
    <section class="accounts">
        <header class="header">
            <h1 class="title">Учетные записи</h1>

            <button class="add" type="button" aria-label="Добавить" @click="store.addAccount()">+</button>
        </header>
        <p class="legend">Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</p>

        <h2 v-if="list.length === 0" class="empty">Нет записей. Нажмите + чтобы добавить.</h2>
        <div v-else class="table">
            <ul class="head" :class="{ 'no-password': !showPasswordHead }">
                <li>Метки</li>
                <li>Тип записи</li>
                <li>Логин</li>
                <li v-if="showPasswordHead">Пароль</li>
                <li class="actions-head"></li>
            </ul>
            <AccountRow v-for="row in list" :key="row.id" :row="row" />
        </div>
    </section>

</template>

<style scoped lang="scss">
.accounts {
    padding: 16px;
    border: 1px solid #cfd8dc;
    border-radius: 8px;
    background: #fafafa;
}

.header {
    display: flex;
    align-items: center;
    gap: 12px;
}

.title {
    margin: 0;
    font-size: 20px;
}

.add {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    border: 1px solid #cfd8dc;
    background: #fff;
    cursor: pointer;
    transition: border-color .3s ease;

    &:hover {
        border-color: #78909c;
    }
}

.legend {
    margin: 12px 0 4px 0;
    color: #78909c;
    font-size: 12px;
}

.empty {
    color: #78909c;
    font-size: 14px;
}

.table {
    margin-top: 8px;
    ul, li {
        padding: 0;
        margin: 0;
        list-style: none;
    }
}

.head {
    display: grid;
    grid-template-columns: 1.4fr 0.9fr 1.1fr 1.1fr 0.2fr;
    gap: 8px;
    padding: 6px 0;
    color: #607d8b;
    font-size: 12px;
}

.head.no-password {
    grid-template-columns: 1.4fr 0.9fr 2.2fr 0.2fr;
}
</style>


