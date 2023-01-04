import { ItemStat } from "./itemstat";

export interface Item{
    itemId: number,
    name: string,
    type: number,
    price: number,
    image: string,
    itemStats: [
        ItemStat
    ]
}