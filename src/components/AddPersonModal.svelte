<!-- Coach Admin: Component for adding person data (i.e. cox, rowers) -->
<script>
    import { submit} from '../db/dataQuery.js';
    import { Button, Modal, Label, Input } from 'flowbite-svelte';
    
    export let formModal;
    export let category;
    export let addLabel;
    export let labels;
    export let info;
    
    function handleClick() {
        submit(category, info)
        formModal = false;
    }    
</script>

<Button on:click={() => formModal = true}>{addLabel}</Button>
<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-6" action="#">        
        {#each labels as label, i}
        <Label class="space-y-2">
            <span>{label}</span>
            <Input type="text" bind:value={info[i]} required />
        </Label>
        {/each}
        <Button type="submit" class="w-full1" on:click={handleClick}>Submit</Button>
    </form>
</Modal>