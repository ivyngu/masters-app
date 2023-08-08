<!-- Coach Admin: Tableview of event data -->

<script>
    import { Table, TableHead, TableHeadCell, TableBodyRow, TableBody, TableBodyCell } from 'flowbite-svelte';
    import { evts } from '../db/dataQuery.js';
    import { writable } from 'svelte/store';
    
    const sortKey = writable('day'); // default sort key
    const sortDirection = writable(1); // default sort direction (ascending)
    const sortItems = writable(evts.slice()); // make a copy of the items array
    
    // Define a function to sort the items
    const sortTable = (key) => {
        // If the same key is clicked, reverse the sort direction
        if ($sortKey === key) {
            sortDirection.update(val => -val);
        } else {
            sortKey.set(key);
            sortDirection.set(1);
        }
    };
    
    $: {
        const key = $sortKey;
        const direction = $sortDirection;
        const sorted = [...$sortItems].sort((a, b) => {
            const aVal = a[key];
            const bVal = b[key];
            if (aVal < bVal) {
                return -direction;
            } else if (aVal > bVal) {
                return direction;
            }
            return 0;
        });
        sortItems.set(sorted);
    }
</script>

<Table hoverable={true}>
    <TableHead>
        <TableHeadCell on:click={() => sortTable('day')}>
            <span>Day</span>
        </TableHeadCell>
        <TableHeadCell on:click={() => sortTable('num')}>
            <span>Num</span>
        </TableHeadCell>
        <TableHeadCell on:click={() => sortTable('name')}>
            <span>Name</span>
        </TableHeadCell>
        <TableHeadCell on:click={() => sortTable('time')}>
            <span>Time</span>
        </TableHeadCell>
        <TableHeadCell on:click={() => sortTable('lane')}>
            <span>Lane</span>
        </TableHeadCell>
    </TableHead>
    <TableBody class="divide-y">
        {#each $sortItems as evt}
        <TableBodyRow>
            <TableBodyCell>{evt.day}</TableBodyCell>
            <TableBodyCell>{evt.num}</TableBodyCell>
            <TableBodyCell>{evt.name}</TableBodyCell>
            <TableBodyCell>{evt.time}</TableBodyCell>
            <TableBodyCell>{evt.lane}</TableBodyCell>
        </TableBodyRow>
        {/each}
    </TableBody>
</Table>