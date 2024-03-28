import "./Characteristics.css";
import { ICharacteristics } from "../../types/interfaces";
import { useEffect, useState } from "react";

function Characteristics({ info, setValidation }: ICharacteristics) {
  const [valueEngineAmperage, setValueEngineAmperage] = useState(
    info.engineAmperage
  );
  const [valueSpeed, setValueSpeed] = useState(info.speed);
  const [valueForce, setValueForce] = useState(info.force);
  const [validationEngineAmperage, setValidationEngineAmperage] =
    useState(true);
  const [validationSpeed, setvalidationSpeed] = useState(true);
  const [validationForce, setvalidationForce] = useState(true);
  info.valids = validationEngineAmperage && validationSpeed && validationForce;
  useEffect(() => {
    setValueEngineAmperage(info.engineAmperage);
    setValueSpeed(info.speed);
    setValueForce(info.force);
    setvalidationSpeed(true);
    setvalidationForce(true);
    setValidationEngineAmperage(true);
  }, [info]);
  useEffect(() => {
    setValidation(
      !!validationEngineAmperage && !!validationSpeed && !!validationForce
    );
  }, [
    setValidation,
    validationEngineAmperage,
    validationForce,
    validationSpeed,
  ]);

  const validationCharachteristic = () => {
    setValidation(
      !!validationEngineAmperage && !!validationSpeed && !!validationForce
    );
  };
  return (
    <tr className="train__table-characteristics">
      <td className={`train__table-characteristic`}>
        <input
          className={`train__table-characteristic-input ${
            !validationEngineAmperage
              ? "train__table-characteristic-input_disabled"
              : ""
          }`}
          onChange={(event) => {
            let numberIn = +event.target.value;
            let valid = !isNaN(numberIn) && numberIn % 1 === 0 && numberIn > 0;
            setValueEngineAmperage(event.target.value);
            setValidationEngineAmperage(valid);
            if (valid) {
              info.engineAmperage = numberIn;
            }
            validationCharachteristic();
          }}
          id="engineAmperage"
          value={valueEngineAmperage}
          type="string"
          name="engineAmperage"
        />
      </td>
      <td className={`train__table-characteristic`}>
        <input
          className={`train__table-characteristic-input ${
            !validationForce ? "train__table-characteristic-input_disabled" : ""
          }`}
          onChange={(event) => {
            setValueForce(event.target.value);
            let numberIn = +event.target.value;
            let valid = !isNaN(numberIn) && numberIn % 1 !== 0 && numberIn > 0;
            setvalidationForce(valid);
            if (valid) {
              info.force = numberIn;
            }
            validationCharachteristic();
          }}
          id="force"
          value={valueForce}
          type="string"
          name="force"
        />
      </td>
      <td className={`train__table-characteristic`}>
        <input
          className={`train__table-characteristic-input ${
            !validationSpeed ? "train__table-characteristic-input_disabled" : ""
          }`}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValueSpeed(event.target.value);
            let numberIn = +event.target.value;
            let valid = !isNaN(numberIn) && numberIn % 1 === 0 && numberIn >= 0;
            setvalidationSpeed(valid);
            if (valid) {
              info.speed = numberIn;
            }
            validationCharachteristic();
          }}
          id="force"
          value={valueSpeed}
          type="string"
          name="force"
        />
      </td>
    </tr>
  );
}

export default Characteristics;
