export const roomType = {
  single: "single",
  suite: "Suite",
};

export class Room {
  #roomLocator;
  #roomType;

  constructor(roomLocator, roomType) {
    this.#roomLocator = roomLocator;
    this.#roomType = roomType;
  }

  setContext(roomType) {
    this.#roomType = roomType;
  }

  async getImage() {
    await this.#roomLocator.locator(".hotel-room-info > img");
  }

  async getName() {
    await this.#roomLocator.locator(".hotel-room-info > h3");
  }

  async getDescription() {
    await this.#roomLocator.locator(".hotel-room-info > p");
  }

  async getAmenitiesList() {
    await this.#roomLocator.locator(".hotel-room-info > ul > li");
  }

  async getPropertyPreferences() {
    await this.#roomLocator.locator(".hotel-room-info > span");
  }

  async bookButton() {
    await this.#roomLocator.locator("button:has-text('Book this room')");
  }
}
