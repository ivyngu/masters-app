<script>
	import Thursday from "./Thursday.svelte";
	import Friday from "./Friday.svelte";
	import Saturday from "./Saturday.svelte";
	import Sunday from "./Sunday.svelte";
	import Tabs from "../../components/Tabs.svelte";
	import { Search, Button } from 'flowbite-svelte'

	let search = "";
	
	let items = [
		{ label: "Thursday",
		value: 1,
		component: Thursday
		},
		{ label: "Friday",
		value: 2,
		component: Friday
		},	
		{ label: "Saturday",
		value: 3,
		component: Saturday
		},
		{ label: "Sunday",
		value: 4,
		component: Sunday
		}
	];
</script>

<form class="flex gap-2">
	<Search size="md" placeholder="Search for a person..." value={search} />
	<Button class="!p-2.5">
	  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
	</Button>
  </form>
  
  
<Tabs {items} />