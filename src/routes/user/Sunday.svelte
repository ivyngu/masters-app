<script>
    import { Sunday } from '../../db/dataQuery.js'
    import EventInfoCard from '../../components/EventInfoCard.svelte';
  
  </script>
  
  {#each Sunday as t}
  <EventInfoCard bind:event={t} ></EventInfoCard>
  {/each}