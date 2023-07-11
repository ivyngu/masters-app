<script>
    import { Table, TableHead, TableHeadCell, TableBodyRow, TableBody } from 'flowbite-svelte';
    import ListItem from './ListItem.svelte';
    
    export let category;
    export let labels;
    export let items;

</script>

<Table hoverable={true}>
    <TableHead>
        <TableHeadCell>{labels[1]}</TableHeadCell>
        <TableHeadCell>{labels[2]}</TableHeadCell>
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
            <ListItem bind:category={category} {item}  />     
        </TableBodyRow>
    {/each}
</TableBody>
</Table>