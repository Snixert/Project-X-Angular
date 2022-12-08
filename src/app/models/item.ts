export interface Item{
    id: number,
    name: string,
    type: number,
    itemStats: [{
        statsId: number,
        statName: string,
        statsValue: number
    }]
}