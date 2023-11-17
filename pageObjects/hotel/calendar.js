import moment from "moment/moment";

export class Calendar {
  #calendar;

  constructor(roomContainer) {
    this.#calendar = roomContainer.locator(".rbc-calendar");
  }

  async selectDateRange(start, end) {
    // await this.#calendar
    // .locator(`.rbc-button-link:has-text('${start}')`)
    // .click();
    // this.#calendar.page().mouse.down()

    // await this.#calendar
    //   .page()
    //   .dragAndDrop(
    //     `.rbc-button-link:has-text('${start}')`,
    //     `.rbc-button-link:has-text('${end}')`,
    //     { force: true }
    //   );
    const startBox = await this.#calendar
      .locator(`.rbc-button-link:has-text('${start}')`)
      .boundingBox();
    // await this.#calendar
    //   .locator(`.rbc-button-link:has-text('${start}')`)
    //   .hover({ position: { x: startBox.x - 10, y: startBox.y - 5 } });

    await this.#calendar.page().mouse.move(startBox.x, startBox.y);
    await this.#calendar.page().mouse.click(startBox.x, startBox.y);
    await this.#calendar.page().mouse.down();
    // await this.#calendar.locator(`.rbc-button-link:has-text('${end}')`).hover();
    const boundingBox = await this.#calendar
      .locator(`.rbc-button-link:has-text('${end}')`)
      .boundingBox();
    await this.#calendar
      .page()
      .mouse.move(boundingBox.x, boundingBox.y, { steps: 20 });
    // await this.#calendar.locator(`.rbc-button-link:has-text('${end}')`).hover();
    // await this.#calendar.locator(`.rbc-button-link:has-text('${end}')`).hover();
    await this.#calendar.page().mouse.up();
    await this.#calendar.page().waitForTimeout(5000);

    // const startBox = await this.#calendar.locator(`.rbc-button-link:has-text('${start}')`).boundingBox();
    // this.#calendar.page().mouse.move(startBox.x - 10, startBox.y);
    // this.#calendar.page().mouse.down();
    // await this.#calendar.locator(`.rbc-button-link:has-text('${end}')`).hover();
    // await this.#calendar.page().mouse.up();
  }
}
