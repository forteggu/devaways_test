import cssGR from "./GeneralRanking.module.css";
import * as DataApi from "../../Api/DataApi";
function GeneralRanking() {
    console.log(DataApi.getGeneralRanking());
  return (
    <div className={cssGR.generalRankingContainer}>
      <h1>Clasificación Global</h1>
      <li>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
        quisquam! Inventore impedit expedita eius aut, rem, est modi ab optio
        ullam distinctio, dolor obcaecati et! Earum voluptatum officia eius
        blanditiis!
      </li>
      <li>
        Architecto possimus, officia distinctio magni incidunt aliquid doloribus
        adipisci animi laboriosam. Cupiditate amet praesentium blanditiis
        inventore deserunt quod laboriosam excepturi minus, debitis quaerat,
        officia, labore esse recusandae ipsam ad dolor!
      </li>
      <li>
        Architecto corrupti recusandae quaerat iusto in reiciendis laudantium
        facilis non accusamus quasi aliquid a perspiciatis impedit veniam,
        culpa, consequatur temporibus? Magnam cum provident non tenetur! Magni
        quod consequatur natus minus.
      </li>
      <li>
        Eveniet dolores cupiditate ducimus? Expedita atque perspiciatis maxime
        sapiente. Harum quae vero, quo fugiat laudantium enim dolorem esse! Cum
        doloremque aliquam, vero beatae qui adipisci assumenda numquam ex sit!
        Ducimus?
      </li>
      <li>
        Impedit natus blanditiis maiores, sequi esse voluptates amet nemo et
        ducimus! Vitae sequi optio provident commodi facilis voluptates laborum
        quis. Dolorem, quidem? At voluptatum sequi hic repellat doloremque
        consequuntur aspernatur.
      </li>
    </div>
  );
}

export default GeneralRanking;
