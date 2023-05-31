<script>
    import { qst } from "./query.js";
    

    qst.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
});
  </script>

