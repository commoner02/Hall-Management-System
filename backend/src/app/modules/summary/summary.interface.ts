export enum IRate{
    normal=65,
    managerSpecial=90,
    monthlyFeast=230
}

export interface ISummary{
    date: String,
    totalMeal: number,
    mealRate: IRate,
    totalMoney: number,
}