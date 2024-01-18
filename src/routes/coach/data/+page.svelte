 <script>
	import { Tabs, TabItem } from 'flowbite-svelte';
	import { coxswains, rowers, shells, oars } from '../../../db/dataQuery.js';
	import AddItemModal from '../../../components/coach/AddItemModal.svelte';
	import TableView from '../../../components/coach/TableView.svelte';
	import CoachNavBar from '../../../components/coach/CoachNavBar.svelte';
	import AddPersonModal from '../../../components/coach/AddPersonModal.svelte';
	import EventTable from '../../../components/EventTable.svelte';

	let rowerModal = false;
	let rowerInfo = ["", "", ""];
	let rowerItems = rowers;
	let rowerCategory = "rowers";
	let rowerAddLabel = "Add Rower";
	let rowerLabels = ["Name", "Age", "Weight"];

	let coxModal = false;
	let coxInfo = ["", "", ""];
	let coxItems = coxswains;
	let coxCategory = "coxswains";
	let coxAddLabel = "Add Coxswain";
	let coxLabels = ["Name", "Age", "Weight"];
	
	let oarModal = false;
	let oarInfo = ["", "", ""];
	let oarItems = oars;
	let oarCategory = "oars";
	let oarAddLabel = "Add Oar";
	let oarLabels = ["Name", "Style", "Type"];
		
	let shellModal = false;
	let shellInfo = ["", "", ""];
	let shellItems = shells;
	let shellCategory = "shells";
	let shellAddLabel = "Add Shell";
	let shellLabels = ["Name", "Size", "Type"];
	
	
</script>
<CoachNavBar></CoachNavBar>

<Tabs style="underline">
	<TabItem title="Events">
		<EventTable></EventTable>
	</TabItem>
	<TabItem title="Rowers">
		<AddPersonModal bind:formModal={rowerModal} bind:category={rowerCategory} bind:addLabel={rowerAddLabel}  bind:labels={rowerLabels} bind:info={rowerInfo}/>
		<TableView bind:category={rowerCategory} bind:labels={rowerLabels} bind:items={rowerItems}/>  
	</TabItem>
	<TabItem open title="Coxswains">
		<AddPersonModal bind:formModal={coxModal} bind:category={coxCategory} bind:addLabel={coxAddLabel}  bind:labels={coxLabels} bind:info={coxInfo}/>
		<TableView bind:category={coxCategory} bind:labels={coxLabels} bind:items={coxItems}/>    
	</TabItem>
	<TabItem title="Oars">
		<AddItemModal bind:formModal={oarModal} bind:category={oarCategory} bind:addLabel={oarAddLabel}  bind:labels={oarLabels} bind:info={oarInfo}/>
		<TableView bind:category={oarCategory} bind:labels={oarLabels} bind:items={oarItems}/>  
	</TabItem>
	<TabItem title="Shells">
		<AddItemModal bind:formModal={shellModal} bind:category={shellCategory} bind:addLabel={shellAddLabel}  bind:labels={shellLabels} bind:info={shellInfo}/>
		<TableView bind:category={shellCategory} bind:labels={shellLabels} bind:items={shellItems}/>
	</TabItem>
</Tabs>