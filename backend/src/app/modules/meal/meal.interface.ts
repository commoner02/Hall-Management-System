export enum IType {
  normal = "Normal",
  managerSpecial = "Manager Special",
  monthlyFeast = "Monthly Feast",
}

export interface IItem {
  item: string;
  quantity: number;
  price: number;
}
export interface IMeal {
  type: IType;
  items: Array<IItem>;
  meals: Array<string>;
  totalCost: number;
  date: string;
}
