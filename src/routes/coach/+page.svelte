<script>
    import { Input, Label, Helper, Button } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    
    let value = '';
    let msg = '';
    
    function handleClick() {
        if (value === "Rowing!") {
            goto('/coach/lineup')
        } else {
            msg = "Wrong password. Please try again."
        }
    }
</script>

<Label class="space-y-2">
    <span>Please enter password for access:</span>
    <Input type="text" placeholder="Password" size="md" bind:value/>
    <Helper class="mt-2" color="red"><span class="font-medium">{msg}</span></Helper>
    <Button on:click={handleClick}>Submit</Button>
</Label>
