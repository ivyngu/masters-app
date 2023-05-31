import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./../db/dbconfig.js";

const qt = query(collection(db, "lineups"), where("day", "==", "Thursday"));

export const qst = await getDocs(qt);
qst.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
});

const qf = query(collection(db, "lineups"), where("day", "==", "Friday"));

export const qsf = await getDocs(qf);
qsf.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
});

const qs = query(collection(db, "lineups"), where("day", "==", "Saturday"));

export const qss = await getDocs(qs);
qss.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
});

const qsu = query(collection(db, "lineups"), where("day", "==", "Sunday"));

export const qssu = await getDocs(qsu);
qssu.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
});

