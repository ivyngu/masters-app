import { collection, query, getDocs, addDoc, QuerySnapshot, type DocumentData, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "./dbconfig.js";

const qc = query(collection(db, "coxswains"));
export const qsc = await getDocs(qc);

const qename = query(collection(db, "evtname"));
export const qsename = await getDocs(qename);

const qenum = query(collection(db, "evtnum"));
export const qsenum = await getDocs(qenum);

const qr = query(collection(db, "rowers"));
export const qsr = await getDocs(qr);

const qs = query(collection(db, "shells"));
export const qss = await getDocs(qs);

const qo = query(collection(db, "oars"));
export const qso = await getDocs(qo);

const ql = query(collection(db, "lineups"));
export const qsl = await getDocs(ql);

export function fetchData(database: QuerySnapshot<DocumentData>) {
    let data: any[] = [];
    database.forEach((doc) => {
        data.push(doc.data());
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

function setInfo(info: string[]) {
    return (info.length == 4) ? {name: info[1], age: info[2],weight: info[3]} 
    : (info.length == 3 && info[0] == "oars") ? {name: info[1], style: info[2]} 
    : {name: info[1], size: info[2]};
}

function resetInfo(info: string[]) {
    for (let i = 1; i < info.length; i++) {
        info[i] = "";
    }
    return info;
}

export async function submit(info: string[]) {
    try {
        const docRef = await addDoc(collection(db, info[0]), setInfo(info));
        console.log("Document written with ID: ", docRef.id);
        info = resetInfo(info);
    } catch (e) {
        console.log("nope");
    }
}

export async function deleteItem(info: string[]) {
    deleteDoc(doc(db, info[0], info[1]));
}