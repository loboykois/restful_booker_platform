import { Room, roomType } from "./room";

export class SingleRoom {
  #page;
  #roomType;

  constructor(page) {
    this.#page = page;
    this.room = new Room(page, roomType.single);
  }
}
