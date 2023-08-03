<script>
  import { Thursday } from '../../db/dataQuery.js'
  import EventInfoCard from '../../components/EventInfoCard.svelte';

</script>

{#each Thursday as t}
<EventInfoCard bind:event={t} ></EventInfoCard>
{/each}