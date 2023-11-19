import { Footer } from "./footer";
import { Header } from "./header";
import { Room } from "../hotel/room";
export class ReservationPage {
  #page;

  constructor(page) {
    this.#page = page;
    this.header = new Header(page);
    this.footer = new Footer(page);
  }

  async navigate() {
    await this.#page.goto("/");
  }

  async getRooms() {
    const rooms = await this.#page
      .locator(".container-fluid > div:not([class])")
      .all();

    return rooms.map((i) => new Room(i));
  }

  async sendResponse({ body, status = 200 }) {
    await this.#page.route(
      "https://automationintesting.online/room/",
      (route) =>
        route.fulfill({
          status,
          contentType: "application/json",
          body: JSON.stringify(body),
        })
    );

    await this.#page.goto("/");
  }

  async abortResponse() {
    await this.#page.route(
      "https://automationintesting.online/room/",
      (route) => route.abort()
    );
  }

  async fulfillAbortResponse() {
    await this.#page.route(
      "https://automationintesting.online/room/",
      (route) => route.fulfill({ status: 500 })
    );
  }
}
