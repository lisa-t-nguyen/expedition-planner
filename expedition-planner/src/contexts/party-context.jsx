import { createContext, useState } from "react";

export const partyManagementContext = createContext();

const PartyManagementContextProvider = (props) => {
    const createParties = () => {
      return [
        {
          partyNumber: 1,
          partyMembers: []
        },
        {
          partyNumber: 2,
          partyMembers: []
        },
        {
          partyNumber: 3,
          partyMembers: []
        },
      ];
    }

    const [parties, setParties] = useState(createParties());

    const MAX_PARTY_SIZE = 6;
    const [addedPlayers, setAddedPlayers] = useState(new Map());
    const classRoleMap = new Map()
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
    );

    const addPlayer = (player) => {
        for (const party of parties) {
            if (party.partyMembers.length < 6) {
                // Adds information about which party the player will be added to to the player object
                player.partyNumber = party.partyNumber;
                player.partyIndex = party.partyMembers.length;

                // Adds the player to the party
                party.partyMembers.push(player);
                addedPlayers.set(player.name.toLowerCase(), player);
                setParties([...parties]);
                setAddedPlayers(addedPlayers);
                return;
            }
        }
    
        // Every party is full
        console.log(`All parties are full!`); // TODO: Add error message to UI
    }
    
    const updatePlayer = (player) => {
        if (addedPlayers.has(player.name.toLowerCase())) {
            const playerToUpdate = addedPlayers.get(player.name.toLowerCase());
            playerToUpdate.name = player.name;
            playerToUpdate.class = player.job;
            playerToUpdate.level = player.level;
            playerToUpdate.dpm = player.singleTargetDPM;
            setParties([...parties]);
        }
    }

    const swapPlayer = (player1, player2) => {
        // TBD
        console.log(`swapping!`);
    }

    const removePlayer = (player) => {
        const playerToRemove = addedPlayers.get(player.name.toLowerCase());
        if (playerToRemove) {
            const party = parties[playerToRemove.partyNumber - 1];
            const partyIndex = party.partyMembers.indexOf(playerToRemove);
            party.partyMembers.splice(partyIndex, 1);
            addedPlayers.delete(player.name.toLowerCase());
            setParties([...parties]);
        }
    }

    const isPlayerAdded = (playerName) => {
        return addedPlayers.has(playerName.toLowerCase());
    }

    const resetParties = () => {
        setParties(createParties());
    }

    const getPartyByPartyNumber = (partyNumber) => {
        return parties[partyNumber - 1];
    }

    const getMaxPartySize = () => {
        return MAX_PARTY_SIZE;
    }

    const getRole = (playerClass, playerLevel) => {
        if (playerClass == null || playerClass === "") {
            return "";
        }
    
        if (playerLevel < 120) {
            return "UNQUALIFIED";
        }
    
        // If the player's class is found in the role map, return the role
        for (const role of classRoleMap.keys()) {
            if (classRoleMap.get(role).has(playerClass)) {
                return role;
            }
        }
    
        // Otherwise return "DPS"
        return "DPS";
    }

    const partyActionDetailsMap = new Map()
        .set(addPlayer, {
            text: "Add",
            description: "Add a player to the party.",
            buttonColor: "purple"
        })
        .set(removePlayer, {
            text: "Remove",
            description: "Remove this player from the party.",
            buttonColor: "red"
        })
        .set(updatePlayer, {
            text: "Update",
            description: "Update this player's information.",
            buttonColor: "purple"
        })
        .set(resetParties, {
            text: "Reset",
            description: "Reset all parties.",
            buttonColor: "red"
        })
        .set(swapPlayer, {
            text: "Swap",
            description: "Swap this player with another player or to another party",
            buttonColor: "white"
        }
    );

    const getPartyActionDetails = (partyAction) => {
        return partyActionDetailsMap.get(partyAction);
    };

    const getPartyCount = () => {
        return parties.length;
    }

    const getPlayerCount = () => {
        return addedPlayers.size;
    }

    return (
        <partyManagementContext.Provider value={{parties,
                                                 addPlayer,
                                                 updatePlayer,
                                                 removePlayer,
                                                 swapPlayer,
                                                 isPlayerAdded,
                                                 resetParties,
                                                 getPartyByPartyNumber,
                                                 getMaxPartySize,
                                                 getRole,
                                                 getPartyActionDetails,
                                                 getPartyCount,
                                                 getPlayerCount}
                                               }>
            {props.children}
        </partyManagementContext.Provider>
    );
};

export default PartyManagementContextProvider;