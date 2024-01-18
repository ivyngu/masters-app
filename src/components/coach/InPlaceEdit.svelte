<script>
  // component used to combine in place editing with buttons so the enter key saves to db as well
  // has yet to be completed

  import { createEventDispatcher, onMount } from 'svelte'

  export let value, required = true, hitEnter = false

  const dispatch = createEventDispatcher()
  let editing = false, original

  onMount(() => {
    original = value
  })

  function edit() {
    editing = true
  }

  function submit() {
		if (value != original) {
			dispatch('submit', value)
		}
    editing = false
  }

  function keydown(event) {
    if (event.key == 'Escape') {
      event.preventDefault()
      value = original
      editing = false
    } else if (event.key == 'Enter') {
      hitEnter = true;
      submit();
  }
}
	
	function focus(element) {
		element.focus()
	}
</script>

{#if editing}
  <form on:submit|preventDefault={submit} on:keydown={keydown}>
    <input bind:value on:blur={submit} {required} use:focus/>
  </form>
{:else}
  <div on:click={edit}>
    {value}
  </div>
{/if}

<style>
  input {
    border: none;
    background: none;
    font-size: inherit;
    color: inherit;
    font-weight: inherit;
    text-align: inherit;
    box-shadow: none;
  }
</style>
