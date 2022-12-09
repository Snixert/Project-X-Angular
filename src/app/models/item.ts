import { ItemStat } from "./itemstat";

export interface Item{
    id: number,
    name: string,
    type: number,
    price: number,
    image: string,
    itemStats: [
        ItemStat
    ]
}