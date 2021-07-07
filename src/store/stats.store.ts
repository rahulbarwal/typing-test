import { writable } from 'svelte/store';

export const lastTryChars = writable(0);
export const lastTryWords = writable(0);
export const lastTryWPM = writable(0);