<script>
    import { coxswains } from '../../../db/dataQuery.js';
    import AddItemModal from '../../../components/AddItemModal.svelte';
    import TableView from '../../../components/TableView.svelte';

    let formModal = false;
    let info = ["", "", ""];
    let items = coxswains;
    let category = "coxswains";
    let addLabel = "Add Coxswain";
    let labels = ["Name", "Age", "Weight"];

</script>

<AddItemModal bind:formModal={formModal} bind:category={category} bind:addLabel={addLabel}  bind:labels={labels} bind:info={info}/>
<TableView bind:category={category} bind:labels={labels} bind:items={items}/>