<script>
    import { Label, Select } from 'flowbite-svelte'

    export let items = [];
    export let label = "";
    export let selectedItem;
    export let functionOnSelect;
  
  </script>
<Label class="space-y-2">
    <span>{label}</span>
    <Select bind:value={selectedItem} on:change={functionOnSelect} placeholder="Choose">
      
  {#each items as item}
  <option value={item}>
    {item.name}
  </option>
  {/each}
  </Select>
  </Label>
