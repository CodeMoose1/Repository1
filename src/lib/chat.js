import { browser } from "$app/environment";
import { writable } from "svelte/store";

const chat = browser ? window?.localStorage.getItem('chat') ?? "" : ""

export const chat_store = writable(chat)

if (browser) {
        /* https://svelte.dev/tutorial/auto-subscriptions */
        chat_store.subscribe((value) => {
                window?.localStorage.setItem('chat', value);
        })
}