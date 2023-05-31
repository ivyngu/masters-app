<script>
    import { collection, addDoc } from "firebase/firestore";
    import { db } from '../../db/dbconfig.js';
    import SvelteTable from 'svelte-table';
    import { qss } from './dataQuery.js';
    import { Modal, Content, Trigger } from "sv-popup"
    let closeModal = false;
    
    let name = "";
    let style = "";
    async function submit() {
        try {
            const docRef = await addDoc(collection(db, "shells"), {
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
    
    let shellData = [];
    qss.forEach((doc) => {
        shellData.push(doc.data());
    });
    const rows = shellData;
    
    const columns = [
    {
        key: "name",
        title: "Name",
        value: v => v.name,
        sortable: true,
    },
    {
        key: "size",
        title: "Size",
        value: v => v.size,
        sortable: true,
    }
    ];
    
</script>

<Modal basic close={closeModal}>
    <Content>
        <form id="form">
            <label>Shell Name: 
                <input type="text" id="name" name="name" bind:value={name} required/>
            </label>
            <br><br>
            <label>Shell Size: 
                <input type="text" id="size" name="size" bind:value={style} required/>
            </label>
            <br><br>
            <button on:click={submit}>Submit</button><br><br>
        </form>
    </Content>
    <Trigger>
        <button class="btn">Add a Shell</button>
    </Trigger>
</Modal>

<SvelteTable columns="{columns}" rows="{rows}"></SvelteTable>







