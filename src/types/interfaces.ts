import { SetStateAction } from "react";

export interface ITrain {
  description: string;
  characteristics: ITrainCharacteristics[];
  name: string;
}

export interface ITrainCharacteristics {
  speed: string;
  force: string;
  engineAmperage: string;
}

export interface IList {
  data: ITrain;
  id: number;
  setInfoCharacteristics: (id: number) => void;
}

export interface ICell {
  valueInput: string;
  index: number;
  pattern: string;
  name: string;
  onChange: () => void;
  setNewData: React.Dispatch<SetStateAction<ITrain>>;
}
