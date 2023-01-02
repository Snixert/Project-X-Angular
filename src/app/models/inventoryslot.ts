import { Item } from "./item";

export interface InventorySlot{
    itemid: number,
    playerid: number,
    item: Item,
}