import { collection, query, getDocs, addDoc, QuerySnapshot, type DocumentData, deleteDoc, doc, updateDoc, where } from "firebase/firestore";
import { db } from "./dbconfig.js";

const qc = query(collection(db, "coxswains"));
const qsc = await getDocs(qc);
export let coxswains = fetchData(qsc, "coxswains");

const qevtname = query(collection(db, "evtname"));
const qsevtname = await getDocs(qevtname);
export let evtnames = fetchData(qsevtname, "evtname");

const qevtnum = query(collection(db, "evtnum"));
const qsevtnum = await getDocs(qevtnum);
export let evtnums = fetchData(qsevtnum, "evtnum");

const qr = query(collection(db, "rowers"));
export const qsr = await getDocs(qr);
export let rowers = fetchData(qsr, "rowers");


const qs = query(collection(db, "shells"));
const qss = await getDocs(qs);
export let shells = fetchData(qss, "shells");

const qo = query(collection(db, "oars"));
const qso = await getDocs(qo);
export let oars = fetchData(qso, "oars");


const ql = query(collection(db, "lineups"));
export const qsl = await getDocs(ql);

  
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
            evtnum: info[1],
            evtname: info[2],
            oar: info[3],
            shell: info[4],
            cox: info[5],
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

