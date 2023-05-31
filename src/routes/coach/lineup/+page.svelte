<script>
    import { collection, addDoc } from "firebase/firestore";
    import { db } from '../../db/dbconfig.js';
    import { Modal, Content, Trigger } from "sv-popup"
    let closeModal = false;
    
    let day = "";
    let numPPL = "";
    let evtnum = "";
    let evtname = "";
    let evthlane = "";
    let evtflane = "";
    let shell = "";
    let oars = "";
    let cox = "";
    let eightSeat = "";
    let sevenSeat = "";
    let sixSeat = "";
    let fiveSeat = "";
    let fourSeat = "";
    let threeSeat = "";
    let twoSeat = "";
    let oneSeat = "";
    
    function hide(div) {
        div.style.display = "none";
    }
    
    function show(div) {
        if (div.style.display === "none") {
            div.style.display = "block";
        }
    } 
    
    function showLineUp() {
        if(numPPL === "1") {
            show(document.getElementById('one'))
            hide(document.getElementById('two'))
            hide(document.getElementById('four'))
            hide(document.getElementById('eight'))
        } else if (numPPL === "2") {
            show(document.getElementById('two'))
            hide(document.getElementById('one'))
            hide(document.getElementById('four'))
            hide(document.getElementById('eight'))
        } else if (numPPL === "4") {
            show(document.getElementById('four'))
            hide(document.getElementById('one'))
            hide(document.getElementById('two'))
            hide(document.getElementById('eight'))
        } else if (numPPL === "8") {
            show(document.getElementById('eight'))
            hide(document.getElementById('one'))
            hide(document.getElementById('two'))
            hide(document.getElementById('four'))
        }
        show(document.getElementById('submit'))
    }
    
    async function submit() {
        try {
            const docRef = await addDoc(collection(db, "lineups"), {
                day: day,
                evtnum: evtnum,
                evtname: evtname,
                evthlane: evthlane,
                evtflane: evtflane,
                shell: shell,
                oars: oars,
                cox: cox,
                eightSeat: eightSeat,
            });
            console.log("Document written with ID: ", docRef.id);
            alert('Submitted successfully');
            closeModal = true;
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        
    }
</script>

<Modal basic close={closeModal}>
    <Content>
        
<form id="form">
    <label>Day: 
        <select name="day" id="day" bind:value={day} required>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
        </select>
    </label>
    <br><br>
    
    <label> Event Number:
         <input type="text" id="evtnum" name="evtnum" bind:value={evtnum}  required/>
        </label>
    <br><br>
    <label> Event Name: 
        <input type="text" id="evtname" name="evtname" bind:value={evtname} required/> 
    </label>
    <br><br>
    <label> Event HLane: 
        <input type="text" id="evthlane" name="evthlane" bind:value={evthlane} required/> 
    </label>
    <br><br>
    <label>Event FLane: 
        <input type="text" id="evtflane" name="evtflane" bind:value={evtflane} required/>
    </label>
    <br><br>
    <label>Shell: 
        <input type="text" id="shell" name="shell" bind:value={shell} required/>
    </label>
    <br><br>
    <label>Oars: 
        <input type="text" id="oars" name="oars" bind:value={oars} required/>
    </label>
    <br><br>
    <label>Coxswain:
        <input type="text" id="cox" name="cox" bind:value={cox} required/> 
    </label>
    <br><br>
    
    <label>Number of People in Boat? 
        <select name="numPPL" id="numPPL" bind:value={numPPL} required>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="8">8</option>
    </select></label><br>
    <button on:click={showLineUp}>Enter</button><br><br>
    
</form>

<div id="one" style="display:none">
    <form>
        <label for="eightSeat">1: </label>
        <input type="text" id="eightSeat" name="eightSeat" placeholder="Name" bind:value={eightSeat}><br><br>
    </form>
</div>

<div id="two" style="display:none">
    <form>
        <label for="eightSeat">8: </label>
        <input type="text" id="eightSeat" name="eightSeat" placeholder="Name" bind:value={eightSeat}><br><br>
        <label for="sevenSeat">7: </label>
        <input type="text" id="sevenSeat" name="sevenSeat" placeholder="Name" bind:value={sevenSeat}><br><br>
    </form>
</div>

<div id="four" style="display:none">
    <form>
        <label for="eightSeat">8: </label>
        <input type="text" id="eightSeat" name="eightSeat" placeholder="Name" bind:value={eightSeat}><br><br>
        <label for="sevenSeat">7: </label>
        <input type="text" id="sevenSeat" name="sevenSeat" placeholder="Name" bind:value={sevenSeat}><br><br>
        <label for="sixSeat">6: </label>
        <input type="text" id="sixSeat" name="sixSeat" placeholder="Name" bind:value={sixSeat}><br><br>
        <label for="fiveSeat">5: </label>
        <input type="text" id="fiveSeat" name="fiveSeat" placeholder="Name" bind:value={fiveSeat}><br><br>
    </form>
</div>

<div id="eight" style="display:none">
    <form>
        <label for="eightSeat">8: </label>
        <input type="text" id="eightSeat" name="eightSeat" placeholder="Name" bind:value={eightSeat}><br><br>
        <label for="sevenSeat">7: </label>
        <input type="text" id="sevenSeat" name="sevenSeat" placeholder="Name" bind:value={sevenSeat}><br><br>
        <label for="sixSeat">6: </label>
        <input type="text" id="sixSeat" name="sixSeat" placeholder="Name" bind:value={sixSeat}><br><br>
        <label for="fiveSeat">5: </label>
        <input type="text" id="fiveSeat" name="fiveSeat" placeholder="Name" bind:value={fiveSeat}><br><br>
        <label for="fourSeat">4: </label>
        <input type="text" id="fourSeat" name="fourSeat" placeholder="Name" bind:value={fourSeat}><br><br>
        <label for="threeSeat">3: </label>
        <input type="text" id="threeSeat" name="threeSeat" placeholder="Name" bind:value={threeSeat}><br><br>
        <label for="twoSeat">2: </label>
        <input type="text" id="twoSeat" name="twoSeat" placeholder="Name" bind:value={twoSeat}><br><br>
        <label for="oneSeat">1: </label>
        <input type="text" id="oneSeat" name="oneSeat" placeholder="Name" bind:value={oneSeat}><br><br>
    </form>
</div>

<div id="submit" style="display:none">
    <button on:click={submit}>Submit</button><br><br>
</div>
    </Content>
    <Trigger>
        <button class="btn">Add a Lineup</button>
    </Trigger>
</Modal>

<style>
    /* Write your CSS here */
</style>
