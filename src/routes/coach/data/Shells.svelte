<script>
    import { shells } from '../../db/dataQuery.js';
    import AddItemModal from '../../../components/AddItemModal.svelte';
    import TableView from '../../../components/TableView.svelte';

    let formModal = false;
    let info = ["", ""];
    let items = shells;
    let category = "shells";
    let addLabel = "Add Shell";
    let labels = ["Name", "Size"];
    
</script>

<AddItemModal bind:formModal={formModal} bind:category={category} bind:addLabel={addLabel}  bind:labels={labels} bind:info={info}/>
<TableView bind:category={category} bind:labels={labels} bind:items={items}/>