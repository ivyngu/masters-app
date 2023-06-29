<script>
	import { getDoc, doc } from 'firebase/firestore';
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
        let info = ["", "", "", "", "", ""];
        let team = [];
        let evtnums = []; // have to parse thru this later & assign
        let evtname = []; // have to parse thru this later & assign

        let shells = fetchData(qss);
        let oars = fetchData(qso);
        let coxs = fetchData(qsc);
        let rowers = fetchData(qsr);

        let selectedCox = "";

    function handleClick() {
        submit(info)
        formModal = false;
    }

    async function readShell() {
      console.log(info[3]);
      const shellSize = await getDoc(doc(db, "shells", info[3]));
     
      console.log(shellSize.data());
    }

    function addTeamInput() {
       questions = questions.concat({label: "rower", bind: team[1], select: rowers});
    }

    function print() {
      console.log(info[5]);
    }

    let questions = [
      {label: "day", bind: info[0], select: days},
      {label: "event number", bind: info[1], select: evtnums},
      {label: "event name", bind: info[2], select: evtname},
      {label: "oars", bind: info[4], select: oars},
      {label: "coxswain", bind: info[5], select: coxs, get value() { return info[5]; },
      set value(val) { info[5] = val; },},
    ]

</script>
  
  <Button on:click={() => formModal = true}>Add a Lineup</Button>
  
  <Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
    {#each questions as question}
  <form class="flex flex-col space-y-6" action="#">
    <Label class="space-y-2">{question.label}
      <Select class="mt-2" items={question.select} bind:value={question.bind} on:change={print} required />
    </Label>
  </form>
  {/each}
  <Label class="space-y-2">
    <span>Shell</span>
    <Select class="mt-2" items={shells} bind:value={info[3]} on:change={print} required/>
  </Label>
  
  <Button type="submit" class="w-full1">Submit</Button>
  </Modal>