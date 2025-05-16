import { useEffect, useState } from "react";
import "./App.css";
import List from "../List/List";
import { ITrain, ITrainCharacteristics } from "../../types/interfaces";
import { Cell } from "../Cell/Cell";
import { useGetTrainsQuery } from "../../api/rtkqueryApi";

const firstData = {
  description: "",
  characteristics: [
    {
      speed: "0",
      force: "0",
      engineAmperage: "1",
    },
  ],
  name: "",
};

function App() {
  const [infoCharacteristics, setInfoCharacteristics] = useState<number>(0);
  const { data, isLoading, error } = useGetTrainsQuery();
  const [newData, setNewData] = useState<ITrain>(firstData);

  const form = document.querySelector("form");
  const inputList: HTMLInputElement[] | null =
    form &&
    Array.from(form.querySelectorAll(".train__table-characteristic-input"));
  const buttonElement = form && form.querySelector(".button__submit");
  function hasInvalidInput() {
    return (
      inputList &&
      inputList.some((inputElement) => !inputElement.validity.valid)
    );
  }

  useEffect(() => {
    if (data) {
      setNewData(data[infoCharacteristics]);
      const form = document.querySelector("form");
      const buttonElement = form && form.querySelector(".button__submit");
      buttonElement && buttonElement.removeAttribute("disabled");
    }
  }, [data, infoCharacteristics]);
  const returnSpeed = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let result: number[] = [];
    newData &&
      newData.characteristics.forEach((el) => {
        result.push(Number(el.speed));
      });
    result.sort((a, b) => a - b);
    console.log(result);
  };

  function toggleButton() {
    if (buttonElement) {
      if (hasInvalidInput()) {
        buttonElement.setAttribute("disabled", "");
      } else {
        buttonElement.removeAttribute("disabled");
      }
    }
  }

  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <form
          className="App app-display"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
            returnSpeed(event)
          }
        >
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
              {data?.map((info: ITrain, index: number) => (
                <List
                  data={info}
                  key={`${index + info.name}`}
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
                  <th>{newData && newData.name}</th>
                </tr>
              </thead>
              <tbody className="train__table-column">
                <tr className="train__table-description">
                  <th className="train__table-description-td">Ток двигателя</th>
                  <th className="train__table-description-td">Сила тяги</th>
                  <th className="train__table-description-td">Скорость</th>
                </tr>
                {newData?.characteristics.map(
                  (info: ITrainCharacteristics, index: number) => {
                    return (
                      <tr className="train__table-characteristics" key={index}>
                        <Cell
                          name={"engineAmperage"}
                          valueInput={info.engineAmperage}
                          index={index}
                          pattern="^[1-9]\d*$"
                          onChange={toggleButton}
                          setNewData={setNewData}
                        />
                        <Cell
                          name={"force"}
                          valueInput={info.force}
                          index={index}
                          pattern="^[0-9]*[.]?[0-9]+$"
                          onChange={toggleButton}
                          setNewData={setNewData}
                        />
                        <Cell
                          name={"speed"}
                          valueInput={info.speed}
                          index={index}
                          pattern="^[0-9]\d*$"
                          onChange={toggleButton}
                          setNewData={setNewData}
                        />
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
            <button type="submit" className={"button__submit"}>
              Отправить данные
            </button>
          </div>
        </form>
      ) : null}
    </>
  );
}

export default App;
