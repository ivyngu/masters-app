import { coxswains, shells, oars, rowers, evtnames, evtnums, submitLineUp } from '../../db/dataQuery.js';
import { collection, query, getDocs, addDoc, QuerySnapshot, type DocumentData, deleteDoc, doc, updateDoc, where } from "firebase/firestore";


export let days = [
  {value:"Thursday", name: "Thursday"},
  {value:"Friday", name: "Friday"},
  {value:"Saturday", name: "Saturday"},
  {value:"Sunday", name: "Sunday"}
  ]

  // day, evtnum, evtname, oar, cox, shell
  export let selected;

  export let teamSize;

  // select rowers in lineup
  export let selectedTeam = [];

  export let averageWeight;

  export function resetLineUp() {
    selected = null;
    selectedTeam = [];
  }

  export function setTeam() {
    let team = [];
    for (let i = 0; i < selectedTeam.length; i++) {
      team[i] = selectedTeam[i];
    }
    return team;
  }

 export async function readShellSize(name) {
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

  export function calculateAvgWt() {
    let numPPL = 0;
    let sum = 0;
    for (let i = 0; i < selectedTeam.length; i++) {
      if (selectedTeam[i] != "") {
        numPPL += 1;
        sum += parseInt(selectedTeam[i].weight);
      }
    }
    averageWeight = (sum / numPPL);
  }
  
  