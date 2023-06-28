<script>
    import { fetchData, qsc, qss, qso, qsr, submit } from '../../db/dataQuery.js';
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
        let shells = fetchData(qss);
        let oars = fetchData(qso);
        let coxs = fetchData(qsc);
        let rowers = fetchData(qsr);
    
    function hide(div) {
        div.style.display = "none";
    }
    
    function show(div) {
        if (div.style.display === "none") {
            div.style.display = "block";
        }
    } 

    async function submitShell(shell) {
        // read selected shell from database + create inputs
        console.log(shells[shell]);
        return shells[shell];
    }
    
    function handleClick() {
        submit(info)
        formModal = false;
    }

    function addTeamInput(team) {
        var number = submitShell;
        var amount = parseInt(number);
        for (let i = 0; i < (amount); i++) {
            var input = document.createElement("input");
            input.type = "Select";
            document.getElementById(team).appendChild(input);
           
        }
    }

</script>
  
  <Button on:click={() => formModal = true}>Add a Lineup</Button>
  
  <Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-6" action="#">
      <Label>Day
        <Select class="mt-2" items={days} bind:value={info[0]} />
      </Label>
      <Label class="space-y-2">
        <span>Event Number</span>
        <Select class="mt-2" items={evtnums} bind:value={info[1]} required/>
      </Label>
      <Label class="space-y-2">
        <span>Event Name</span>
        <span>{info[2]}</span>
      </Label>
      <Label class="space-y-2">
        <span>Shell</span>
        <Select class="mt-2" items={shells} bind:value={info[3]} onselect={addTeamInput} required/>
      </Label>
      <Label class="space-y-2">
        <span>Oars</span>
        <Select class="mt-2" items={oars} bind:value={info[4]} required/>
      </Label>
      <Label class="space-y-2">
        <span>Coxswain</span>
        <Select class="mt-2" items={coxs} bind:value={info[5]} required/>
      </Label>
      <div id="team"></div>
      <Button type="submit" class="w-full1">Submit</Button>
    </form>
  </Modal>
