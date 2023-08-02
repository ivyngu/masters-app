<script>
    import { Table, TableHead, TableHeadCell, TableBodyRow, TableBody } from 'flowbite-svelte';
    import ListItem from './ListItem.svelte';
    import ListPerson from './ListPerson.svelte';

    export let category;
    export let labels;
    export let items;

    let person = false;
    if (category == "oars" || category == "shells") {
        person = false;
    } else {
        person = true;
    }

</script>

<Table hoverable={true}>
    <TableHead>
        {#each labels as label}
        <TableHeadCell>{label}</TableHeadCell>
        {/each}
        <TableHeadCell>
            <span class="sr-only">Edit</span>
        </TableHeadCell>
        <TableHeadCell>
            <span class="sr-only">Delete</span>
        </TableHeadCell>
    </TableHead>
    <TableBody class="divide-y">
        {#each items as item}
        <TableBodyRow>
            {#if person}
            <ListPerson {item}  />     
            {:else}
            <ListItem {item}  />     
            {/if}
        </TableBodyRow>
    {/each}
</TableBody>
</Table>