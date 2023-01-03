import { Inventory } from "./inventory";
import { Item } from "./item";
import { PlayerStat } from "./playerstat";

export class Player {
    id: number;
    name: string;
    image: string;
    currency: number;
    weaponId: number;
    weapon: Item;
    playerStats: [
        PlayerStat
    ];
    inventory: [
        Inventory
    ];
    constructor() {
        this.id = 0;
        this.name = '',
            this.image = '',
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
                inventory: [{
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
            }]
    }
}