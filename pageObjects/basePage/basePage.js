import { Footer } from "./footer";

// TODO: rename base class
export class BasePage {
  #page;

  constructor(page) {
    this.#page = page;
    this.footer = new Footer(page);
  }

  // TODO: rename method
  async sendPageWithoutRooms(emptyResponse) {
    await this.#page.route(
      "https://automationintesting.online/room/",
      (route) =>
        route.fulfill({
          contentType: "application/json",
          body: JSON.stringify(emptyResponse),
        })
    );

    await this.#page.goto("/");
  }

  // TODO: create error method for api

  getRoomInfoBlock() {
    return this.#page.locator(".hotel-room-info");
  }
}
