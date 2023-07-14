<script>
    import { oars } from '../../../db/dataQuery.js';
    import AddItemModal from '../../../components/AddItemModal.svelte';
	import TableView from '../../../components/TableView.svelte';
    
    let formModal = false;
    let info = ["", ""];
    let items = oars;
    let category = "oars";
    let addLabel = "Add Oar";
    let labels = ["Name", "Style"];

</script>

<AddItemModal bind:formModal={formModal} bind:category={category} bind:addLabel={addLabel}  bind:labels={labels} bind:info={info}/>
<TableView bind:category={category} bind:labels={labels} bind:items={items}/>