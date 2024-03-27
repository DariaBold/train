export interface ITrain {
    description: string;
    characteristics: ITrainCharacteristics[];
    name: string;
}

export interface ITrainCharacteristics {
    speed: number | string;
    force: number | string;
    engineAmperage: number | string;
    valids?: boolean;
}
export interface IValidations {
  speed: boolean;
  force: boolean;
  engineAmperage: boolean;
  valid?: boolean;
}

export interface IList {
    data: ITrain;
    id: number;
    setInfoCharacteristics: (id: number) => void;
  }

export interface ICharacteristics {
  info: ITrainCharacteristics;
  setValidation: (val: boolean) => void;
  valids?: boolean;
}