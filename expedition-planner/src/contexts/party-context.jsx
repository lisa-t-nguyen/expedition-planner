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
    const [selectedPlayer, setSelectedPlayer] = useState(null);

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
        if (player == null || player.name == null) {
            console.log(`Attempted to add player but player is null or player name is null.`) // TODO: Add error message to UI
            return;
        }

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
        if (player == null || player.name == null) { 
            console.log(`Attempted to update player but player is null or player name is null.`); // TODO: Add error message to UI
            return; 
        }

        if (addedPlayers.has(player.name.toLowerCase())) {
            const playerToUpdate = addedPlayers.get(player.name.toLowerCase());
            playerToUpdate.name = player.name;
            playerToUpdate.class = player.job;
            playerToUpdate.level = player.level;
            playerToUpdate.dpm = player.singleTargetDPM;
            setParties([...parties]);
        }
    }

    const swapPlayerWithPlayer = (player1, player2) => {
        if (player1 == null || player2 == null) {
            console.log(`Attempted to swap players but player1 or player2 is null.`); // Todo: Add error message to UI if needed
            return;
        }

        const startingPartyNumber = player2.partyNumber;
        const startingPartyIndex = player2.partyIndex;
        parties[player1.partyNumber - 1].partyMembers[player1.partyIndex] = player2;
        player2.partyNumber = player1.partyNumber;
        player2.partyIndex = player1.partyIndex;

        parties[startingPartyNumber - 1].partyMembers[startingPartyIndex] = player1;
        player1.partyNumber = startingPartyNumber;
        player1.partyIndex = startingPartyIndex;
        
        setParties([...parties]);

        resetSelectedPlayer();
    }

    const swapPlayerToParty = (player, party) => {
        if (player == null || party == null || party.partyNumber == null || party.partyNumber < 1 || party.partyNumber > parties.length) {
            console.log(`Attempted to swap players but player is null or partyNumber is out of range or null.`); // TODO: Add error message to UI if needed
            return;
        } else if (player.partyNumber === party.partyNumber) {
            console.log(`Attempted to swap players but player is already in party ${party.partyNumber}.`); // TODO: Add error message to UI if needed
            return;
        } else {
            const startingPartyNumber = player.partyNumber;
            const startingPartyIndex = player.partyIndex;

            player.partyNumber = party.partyNumber;
            player.partyIndex = party.partyMembers.length;
            party.partyMembers.push(player);

            parties[startingPartyNumber - 1].partyMembers.splice(startingPartyIndex, 1);

            for (let i = startingPartyIndex; i < parties[startingPartyNumber - 1].partyMembers.length; i++) {
                parties[startingPartyNumber - 1].partyMembers[i].partyIndex--;
            }
            
            setParties([...parties]);
        }

        resetSelectedPlayer();
    }

    const removePlayer = (player) => {
        if (player == null || player.name == null) { 
            console.log(`Attempted to remove player but player is null or player name is null.`) // TODO: Add error message to UI if needed
            return; 
        }

        const playerToRemove = addedPlayers.get(player.name.toLowerCase());
        if (playerToRemove) {
            const party = parties[playerToRemove.partyNumber - 1];
            const partyIndex = party.partyMembers.indexOf(playerToRemove);
            party.partyMembers.splice(partyIndex, 1);
            addedPlayers.delete(player.name.toLowerCase());

            for (let i = partyIndex; i < party.partyMembers.length; i++) {
                party.partyMembers[i].partyIndex--;
            }

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
        if (playerClass == null || playerClass == null || playerClass === "") {
            console.log(`Attempted to get role but player class is null or player class is empty.`); // TODO: Add error message to UI if needed
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

    const resetSelectedPlayer = () => {
        setSelectedPlayer(null);
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
        .set(swapPlayerWithPlayer, {
            text: "Swap",
            description: "Swap this player with another player or to another party",
            buttonColor: "white"
        })
        .set(resetSelectedPlayer, {
            text: "Cancel",
            description: "Cancel the current action.",
            buttonColor: "red"
        }
    );

    const getPartyActionDetails = (partyAction) => {
        if (partyAction == null) {
            console.log(`Attempted to get party action details but party action is null.`); // TODO: Add error message to UI if needed
            return;
        }

        return partyActionDetailsMap.get(partyAction);
    };

    const getPartyCount = () => {
        return parties.length;
    }

    const getPlayerCount = () => {
        return addedPlayers.size;
    }

    const isAPlayerSelected = () => {
        return selectedPlayer != null;
    }

    return (
        <partyManagementContext.Provider value={{parties,
                                                 addPlayer,
                                                 updatePlayer,
                                                 removePlayer,
                                                 selectedPlayer,
                                                 setSelectedPlayer,
                                                 resetSelectedPlayer,
                                                 swapPlayerWithPlayer,
                                                 swapPlayerToParty,
                                                 isPlayerAdded,
                                                 isAPlayerSelected,
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