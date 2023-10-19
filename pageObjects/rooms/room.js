export const roomType = {
  single: "single",
  suite: "Suite",
};

// await page.route('https://automationintesting.online/room/', async route => {
//   // Fetch original response.
//   const response = await route.fetch();
//   // Add a prefix to the title.
//   let body = await response.text();
//   const responseObject = JSON.parse(body);
//   responseObject.rooms[0].accessible = false;
//   route.fulfill({
//     // Pass all fields from the response.
//     response,
//     // Override response body.
//     JSON.stringify(responseObject),
//     // Force content type to be html.
//     headers: {
//       ...response.headers(),
//       'content-type': 'text/html'
//     }
//   });
// });
export class Room {
  #roomLocator;
  #roomType;

  constructor(page, roomType) {
    this.#roomLocator = page.locator(".hotel-room-info");
    this.#roomType = roomType;
  }

  setContext(roomType) {
    this.#roomType = roomType;
  }

  async getImage() {
    this.#roomLocator.locator("img");
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
