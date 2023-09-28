import { rooms } from "../initial-statement.js";

let currentRoom = 'Kitchen'

export function pickRoom() {
    const possibleRooms = rooms[currentRoom]
    const nextRoom = possibleRooms[Math.floor(Math.random()*possibleRooms.length)];

    return currentRoom = nextRoom;
}