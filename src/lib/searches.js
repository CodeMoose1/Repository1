import { browser } from "$app/environment";
import { writable } from "svelte/store";

const searches = browser ? window?.localStorage.getItem('searches') ?? "" : ""

export const search_store = writable(searches)

if (browser) {
        /* https://svelte.dev/tutorial/auto-subscriptions */
        search_store.subscribe((value) => {
                window?.localStorage.setItem('searches', value);
        })
}