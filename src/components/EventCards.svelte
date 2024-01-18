<script>
    import EventCard from './EventCard.svelte';
    export let cards;
  </script>

<div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
  {#each cards as c}
  <EventCard bind:evt={c}></EventCard>
  {/each}
</div>