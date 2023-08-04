<!-- Coach Admin: Single component that comprises of cox/rower on tableview. -->

<script>
    import { TableBodyCell } from 'flowbite-svelte';
    import { deleteItem, saveItem } from '../db/dataQuery.js';
    import InPlaceEdit from '/src/components/InPlaceEdit.svelte';
    import saveIcon from "./../images/save.png";
    import deleteIcon from "./../images/delete.png";
    import editIcon from "./../images/edit.png";
    import cancelIcon from "./../images/cancel.png";


    let editing = false;
    export let item;
    
    let attributes = [item.name, item.age, item.weight];
    
    
    function onCancel() {
        editing = false;                   
    }
    
    function onSave(updatedItem) {
        item = {... updatedItem };
        saveItem(updatedItem.category, updatedItem.id, item);
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
    <button class="font-medium text-primary-600 hover:underline dark:text-primary-500" on:click={() => onSave(item)}> <img src={saveIcon} alt="Save"> </button>
</TableBodyCell>
<TableBodyCell>
    <button class="font-medium text-primary-600 hover:underline dark:text-primary-500" on:click={onCancel}><img src={cancelIcon} alt="Cancel"></button>
</TableBodyCell>

{:else}
{#each attributes as attribute}
<TableBodyCell>{attribute}</TableBodyCell>
{/each}
<TableBodyCell>
    <button class="font-medium text-primary-600 hover:underline dark:text-primary-500" on:click={() => editing = true}><img src={editIcon} alt="Edit"></button>
</TableBodyCell>
<TableBodyCell>
    <button class="font-medium text-primary-600 hover:underline dark:text-primary-500" on:click={() => deleteItem(item.category, item.id)}><img src={deleteIcon} alt="Delete"></button>
</TableBodyCell>
{/if}
