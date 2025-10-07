export enum IRate{
    normal=65,
    managerSpecial=90,
    monthlyFeast=230
}

export interface ISummary{
    date: Date,
    totalMeal: number,
    mealRate: IRate,
    totalMoney: number,
    incentive: number
}