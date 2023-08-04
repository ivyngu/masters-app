<script>
    import EventCard from './EventCard.svelte';
    export let cards;
  </script>
{#each cards as c}
<EventCard bind:evt={c}></EventCard>
{/each}