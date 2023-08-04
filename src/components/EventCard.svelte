<!-- User: Cards for viewing events -->

<script>
    import { Card } from "flowbite-svelte";
    export let evt;
    
</script>

<Card>
    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
        evt: {evt.name} {evt.num} {evt.time}
    </p>
    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
        Shell: {evt.shell}
    </p>
    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
        Oars: {evt.oar}
    </p>
    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
        Cox: {evt.cox}
    </p>
    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
        Team: {evt.team}
    </p>
    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
        Average Weight: {evt.average}
    </p>
    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
        Lane: {evt.lane}
    </p>
</Card>  
