export interface ICar {
  id: string;
  brand: string;
  model: string;
  color: string;
  year_fabrication: number;
  year_model: number;
  shift: string;
  created_at: string;
  updated_at: string;
}
export interface IProps {
  car: ICar;
}

export interface IPost {
  brand: string;
  model: string;
  color: string;
  year_fabrication: number;
  year_model: number;
  shift: string;
}
