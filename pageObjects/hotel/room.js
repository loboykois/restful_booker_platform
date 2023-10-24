import { Calendar } from "./calendar";
import { BookingForm } from "./bookingForm";

export class Room {
  #page;
  #room;
  #details;

  constructor(page) {
    this.#page = page;
    this.#room = this.#page.locator(".hotel-room-info");
    this.#details = this.#page.locator(".col-sm-7");
    this.calendar = new Calendar(page);
    this.form = new BookingForm(page);
  }

  getImage() {
    return this.#room.locator(".hotel-img");
  }

  getPreferencesIcon() {
    return this.#details.locator("span");
  }

  getName() {
    return this.#details.locator("h3").innerText();
  }

  getDescription() {
    return this.#details.locator("p").innerText();
  }

  getFacilitiesList() {
    return this.#details.locator("ul > li");
  }

  async book() {
    await this.#details.locator("button:has-text('Book this room')").click();
  }
}