<script>
	import Tabs from "../../../components/Tabs.svelte";
	import Rowers from "./Rowers.svelte";
	import Coxswains from "./Coxswains.svelte";
	import Oars from "./Oars.svelte";
	import Shells from "./Shells.svelte";
	
	let items = [
	{ label: "Rowers",
	value: 1,
	component: Rowers
	},
	{ label: "Coxswains",
	value: 2,
	component: Coxswains
	},
	{ label: "Shells",
	value: 3,
	component: Shells
	},
	{ label: "Oars",
	value: 4,
	component: Oars
	}
	];
</script>

<Tabs {items} />
