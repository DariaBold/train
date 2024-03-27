import "./List.css";
import { IList } from "../../types/interfaces";

function List({ data, id, setInfoCharacteristics }: IList) {
  return (
    <tr className="table__list-tr" onClick={() => setInfoCharacteristics(id)}>
      <td className="table__list-td">{data.name}</td>
      <td className="table__list-td">{data.description}</td>
    </tr>
  );
}

export default List;
