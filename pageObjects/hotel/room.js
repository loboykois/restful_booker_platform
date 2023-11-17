import { Calendar } from "./calendar";
import { BookingForm } from "./bookingForm";

export class Room {
  #roomContainer;
  #details;
  constructor(roomContainer) {
    this.#roomContainer = roomContainer;
    this.#details = this.#roomContainer.locator(".hotel-room-info").first();
    const bookingContainer = this.#roomContainer
      .locator(".hotel-room-info")
      .last();
    this.calendar = new Calendar(bookingContainer);
    this.form = new BookingForm(bookingContainer);
  }

  async book() {
    await this.#roomContainer.locator("button:text('Book this room')").click();
  }
}
