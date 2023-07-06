<script>
    import { TableBody, TableBodyCell, TableBodyRow, Input, Label } from 'flowbite-svelte';
    import { deleteItem, saveItem } from '../routes/db/dataQuery.js';
	import InPlaceEdit from '/src/components/InPlaceEdit.svelte';
    let editing = false;
    export let item;
    
    function onCancel() {
        editing = false                       // and exit editing mode
    }
    
    function onSave(updatedItem) {
        item = {... updatedItem }    // applies modifications to todo
        saveItem(updatedItem.db, updatedItem.id, item)
        editing = false                       // and exit editing mode
    }
    
</script>

{#if editing}

        <TableBodyCell>
            <InPlaceEdit bind:value={item.name}/>	
        </TableBodyCell>
        <TableBodyCell>
            <InPlaceEdit bind:value={item.style}/>	
        </TableBodyCell>
            <TableBodyCell>
                <button class="font-medium text-primary-600 hover:underline dark:text-primary-500" on:click={() => onSave(item)}>
                    Save
                </button>
            </TableBodyCell>
            <TableBodyCell>
                <button class="font-medium text-primary-600 hover:underline dark:text-primary-500" on:click={onCancel}>
                    Cancel
                </button>
            </TableBodyCell>
       
    
    {:else}
    <TableBodyCell>{item.name}</TableBodyCell>
            <TableBodyCell>{item.style}</TableBodyCell>
            <TableBodyCell>
                <button class="font-medium text-primary-600 hover:underline dark:text-primary-500" on:click={() => editing = true}>
                    Edit
                </button>
            </TableBodyCell>
            <TableBodyCell>
                <button class="font-medium text-primary-600 hover:underline dark:text-primary-500" on:click={() => deleteItem(item.db, item.id)}>
                    Delete
                </button>
            </TableBodyCell>
    {/if}
    