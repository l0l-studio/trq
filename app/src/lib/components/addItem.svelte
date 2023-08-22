<script lang="ts">
// @ts-nocheck

import {onMount} from 'svelte'
// @ts-nocheck

    /**
	 * @type {any[]}
	 */


    let items = [];
    let newItem = '';
  
    const addItem = () => {
      if (newItem.trim() !== '') {
        items = [...items, newItem];
        newItem = '';
      }
    };

    const fetchItems = async () => {
    try {
        const response = await fetch('https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=k1voln47iaefm5u78y2ljjmn9vnmug&redirect_uri=http://localhost:5173&scope=user%3Aread%3Aemail');
        const items = await response.json();
        console.log(items);

        // Handle your data here
    } catch (err) {
        console.error(err);
    }
};

    onMount(fetchItems);
  </script>
  
  <div class="p-4">
    <h2 class="text-xl font-semibold mb-2">Current Items</h2>
    <ul>
      {#each items as item, index}
        <li class="mb-1" key={index}>{item}</li>
      {/each}
    </ul>
  
    <div class="mt-4">
      <h2 class="text-xl font-semibold mb-2">Add New Item</h2>
      <input
        class="border rounded p-2 w-full"
        type="text"
        placeholder="Enter new item"
        bind:value={newItem}
      />
      <button class="bg-blue-500 text-white px-4 py-2 rounded mt-2" on:click={addItem}>+</button>
    </div>
  </div>