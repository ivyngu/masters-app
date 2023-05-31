import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../db/dbconfig.js";
const qc = query(collection(db, "coxswains"));
export const qsc = await getDocs(qc);
const qr = query(collection(db, "rowers"));
export const qsr = await getDocs(qr);
const qs = query(collection(db, "shells"));
export const qss = await getDocs(qs);
const qo = query(collection(db, "oars"));
export const qso = await getDocs(qo);
//# sourceMappingURL=dataQuery.js.map