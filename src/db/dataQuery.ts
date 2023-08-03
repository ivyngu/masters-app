import { collection, or, query, getDocs, addDoc, QuerySnapshot, type DocumentData, deleteDoc, doc, updateDoc, where } from "firebase/firestore";
import { db } from "./dbconfig.js";

const qc = query(collection(db, "coxswains"));
const qsc = await getDocs(qc);
export let coxswains = fetchData(qsc, "coxswains");

const qevt = query(collection(db, "events"));
const qsevt = await getDocs(qevt);
export let evts = fetchData(qsevt, "events");

const qr = query(collection(db, "rowers"));
export const qsr = await getDocs(qr);
export let rowers = fetchData(qsr, "rowers");

const qs = query(collection(db, "shells"));
const qss = await getDocs(qs);
export let shells = fetchData(qss, "shells");

const qo = query(collection(db, "oars"));
const qso = await getDocs(qo);
export let oars = fetchData(qso, "oars");

const qt = query(collection(db, 'lineups'), where('day', '==', 'Thu'));
const qst = await getDocs(qt);
export let Thursday = fetchData(qst, "lineups");

const qf = query(collection(db, "lineups"), where("day", "==", "Fri"));
const qsf = await getDocs(qf);

export let Friday = fetchData(qsf, "lineups");

const qsa = query(collection(db, "lineups"), where("day", "==", "Saturday"));
const qssa = await getDocs(qsa);
export let Saturday = fetchData(qssa, "lineups");

const qsu = query(collection(db, 'lineups'), where('day', '==', 'Sun'));
const qssu = await getDocs(qsu);
export let Sunday = fetchData(qssu, "lineups");

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
    : (category == "oars") ? {name: info[0], style: info[1]} 
    : {name: info[0], size: info[1]};
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

