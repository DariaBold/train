import { useEffect, useState } from "react";
import "./App.css";
import { trainAPI } from "../../api/rtkqueryApi";
import List from "../List/List";
import { ITrain, ITrainCharacteristics } from "../../types/interfaces";
import Characteristics from "../Characteristics/Characteristics";

function App() {
  const { data } = trainAPI.useGetTrainsQuery(1);
  const [infoCharacteristics, setInfoCharacteristics] = useState<number>(0);
  const [isVisibleTrain, setIsVisibleTrain] = useState(false);
  const [validation, setValidation] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [newData, setNewData] = useState<ITrainCharacteristics[]>([]);

  useEffect(() => {
    if (data) {
      setIsVisibleTrain(true);
      setNewData(
        data[infoCharacteristics]?.characteristics?.map(
          (item: ITrainCharacteristics) =>
            Object.assign({}, item, { valids: true })
        )
      );
    }
  }, [data, infoCharacteristics]);
  useEffect(() => {
    setIsValid(newData.every((el) => el.valids === true));
  }, [newData, validation, setIsValid, setValidation, isValid]);
  const returnSpeed = () => {
    let result: number[] = [];
    newData.forEach((el) => {
      result.push(el.speed as number);
    });
    result.sort((a, b) => a - b);
    console.log(result);
  };
  return (
    <div className="App app-display">
      <header className="App-header"></header>
      <table className="train__table-countainer train__table-list">
        <thead>
          <tr>
            <th className="train__table-header">Поезда</th>
          </tr>
        </thead>
        <tbody className="train__table-column">
          <tr className="train__table-description train__table-description-list">
            <th className="train__table-description-td">Название</th>
            <th className="train__table-description-td">Описание</th>
          </tr>
          {isVisibleTrain &&
            data?.map((info: ITrain, index: number) => (
              <List
                data={info}
                key={index}
                id={index}
                setInfoCharacteristics={setInfoCharacteristics}
              />
            ))}
        </tbody>
      </table>
      <div className="train__characteristics train__characteristics-countainer">
        <table className="train__table-countainer">
          <thead>
            <tr className="train__table-header">
              <th>Характеристики</th>
              <th>{data && data[infoCharacteristics].name}</th>
            </tr>
          </thead>
          <tbody className="train__table-column">
            <tr className="train__table-description">
              <th className="train__table-description-td">Ток двигателя</th>
              <th className="train__table-description-td">Сила тяги</th>
              <th className="train__table-description-td">Скорость</th>
            </tr>
            {isVisibleTrain &&
              newData?.map((info: ITrainCharacteristics, index: number) => (
                <Characteristics
                  info={info}
                  setValidation={setValidation}
                  key={index}
                />
              ))}
          </tbody>
        </table>
        <button
          className={`train__button-submit train__button ${
            !isValid ? "train__button_disabled" : ""
          }`}
          disabled={!isValid}
          onClick={() => {
            returnSpeed();
          }}
        >
          Отправить данные
        </button>
      </div>
    </div>
  );
}

export default App;
