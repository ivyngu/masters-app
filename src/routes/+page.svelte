<script>

	import Thursday from "./user/Thursday.svelte";
	import Friday from "./user/Friday.svelte";
	import Saturday from "./user/Saturday.svelte";
	import Sunday from "./user/Sunday.svelte";
	import Tabs from "../components/Tabs.svelte";
	import UserNavBar from "../components/UserNavBar.svelte";
	
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

<UserNavBar></UserNavBar>
  
<Tabs {items} />
