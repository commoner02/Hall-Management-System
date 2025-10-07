export enum IType{
    normal="Normal",
    managerSpecial="Manager Special",
    monthlyFeast="Monthly Feast"
}
export interface IMeal{
    type: IType,
    items: Array<{item:string,quantity:number,price:number}>,
    meals: Array<string>
}