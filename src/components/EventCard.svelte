<!-- User: Cards for viewing events -->
<script>
    import { Card, Listgroup } from "flowbite-svelte";
    export let evt;
    
</script>

<Card>
    <div class="flex justify-between items-center">
        <span class="text-3xl font-bold text-gray-900 dark:text-white">{evt.name}</span>
        <span class="text-3xl font-bold text-gray-900 dark:text-white">{evt.num}</span>
    </div>
    <div class="flex flex-col items-center pb-4">
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{evt.time}</h5>
    </div>
    <div class="flex justify-between items-center">
        <div class="flex flex-col items-left pb-4">
            <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
                Shell: {evt.shell}
            </p>
            <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
                Oars: {evt.oar}
            </p>
            <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
                Cox: {evt.cox}
            </p>
        </div>
        <span class="text-6xl font-bold text-gray-900 dark:text-white">{evt.lane}</span>
    </div>

    <Listgroup items={evt.team} let:item class="border-0 dark:!bg-transparent">
        <div class="flex items-center space-x-4 rtl:space-x-reverse">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
              {item.name}
            </p>
          </div>
        </div>
    </Listgroup>
</Card>