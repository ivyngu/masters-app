<script>
    import { Friday } from '../../db/dataQuery.js'
    import EventInfoCard from '../../components/EventInfoCard.svelte';
  
  </script>
  
  {#each Friday as f}
  <EventInfoCard bind:evt={f} ></EventInfoCard>
  {/each}