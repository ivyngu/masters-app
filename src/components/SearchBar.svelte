<script>
    import { findPerson } from "../db/dataQuery";
	import { goto } from '$app/navigation';
    import { Button, Input } from 'flowbite-svelte'

    
    let query;
    
    let value = '';
    async function handleClick() {
        query = [];
        query = await findPerson(value);
        console.log(query)
        goto("/user")
    }
</script>
<form class="flex gap-2">
    <Input id="search-navbar" placeholder="Search for a person..." bind:value/>
    <Button class="!p-2.5" on:click={() => handleClick()}>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
    </Button>
</form>