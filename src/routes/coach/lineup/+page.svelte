<script>
  import { query, collection, where, getDocs } from 'firebase/firestore';
  import { fetchData, qsc, qss, qso, qsr, qsename, qsenum, submitLineUp } from '../../db/dataQuery.js';
  import { db } from '../../db/dbconfig.js';
  import { Button, Modal, Label, Select, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte'
  let formModal = false;
  let days = [
  {value:"Thursday", name: "Thursday"},
  {value:"Friday", name: "Friday"},
  {value:"Saturday", name: "Saturday"},
  {value:"Sunday", name: "Sunday"}
  ]

  let selectedTeam = [];
  let evtnums = fetchData(qsenum); // have to parse thru this later & assign
  let evtnames = fetchData(qsename); // have to parse thru this later & assign
  
  let selectedDay;
  let selectedEvtNum;
  let selectedEvtName;
  let selectedOar;
  let selectedCox;
  let selectedShell;
  let average;
  
  let teamSize;
  
  let shells = fetchData(qss);
  let oars = fetchData(qso);
  let coxs = fetchData(qsc);
  let rowers = fetchData(qsr);
  
  function resetLineUp() {
  selectedDay = null;
  selectedEvtNum = null;
  selectedEvtName = null;
  selectedOar = null;
  selectedCox = null;
  selectedShell = null;
  selectedTeam = [];
}

  function handleClick() {
    let info = Array(6);
    info[0] = selectedDay.name;
    info[1] = selectedEvtNum.name;
    info[2] = selectedEvtName.name;
    info[3] = selectedOar.name;
    info[4] = selectedShell.name;
    info[5] = selectedCox.name;
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
  
  async function readShell() {
    const shellSize = query(collection(db, "shells"), where("name", "==", selectedShell.name));
    const shellQuery = await getDocs(shellSize);
    shellQuery.forEach((doc) => {
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

  function calculateAvgWt() {
    console.log(selectedTeam)
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

  let teamLabels = [];

</script>

<Button on:click={() => formModal = true}>Add a Lineup</Button>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
  <form class="flex flex-col space-y-6" action="#">
  
  <Label class="space-y-2">
    <span>Day</span>
    <Select bind:value={selectedDay} placeholder="Choose">
      {#each days as day}
      <option value={day}>
        {day.name}
      </option>
      {/each}
    </Select>
  </Label>

  <Label class="space-y-2">
    <span>Event Number</span>
    <Select bind:value={selectedEvtNum} placeholder="Choose">
      {#each evtnums as evtnum}
      <option value={evtnum}>
        {evtnum.name}
      </option>
      {/each}
    </Select>
  </Label>

  <Label class="space-y-2">
    <span>Event Name</span>
    <Select bind:value={selectedEvtName} placeholder="Choose">
      {#each evtnames as evtname}
      <option value={evtname}>
        {evtname.name}
      </option>
      {/each}
    </Select>
  </Label>

  <Label class="space-y-2">
    <span>Coxswain</span>
    <Select bind:value={selectedCox} placeholder="Choose">
      {#each coxs as cox}
      <option value={cox}>
        {cox.name}
      </option>
      {/each}
    </Select>
  </Label>

  <Label class="space-y-2">
    <span>Oar</span>
    <Select bind:value={selectedOar} placeholder="Choose">
      {#each oars as oar}
      <option value={oar}>
        {oar.name}
      </option>
      {/each}
    </Select>
  </Label>

    <Label class="space-y-2">
      <span>Shell</span>
      <Select bind:value={selectedShell} on:change={readShell} placeholder="Choose">
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