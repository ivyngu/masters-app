
<script>
  import { coxswains, shells, oars, rowers, evts, submitLineUp } from '../db/dataQuery.js';
  import { Button, Modal, Label, Select } from 'flowbite-svelte'
  import { collection, query, getDocs, where } from "firebase/firestore";
  import { db } from "../db/dbconfig.js";
  
  let days = [
  {value:"Thursday", name: "Thursday"},
  {value:"Friday", name: "Friday"},
  {value:"Saturday", name: "Saturday"},
  {value:"Sunday", name: "Sunday"}
  ]
  
  // day, evtnum, evtname, oar, cox, shell
  let selected = [];
  let selectedTeam = [];
  
  let formModal = false;
  let average = 0;
  let teamLabels = [];
  let teamSize = 0;
  let evtname = "";
  
  // SUBMITTING TO FIREBASE
  function handleClick() {
    let info = Array(6);
    info[0] = selected[0].name;
    info[1] = selected[1];
    info[2] = selected[1].name;
    info[3] = selected[3].name;
    info[4] = selected[4].name;
    info[5] = selected[5].name;
    info[6] = average;
    submitLineUp(info, setTeam());
    formModal = false;
    resetLineUp()
  }
  
  function setTeam() {
    let team = [];
    for (let i = 0; i < selectedTeam.length; i++) {
      team[i] = selectedTeam[i].name;
    }
    return team;
  }
  
  function resetLineUp() {
    selected = [];
    selectedTeam = [];
  }
  
  // ADDING ROWER SLOTS DEPENDING ON SHELL SIZE
  async function readShellSize(name) {
    const qShellSize = query(collection(db, "shells"), where("name", "==", name));
    const qsShellSize = await getDocs(qShellSize);
    qsShellSize.forEach((doc) => {
      teamSize = doc.data().size;
    });
    addTeamInput();
  }
  
  function addTeamInput() {
    teamLabels = [];
    selectedTeam = [];
    for (let i = 1; i <= teamSize; i++) {
      teamLabels = teamLabels.concat({label: "Rower " + i, select: rowers});
    }
  }
  
  // TEAM AVERAGE WEIGHT DISPLAY
  function calculateAvgWt() {
    let numPPL = 0;
    let sum = 0;
    for (let i = 0; i < selectedTeam.length; i++) {
      if (selectedTeam[i] != "") {
        numPPL += 1;
        sum += parseInt(selectedTeam[i].weight);
      }
    }
    average = (sum / numPPL);
  }

  function getEvtName() {
    evtname = selected[1].name;
  }
  
</script>

<Button on:click={() => formModal = true}>Add a Lineup</Button>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
  <form class="flex flex-col space-y-6" action="#">
    
    <Label class="space-y-2">
      <span>Day</span>
      <Select bind:value={selected[0]} placeholder="Choose">
        {#each days as day}
        <option value={day}>
          {day.name}
        </option>
        {/each}
      </Select>
    </Label>
    
    <Label class="space-y-2">
      <span>Event Number</span>
      <Select bind:value={selected[1]} on:change={getEvtName} placeholder="Choose">
        {#each evts as evt}
        <option value={evt}>
          {evt.num}
        </option>
        {/each}
      </Select>
     
    </Label>
    <Label>
      <span> Event Name: {evtname}</span>
    </Label>
    <Label class="space-y-2">
      <span>Coxswain</span>
      <Select bind:value={selected[3]} placeholder="Choose">
        {#each coxswains as cox}
        <option value={cox}>
          {cox.name}
        </option>
        {/each}
      </Select>
    </Label>
    
    <Label class="space-y-2">
      <span>Oar</span>
      <Select bind:value={selected[4]} placeholder="Choose">
        {#each oars as oar}
        <option value={oar}>
          {oar.name}
        </option>
        {/each}
      </Select>
    </Label>
    
    <Label class="space-y-2">
      <span>Shell</span>
      <Select bind:value={selected[5]} on:change={() => readShellSize(selected[5].name)} placeholder="Choose">
        {#each shells as shell}
        <option value={shell}>
          {shell.name}
        </option>
        {/each}
      </Select>
    </Label>
    
    {#each teamLabels as teamLabel, i}
    <Label class="space-y-2">{teamLabel.label}
      <Select bind:value={selectedTeam[i]} on:change={calculateAvgWt} placeholder="Choose">
        {#each rowers as rower}
        <option value={rower}>
          {rower.name}
        </option>
        {/each}
      </Select>
    </Label>
    {/each}
    
    <span>Average Weight: {average}</span>
  </form>
  
  <Button type="submit" class="w-full1" on:click={handleClick}>Submit</Button>
</Modal>