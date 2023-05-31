<script>
    import { collection, addDoc } from "firebase/firestore";
    import { db } from '../../db/dbconfig.js';
    import SvelteTable from 'svelte-table';
    import { qso } from './dataQuery.js';
    import { Modal, Content, Trigger } from "sv-popup"
    let closeModal = false;
    
    let name = "";
    let style = "";
    async function submit() {
        try {
            const docRef = await addDoc(collection(db, "oars"), {
                name: name,
                style: style,
            });
            console.log("Document written with ID: ", docRef.id);
            alert('Submitted successfully');
            closeModal = true;
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    
    let oarData = [];
    qso.forEach((doc) => {
        oarData.push(doc.data());
    });
    const rows = oarData;
    
    const columns = [
    {
        key: "name",
        title: "Name",
        value: v => v.name,
        sortable: true,
    },
    {
        key: "style",
        title: "Style",
        value: v => v.style,
        sortable: true,
    }
    ];
    
</script>

<Modal basic close={closeModal}>
    <Content>
        <form id="form">
            <label>Name: 
                <input type="text" id="name" name="name" bind:value={name} required/>
            </label>
            <br><br>
            <label>Style: 
                <input type="text" id="style" name="style" bind:value={style} required/>
            </label>
            <br><br>
            <button on:click={submit}>Submit</button><br><br>
        </form>    
    </Content>
    <Trigger>
        <button class="btn">Add an Oar</button>
    </Trigger>
</Modal>

<SvelteTable columns="{columns}" rows="{rows}"></SvelteTable>
