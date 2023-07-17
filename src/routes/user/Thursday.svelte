<script>
import { Thursday } from '../../db/dataQuery.js'
import { Card } from "flowbite-svelte";

</script>

{#each Thursday as t}
<Card>
    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
      Event: {t.evtnum} {t.evtname}
    </p>
      <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
        Shell: {t.shell}
      </p>
      <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
        Oars: {t.oar}
      </p>
      <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
        Cox: {t.cox}
      </p>
      <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
        Team: {t.team}
      </p>
      <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
        Average Weight: {t.average}
      </p>
  </Card>  
  {/each}