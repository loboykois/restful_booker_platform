export class Calendar {
  #calendar;

  constructor(roomContainer) {
    this.#calendar = roomContainer.locator(".rbc-calendar");
  }

  async selectDateRange(start, end) {
    const sourceDate = this.#calendar.locator(`button:text("${start}")`).nth(0);
    const targetDate = this.#calendar.locator(`button:text("${end}")`).nth(0);
    const sourceBoundingBox = await sourceDate.boundingBox();
    const targetBoundingBox = await targetDate.boundingBox();

    await this.#calendar.page().mouse.move(sourceBoundingBox.x - 50, sourceBoundingBox.y + 50, { steps: 10 });

    await this.#calendar.page().mouse.down();

    await this.#calendar.page().mouse.move(targetBoundingBox.x, targetBoundingBox.y + 50, { steps: 10 });
    await targetDate.hover();
    await this.#calendar.page().mouse.up();
    await this.#calendar.page().waitForTimeout(50);
  }

  async getReservedRange() {
    return await this.#calendar.locator(".rbc-event-content:has-text('night(s)')");
  }

  async pressNext() {
    await this.#calendar.locator("button:has-text('Next')").click();
  }
}
