import { SetStateAction, useEffect, useState } from "react";
import { ICell } from "../../types/interfaces";
import "./Cell.css";

export const Cell = ({
  valueInput,
  index,
  pattern,
  name,
  onChange,
  setNewData,
}: ICell) => {
  const [state, setState] = useState<string | number>("");
  useEffect(() => {
    setState(valueInput);
  }, [valueInput]);
  return (
    <td>
      {setNewData && (
        <input
          className={`train__table-characteristic-input`}
          type="text"
          value={state || valueInput}
          name={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setState(value);
            setNewData((prevState) => ({
              ...prevState,
              characteristics: prevState.characteristics.map((item, i) =>
                i === index
                  ? { ...prevState.characteristics[index], [name]: value }
                  : item,
              ),
            }));
            onChange();
          }}
          pattern={pattern}
          required
        />
      )}
    </td>
  );
};
