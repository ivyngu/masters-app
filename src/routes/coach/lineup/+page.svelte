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
  let info = Array(6);
  let team = [];
  let evtnums = []; // have to parse thru this later & assign
  let evtname = []; // have to parse thru this later & assign

  let selectedShell;
  let teamSize;
  
  var shells = fetchData(qss);
  let oars = fetchData(qso);
  let coxs = fetchData(qsc);
  let rowers = fetchData(qsr);
  
  function handleClick() {
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
    for (let i = 0; i < teamSize; i++) {
      questions = questions.concat({label: "rower", bind:team[i], select: rowers});
    }
  }
  
  let questions = [
  {label: "day", bind: info[0], select: days},
  {label: "event number", bind: info[1], select: evtnums},
  {label: "event name", bind: info[2], select: evtname},
  {label: "oars", bind: info[4], select: oars},
  ]
  
</script>

<Button on:click={() => formModal = true}>Add a Lineup</Button>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
  {#each questions as question}
  <form class="flex flex-col space-y-6" action="#">
    <Label class="space-y-2">{question.label}
      <Select class="mt-2" placeholder="Choose" items={question.select} bind:value={question.bind} required />
    </Label>
  </form>
  {/each}
 
  

  <form>
    <Label class="space-y-2">
      <span>Shell</span>
      <Select bind:value={selectedShell}>
        {#each shells as shell}
          <option value={shell}>
            {shell.name}
          </option>
        {/each}
        </Select>
    </Label>
  </form>

  <form>
    <Label class="space-y-2">
      <span>Coxswain</span>
      <Select bind:value={info[5]} on:change={readShell}>
        {#each coxs as cox}
          <option value={cox}>
            {cox.name}
          </option>
        {/each}
        </Select>
    </Label>
  </form>
  
  <p> selected {selectedShell ? selectedShell.name : 'waiting'}</p>
  <Button type="submit" class="w-full1">Submit</Button>
</Modal>

