<script>
    import { collection, addDoc } from "firebase/firestore";
    import { db } from '../../db/dbconfig.js';
    import { qsc } from './dataQuery.js';
    import SvelteTable from 'svelte-table';
    import { Modal, Content, Trigger } from "sv-popup"
    import { fail } from '@sveltejs/kit';
    let error = false;
    let errorMsg = "";
    let closeModal = false;
    // make class for blank - component
    
    let name = "";
    let age = "";
    let weight = "";
    
    async function submit() {
        if (coxData.includes(name)) {
            error = true;
            errorMsg = "User has to be unique";
            return;
        }
        try {
            
            const docRef = await addDoc(collection(db, "coxswains"), {
                name: name,
                age: age,
                weight: weight,
            });
            console.log("Document written with ID: ", docRef.id);
            alert('Submitted successfully');
            closeModal = true;
        } catch (e) {
            console.log("nope");
        }
    }
    
    let coxData = [];
    qsc.forEach((doc) => {
        coxData.push(doc.data());
    });
    const rows = coxData;
    
    const columns = [
    {
        key: "name",
        title: "Name",
        value: v => v.name,
        sortable: true,
    },
    {
        key: "age",
        title: "Age",
        value: v => v.age,
        sortable: true,
    },
    {
        key: "weight",
        title: "Weight",
        value: v => v.weight,
        sortable: true,
    }
    ];
    
</script>

{#if error}
	<p class="error">{errorMsg}</p>
{/if}

<Modal basic close={closeModal}>
    <Content>
        <form id="form">
            <label>Name: 
                <input type="text" id="name" name="name" bind:value={name} placeholder="" required/>
            </label>
            <br><br>
            <label>Age: 
                <input type="text" id="age" name="age" bind:value={age} required/>
            </label>
            <br><br>
            <label>Weight: 
                <input type="text" id="weight" name="weight" bind:value={weight} required/>
            </label>
            <br><br>
            <button on:click={submit}>Submit</button><br><br>
        </form>    
    </Content>
    <Trigger>
        <button class="btn">Add a Coxswain</button>
    </Trigger>
</Modal>

<SvelteTable columns="{columns}" rows="{rows}"></SvelteTable>
