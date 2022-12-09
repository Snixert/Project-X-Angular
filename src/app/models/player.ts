import { Item } from "./item";
import { ItemStat } from "./itemstat";

export class Player {
    id: number;
    name: string;
    currency: number;
    weaponId: number;
    weapon: Item;
    playerStats: [
        ItemStat
    ];
    inventory: [
        Item
    ];
    constructor() {
        this.id = 0;
        this.name = '',
            this.currency = 0,
            this.weaponId = 0,
            this.weapon = {
                id: 0,
                name: '',
                type: 0,
                price: 0,
                image: '',
                itemStats: [{
                    statsId: 0,
                    statName: '',
                    statsValue: 0
                }]
            },
            this.playerStats = [{
                statsId: 0,
                statName: '',
                statsValue: 0
            }],
            this.inventory = [{
                id: 0,
                name: '',
                type: 0,
                price: 0,
                image: '',
                itemStats: [{
                    statsId: 0,
                    statName: '',
                    statsValue: 0
                }]
            }]
    }
}