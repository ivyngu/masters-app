<script>
    import { TableBodyCell, Select } from 'flowbite-svelte';
    import { deleteItem, saveItem } from '../db/dataQuery.js';
    import InPlaceEdit from '/src/components/InPlaceEdit.svelte';
    import saveIcon from "./../images/save.png";
    import deleteIcon from "./../images/delete.png";
    import editIcon from "./../images/edit.png";
    import cancelIcon from "./../images/cancel.png";

    let editing = false;
    export let category;
    export let item;
    
    let attributes;
    if (category == "oars") {
        attributes = [item.name, item.style];
    } else if (category == "shells") {
        attributes = [item.name, item.size];
    }

    let sizes = [1, 2, 4, 8]

    let styles = ["Scull", "Sweep"]
    
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

<TableBodyCell>
    <InPlaceEdit bind:value={attributes[0]}/>	
</TableBodyCell>
<TableBodyCell>
    {#if category == "shells"}
    <Select bind:value={attributes[1]} placeholder="Choose">
        {#each sizes as size}
        <option value={size}>
          {size}
        </option>
        {/each}
      </Select>
      {:else}
      <Select bind:value={attributes[1]} placeholder="Choose">
        {#each styles as style}
        <option value={style}>
          {style}
        </option>
        {/each}
      </Select>
      {/if}
</TableBodyCell>

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
