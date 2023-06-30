<script>
  import { query, collection, where, getDocs } from 'firebase/firestore';
  import { fetchData, qsc, qss, qso, qsr, submit } from '../../db/dataQuery.js';
  import { db } from '../../db/dbconfig.js';
  import { Button, Modal, Label, Select } from 'flowbite-svelte'
  let formModal = false;
  let days = [
  {value:"Thursday", name: "Thursday"},
  {value:"Friday", name: "Friday"},
  {value:"Saturday", name: "Saturday"},
  {value:"Sunday", name: "Sunday"}
  ]
  // day, evtnum, evtname, shell, oar, cox
  let team = [];
  let evtnums = []; // have to parse thru this later & assign
  let evtname = []; // have to parse thru this later & assign
  
  let selectedDay;
  let selectedEvtNum;
  let selectedEvtName;
  let selectedOar;
  let selectedCox;
  let selectedShell;
  
  let teamSize;
  
  let shells = fetchData(qss);
  let oars = fetchData(qso);
  let coxs = fetchData(qsc);
  let rowers = fetchData(qsr);
  
  function handleClick() {
    let info = Array(7);
    info[0] = "lineups"
    info[1] = selectedDay;
    info[2] = selectedEvtNum;
    info[3] = selectedEvtName;
    info[4] = selectedOar.name;
    info[5] = selectedShell;
    info[6] = selectedCox;
    console.log(info);
    submit(info)
    formModal = false;
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
    for (let i = 1; i <= teamSize; i++) {
      teamLabels = teamLabels.concat({label: "Rower " + i, bind:team[i], select: rowers});
    }
  }

  let teamLabels = [];

  let questions = [
  {label: "day", bind: selectedDay, select: days},
  {label: "event number", bind: selectedEvtNum, select: evtnums},
  {label: "event name", bind: selectedEvtName, select: evtname},
  {label: "coxswain", bind: selectedCox, select: coxs},
  {label: "oars", bind: selectedOar, select: oars}
  ]
    
</script>

<Button on:click={() => formModal = true}>Add a Lineup</Button>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
  <form class="flex flex-col space-y-6" action="#">

  {#each questions as question}
    <Label class="space-y-2">{question.label}
      <Select class="mt-2" placeholder="Choose" items={question.select} bind:value={question.bind} required />
    </Label>
  {/each}
  
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
  
  {#each teamLabels as teamLabel}
    <Label class="space-y-2">{teamLabel.label}
      <Select class="mt-2" placeholder="Choose" items={teamLabel.select.name} bind:value={teamLabel.bind} required />
    </Label>
  {/each}
</form>

  <Button type="submit" class="w-full1" on:click={handleClick}>Submit</Button>
</Modal>

