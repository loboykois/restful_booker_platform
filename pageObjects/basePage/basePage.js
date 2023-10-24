import { Footer } from "../basePage/footer/footer";
import { emptyResponse } from "../../tests/tools/fakeResponses";

export class BasePage {
  #page;

  constructor(page) {
    this.#page = page;
    this.footer = new Footer(page);
  }

  async sendPageWithoutRooms() {
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

  getRoomInfoBlock() {
    return this.#page.locator(".hotel-room-info");
  }
}
