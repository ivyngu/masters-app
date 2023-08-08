import { collection, or, query, getDocs, addDoc, QuerySnapshot, type DocumentData, deleteDoc, doc, updateDoc, where } from "firebase/firestore";
import { db } from "./dbconfig.js";


const qsevt = await getDocs(query(collection(db, "events")));
export let evts = fetchData(qsevt, "events");

const qsc = await getDocs(query(collection(db, "coxswains")));
export let coxswains = fetchData(qsc, "coxswains");
const qsr = await getDocs(query(collection(db, "rowers")));
export let rowers = fetchData(qsr, "rowers");

const qss = await getDocs(query(collection(db, "shells")));
export let shells = fetchData(qss, "shells");
// -/x shells
const qs1x = await getDocs(query(collection(db, 'shells'), where('type', '==', 'x'), where('size', '==', '1')));
export let singleShells = fetchData(qs1x, "shells");
const qs2 = await getDocs(query(collection(db, 'shells'), (where('type', '==', 'x/-'), where('size', '==', '2'))));
export let twoShells = fetchData(qs2, "shells");
const qs4 = await getDocs(query(collection(db, 'shells'), (where('type', '==', 'x/-'), where('size', '==', '4'))));
export let fourShells = fetchData(qs4, "shells");
// + shells
const qs4p = await getDocs(query(collection(db, 'shells'), (where('type', '==', '+'), where('size', '==', '4'))));
export let fourPShells = fetchData(qs4p, "shells");
const qs8p = await getDocs(query(collection(db, 'shells'), (where('type', '==', '+'), where('size', '==', '8'))));
export let eightPShells = fetchData(qs8p, "shells");

const qso = await getDocs(query(collection(db, "oars")));
export let oars = fetchData(qso, "oars");
const qox = await getDocs(query(collection(db, 'oars'), where('type', '==', 'x')));
export let xOars = fetchData(qox, "oars");
const qopm = await getDocs(query(collection(db, 'oars'), where('type', '==', '+/-')));
export let pmOars = fetchData(qopm, "oars");

const qst = await getDocs(query(collection(db, 'lineups'), where('day', '==', 'Thu')));
export let Thursday = fetchData(qst, "lineups");
const qsf = await getDocs(query(collection(db, "lineups"), where("day", "==", "Fri")));
export let Friday = fetchData(qsf, "lineups");
const qsa = await getDocs(query(collection(db, "lineups"), where("day", "==", "Saturday")));
export let Saturday = fetchData(qsa, "lineups");
const qsu = await getDocs(query(collection(db, 'lineups'), where('day', '==', 'Sun')));
export let Sunday = fetchData(qsu, "lineups");

export async function findPerson(name: string) {
    const pq = query(collection(db, 'lineups'), or(where('team', 'array-contains', name),
    where('cox', '==', name)
 ));
    const pqs = await getDocs(pq);
    return fetchData(pqs, "lineups");
}

export function fetchData(database: QuerySnapshot<DocumentData>, category: string) {
    let data: any[] = [];
    database.forEach((doc) => {
        let item = { ...doc.data(), id: doc.id, category: category};
        data.push(item);
    });
    return data;
}

export async function submitLineUp(info: Object[], team: Object[]) {
    try {
        const docRef = await addDoc(collection(db, "lineups"), {
            day: info[0],
            evtid: info[1],
            lane: info[2],
            name: info[3],
            num: info[4], 
            time: info[5], 
            shell: info[6],
            oar: info[7],
            cox: info[8],
            average: info[9],
            team: team
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.log(e);
    }
}

function setInfo(category: string, info: string[]) {
    return (category == "coxswains" || category == "rowers") ? {name: info[0], age: info[1],weight: info[2]} 
    : (category == "oars") ? {name: info[0], style: info[1], type: info[2]} 
    : {name: info[0], size: info[1], type: info[2]};
}

function resetInfo(info: string[]) {
    for (let i = 0; i < info.length; i++) {
        info[i] = "";
    }
    return info;
}

export async function submit(category: string, info: string[]) {
    try {
        const docRef = await addDoc(collection(db, category), setInfo(category, info));
        console.log("Document written with ID: ", docRef.id);
        info = resetInfo(info);
    } catch (e) {
        console.log("nope");
    }
}

export async function submitEvent(info: string[]) {
    try {
        const docRef = await addDoc(collection(db, "events"), {
            day: info[0],
            time: info[1],
            num: info[2],
            name: info[3],
            lane: info[4]
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.log(e);
    }
}

export async function deleteItem(category: string, id: string) {
    try {
        await deleteDoc(doc(db, category, id));
        console.log("yay");
    } catch (e) {
        console.log(e);
    }
}

export async function saveItem(category: string, id: string, updated: any) {
    try {
        await updateDoc(doc(db, category, id), updated);
        console.log("yay");
    } catch (e) {
        console.log(e);
    }
}

