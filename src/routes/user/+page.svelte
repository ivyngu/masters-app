<script>
	import Thursday from "./Thursday.svelte";
	import Friday from "./Friday.svelte";
	import Saturday from "./Saturday.svelte";
	import Sunday from "./Sunday.svelte";
	import Tabs from "../../components/Tabs.svelte";
	
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

<Tabs {items} />