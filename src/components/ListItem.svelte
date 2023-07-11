<script>
    import { TableBodyCell } from 'flowbite-svelte';
    import { deleteItem, saveItem } from '../routes/db/dataQuery.js';
    import InPlaceEdit from '/src/components/InPlaceEdit.svelte';

    let editing = false;
    export let category;
    export let item;
    
    let attributes;
    if (category == "oars") {
        attributes = [item.name, item.style];
    } else if (category == "shells") {
        attributes = [item.name, item.size];
    } else {
        attributes = [item.name, item.age, item.weight];
    }
    
    function onCancel() {
        editing = false;                   
    }
    
    function onSave(updatedItem) {
        item = {... updatedItem };
        saveItem(updatedItem.db, updatedItem.id, item);
        editing = false;
    }
    
</script>

{#if editing}

{#each attributes as attribute}
<TableBodyCell>
    <InPlaceEdit bind:value={attribute}/>	
</TableBodyCell>
{/each}

<TableBodyCell>
    <button class="font-medium text-primary-600 hover:underline dark:text-primary-500" on:click={() => onSave(item)}>Save</button>
</TableBodyCell>
<TableBodyCell>
    <button class="font-medium text-primary-600 hover:underline dark:text-primary-500" on:click={onCancel}>Cancel</button>
</TableBodyCell>

{:else}
{#each attributes as attribute}
<TableBodyCell>{attribute}</TableBodyCell>
{/each}
<TableBodyCell>
    <button class="font-medium text-primary-600 hover:underline dark:text-primary-500" on:click={() => editing = true}>Edit</button>
</TableBodyCell>
<TableBodyCell>
    <button class="font-medium text-primary-600 hover:underline dark:text-primary-500" on:click={() => deleteItem(item.category, item.id)}>Delete</button>
</TableBodyCell>
{/if}
