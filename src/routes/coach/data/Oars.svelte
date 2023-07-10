<script>
    import { fetchData, oars, submit} from '../../db/dataQuery.js';
    import { Button, Modal, Label, Input } from 'flowbite-svelte';
    import { Table, TableHead, TableHeadCell, TableBodyCell } from 'flowbite-svelte';
    import ListItem from '../../../components/ListItem.svelte';

    let info = ["oars", "", ""];
    let formModal = false;
    let items = oars;

    function handleClick() {
        submit(info)
        formModal = false;
    }    
</script>

<Button on:click={() => formModal = true}>Add an Oar</Button>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-6" action="#">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add an Oar</h3>
        <Label class="space-y-2">
            <span>Name</span>
            <Input type="text" id="name" name="name" bind:value={info[1]} required />
        </Label>
        <Label class="space-y-2">
            <span>Style</span>
            <Input type="text" id="age" name="age" bind:value={info[2]} required />
        </Label>
        <Button type="submit" class="w-full1" on:click={handleClick}>Submit</Button>
    </form>
</Modal>

<Table hoverable={true}>
    <TableHead>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Style</TableHeadCell>
        <TableHeadCell>
            <span class="sr-only"> Edit </span>
        </TableHeadCell>
        <TableHeadCell>
            <span class="sr-only"> Delete </span>
        </TableHeadCell>
    </TableHead>
    {#each items as item}
        <ListItem {item}  />     
{/each}
</Table>

