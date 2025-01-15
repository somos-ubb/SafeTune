import { writable } from 'svelte/store';

// Initialize the errorStore with null
export const errorStore = writable(null);

// Function to update the errorStore with code and message
export function setError(code, message) {
    errorStore.set({ code, message });
}