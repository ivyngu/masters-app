import { collection, query, getDocs, addDoc, QuerySnapshot, deleteDoc, doc, updateDoc, where } from "firebase/firestore";
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
const qt = query(collection(db, "lineups"), where("day", "==", "Thursday"));
const qst = await getDocs(qt);
export let Thursday = fetchData(qst, "lineups");
const qf = query(collection(db, "lineups"), where("day", "==", "Friday"));
const qsf = await getDocs(qf);
export let Friday = fetchData(qsf, "lineups");
const qsa = query(collection(db, "lineups"), where("day", "==", "Saturday"));
const qssa = await getDocs(qsa);
export let Saturday = fetchData(qssa, "lineups");
const qsu = query(collection(db, "lineups"), where("day", "==", "Sunday"));
const qssu = await getDocs(qsu);
export let Sunday = fetchData(qssu, "lineups");
export function fetchData(database, category) {
    let data = [];
    database.forEach((doc) => {
        let item = { ...doc.data(), id: doc.id, category: category };
        data.push(item);
    });
    return data;
}
export async function submitLineUp(info, team) {
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
    }
    catch (e) {
        console.log(e);
    }
}
function setInfo(category, info) {
    return (category == "coxswains" || category == "rowers") ? { name: info[0], age: info[1], weight: info[2] }
        : (category == "oars") ? { name: info[0], style: info[1] }
            : { name: info[0], size: info[1] };
}
function resetInfo(info) {
    for (let i = 0; i < info.length; i++) {
        info[i] = "";
    }
    return info;
}
export async function submit(category, info) {
    try {
        const docRef = await addDoc(collection(db, category), setInfo(category, info));
        console.log("Document written with ID: ", docRef.id);
        info = resetInfo(info);
    }
    catch (e) {
        console.log("nope");
    }
}
export async function submitEvent(info) {
    try {
        const docRef = await addDoc(collection(db, "events"), {
            time: info[0],
            num: info[1],
            name: info[2],
            lane: info[3]
        });
        console.log("Document written with ID: ", docRef.id);
    }
    catch (e) {
        console.log(e);
    }
}
export async function deleteItem(category, id) {
    try {
        await deleteDoc(doc(db, category, id));
        console.log("yay");
    }
    catch (e) {
        console.log(e);
    }
}
export async function saveItem(category, id, updated) {
    try {
        await updateDoc(doc(db, category, id), updated);
        console.log("yay");
    }
    catch (e) {
        console.log(e);
    }
}
//# sourceMappingURL=dataQuery.js.map