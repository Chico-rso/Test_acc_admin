import { ref, watch, type Ref } from 'vue';

export const useLocalStorage = <T>(key: string, initial: T): { state: Ref<T> } => {
    const load = (): T => {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) {
                return initial;
            }
            return JSON.parse(raw) as T;
        } catch {
            return initial;
        }
    };

    const state = ref<T>(load()) as Ref<T>;

    watch(
        state,
        (value) => {
            localStorage.setItem(key, JSON.stringify(value));
        },
        { deep: true }
    );

    return { state };
};


