import { test, expect } from "@playwright/test";
import { Room } from "../pageObjects/hotel/room";
import { roomsType } from "../pageObjects/hotel/roomsType";

test.describe("Booking room tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.describe("should be visible", () => {
    test("image when room is available for booking", async ({ page }) => {
      const room = new Room(page);
      const image = await room.getImage();

      await expect(image).toBeVisible();
    });

    test("preference icon when room is available for booking", async ({
      page,
    }) => {
      const room = new Room(page);
      const preferencesIcon = await room.getPreferencesIcon();

      await expect(preferencesIcon).toBeVisible();
    });

    test("calendar and form when Book this room button is pressed", async ({
      page,
    }) => {
      const room = new Room(page);
      await room.book();

      await expect(
        (await room.calendar.getLocator()) && (await room.form.getLocator())
      ).toBeVisible();
    });
  });

  test.describe("should have", () => {
    test("name when room available to book", async ({ page }) => {
      const room = new Room(page);
      const description = await room.getName();

      expect(description).toBe(roomsType.single);
    });

    test("description when room available to book", async ({ page }) => {
      const room = new Room(page);
      const description = await room.getDescription();

      const expectedText =
        "Aenean porttitor mauris sit amet lacinia molestie. In posuere accumsan aliquet. Maecenas sit amet nisl massa. Interdum et malesuada fames ac ante.";

      expect(description).toBe(expectedText);
    });

    test("list of 3 facilities options when room is available for booking", async ({
      page,
    }) => {
      const room = new Room(page);
      const facilities = await room.getFacilitiesList();

      await expect(facilities).toHaveCount(3);
    });
  });
});
