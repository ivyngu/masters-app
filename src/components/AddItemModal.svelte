<!-- Coach Admin: Component for adding item data (i.e. shells, oars) -->
<script>
  import { submit} from '../db/dataQuery.js';
  import { Button, Modal, Label, Input, Select} from 'flowbite-svelte';
  
  export let formModal;
  export let category;
  export let addLabel;
  export let labels;
  export let info;
  
  let sizes = [1, 2, 4, 8]
  
  let styles = ["Scull", "Sweep"]
  
  let types = ["x/-", "+", "x"]
  
  function handleClick() {
    submit(category, info)
    formModal = false;
  }    
</script>

<Button on:click={() => formModal = true}>{addLabel}</Button>
<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
  <form class="flex flex-col space-y-6" action="#">        
    <Label class="space-y-2">
      <span>{labels[0]}</span>
      <Input type="text" bind:value={info[0]} required />
    </Label>
    <Label class="space-y-2">
      <span>{labels[1]}</span>
      {#if category == "shells"}
      <Select bind:value={info[1]} placeholder="Choose">
        {#each sizes as size}
        <option value={size}>
          {size}
        </option>
        {/each}
      </Select>
      <Label class="space-y-2">
        <span>{labels[2]}</span>
        <Select bind:value={info[2]} placeholder="Choose">
          {#each types as type}
          <option value={type}>
            {type}
          </option>
          {/each}
        </Select>            
      </Label>
      {:else}
      <Select bind:value={info[1]} placeholder="Choose">
        {#each styles as style}
        <option value={style}>
          {style}
        </option>
        {/each}
      </Select>
      {/if}        
    </Label>
    <Button type="submit" class="w-full1" on:click={handleClick}>Submit</Button>
  </form>
</Modal>