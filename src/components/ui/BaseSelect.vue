<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

export interface OptionItem<T extends string = string> {
    value: T;
    label: string;
}

const props = defineProps<{
    modelValue: string;
    options: Array<OptionItem>;
    placeholder?: string;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const isOpen = ref(false);
const root = ref<HTMLElement | null>(null);

const toggle = (): void => {
    isOpen.value = !isOpen.value;
};

const close = (): void => {
    isOpen.value = false;
};

const selectValue = (value: string): void => {
    emit('update:modelValue', value);
    close();
};

const onClickOutside = (e: MouseEvent): void => {
    if (!root.value) {
        return;
    }
    if (!root.value.contains(e.target as Node)) {
        close();
    }
};

onMounted(() => {
    window.addEventListener('click', onClickOutside);
});

onBeforeUnmount(() => {
    window.removeEventListener('click', onClickOutside);
});
</script>

<template>
    <div ref="root" class="base-select">
        <button class="select-trigger" type="button" @click="toggle">
            <span>{{ options.find((option) => option.value === modelValue)?.label || (placeholder || 'Выберите') }}</span>
            <svg class="caret" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 10l5 5 5-5z" />
            </svg>
        </button>
        <div v-if="isOpen" class="menu">
            <button
                v-for="opt in options"
                :key="opt.value"
                type="button"
                class="menu-item"
                :class="{ active: opt.value === modelValue }"
                @click="selectValue(opt.value)"
            >
                {{ opt.label }}
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.base-select {
    position: relative;
}

.select-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px;
    border: 1px solid #cfd8dc;
    border-radius: 6px;
    background: #fff;
    cursor: pointer;
}

.caret {
    fill: #607d8b;
}

.menu {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 6px;
    z-index: 1000;
    min-width: 100%;
    background: #fff;
    border: 1px solid #cfd8dc;
    border-radius: 6px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.08);
    overflow: hidden;
}

.menu-item {
    display: block;
    width: 100%;
    text-align: left;
    padding: 8px 10px;
    background: #fff;
    border: 0;
}

.menu-item:hover {
    background: #f5f7f9;
    cursor: pointer;
}

.menu-item.active {
    background: #eef3f6;
    cursor: default;
}
</style>


