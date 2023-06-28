import { collection, query, getDocs, addDoc, QuerySnapshot } from "firebase/firestore";
import { db } from "./dbconfig.js";
const qc = query(collection(db, "coxswains"));
export const qsc = await getDocs(qc);
const qr = query(collection(db, "rowers"));
export const qsr = await getDocs(qr);
const qs = query(collection(db, "shells"));
export const qss = await getDocs(qs);
const qo = query(collection(db, "oars"));
export const qso = await getDocs(qo);
export function fetchData(database) {
    let data = [];
    database.forEach((doc) => {
        data.push(doc.data());
    });
    return data;
}
function setInfo(info) {
    return (info.length == 4) ? { name: info[1], age: info[2], weight: info[3] }
        : (info.length == 3 && info[0] == "oars") ? { name: info[1], style: info[2] }
            : { name: info[1], size: info[2] };
}
function resetInfo(info) {
    for (let i = 1; i < info.length; i++) {
        info[i] = "";
    }
    return info;
}
export async function submit(info) {
    try {
        const docRef = await addDoc(collection(db, info[0]), setInfo(info));
        console.log("Document written with ID: ", docRef.id);
        info = resetInfo(info);
    }
    catch (e) {
        console.log("nope");
    }
}
//# sourceMappingURL=dataQuery.js.map