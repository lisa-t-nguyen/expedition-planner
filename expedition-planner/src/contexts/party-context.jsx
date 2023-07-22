import { createContext } from "react";

export const MaxPartySizeContext = createContext(6);
export const AddedPlayersContext = createContext(new Map());
export const RolesContext = createContext(
    new Map()
        .set("HS", new Set()
            .add("Bishop")
        )
        .set("SED", new Set()
            .add("Night Lord")
            .add("Night Walker")
            .add("Shadower")
        )
        .set("SE", new Set()
            .add("Bow Master")
            .add("Marksman")
            .add("Wind Archer")
        )
        .set("SI", new Set()
            .add("Buccaneer")
            .add("Thunder Breaker")
        )
        .set("DPS/HB", new Set()
            .add("Dark Knight")
        )
    );