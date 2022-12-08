export interface Item{
    id: number,
    name: string,
    type: number,
    price: number,
    image: string,
    itemStats: [{
        statsId: number,
        statName: string,
        statsValue: number
    }]
}