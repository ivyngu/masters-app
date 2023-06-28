<script>
    import { fetchData, qsr, submit } from '../../db/dataQuery.js';
    import { Button, Modal, Label, Input } from 'flowbite-svelte'
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    
    let formModal = false;
    let info = ["rowers", "", "", ""];
    let items = fetchData(qsr);

    function handleClick() {
        submit(info)
        formModal = false;
    }    
    
</script>


<Button on:click={() => formModal = true}>Add a Rower</Button>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-6" action="#">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add a Rower</h3>
        <Label class="space-y-2">
            <span>Name</span>
            <Input type="text" id="name" name="name" bind:value={info[1]} required />
        </Label>
        <Label class="space-y-2">
            <span>Age</span>
            <Input type="text" id="age" name="age" bind:value={info[2]} required />
        </Label>
        <Label class="space-y-2">
            <span>Weight</span>
            <Input type="text" id="weight" name="weight" bind:value={info[3]} required />
        </Label>
        <Button type="submit" class="w-full1" on:click={handleClick}>Submit</Button>
    </form>
</Modal>

<Table hoverable={true}>
    <TableHead>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Age</TableHeadCell>
        <TableHeadCell>Weight</TableHeadCell>
        <TableHeadCell>
            <span class="sr-only"> Edit </span>
        </TableHeadCell>
    </TableHead>
    <TableBody class="divide-y">
        {#each items as item}
        <TableBodyRow>
            <TableBodyCell>{item.name}</TableBodyCell>
            <TableBodyCell>{item.age}</TableBodyCell>
            <TableBodyCell>{item.weight}</TableBodyCell>
        </TableBodyRow>
        {/each}
    </TableBody>
</Table>








