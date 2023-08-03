<script>

	import NavBar from "../../components/UserNavBar.svelte";
    import EventInfoCard from "../../components/EventInfoCard.svelte";
    import value from '../../components/UserNavBar.svelte'
    import { findPerson } from "../../db/dataQuery";

</script>
{#each query as q}
<EventInfoCard bind:evt={q} ></EventInfoCard>
{/each}