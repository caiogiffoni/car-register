export interface ICar {
  id: string;
  brand: string;
  model: string;
  color: string;
  year_fabrication: number;
  year_model: number;
  shift: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICarCreate {
  brand: string;
  model: string;
  color: string;
  year_fabrication: number;
  year_model: number;
  shift: string;
}

export interface ICarUpdate extends ICarCreate {
  id: string;
}
