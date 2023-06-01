import { expect, describe, it } from "vitest";
import {
  Item,
  items,
  updateQuality,
  BasicItem,
  CheeseItem,
  LegendaryItem,
  ConcertItem,
  ConjuredItem,
} from "./gilded-rose.js";

describe("updateQuality", () => {
  it("reduces quality and sellIn of basic items by 1", () => {
    const testItem = new BasicItem("basic", 5, 3);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(2);
    expect(testItem.sellIn).toBe(4);
  });
  //- Once the `sellIn` days is less then zero, `quality` degrades twice as fast.
  it("reduces quality by 2 for items with sellIn <0", () => {
    const testItem = new BasicItem("basic", -2, 8);
    items.push(testItem);
    updateQuality();
    expect(testItem.quality).toBe(6);
    expect(testItem.sellIn).toBe(-3);
  });
  //- The `quality` of an item is never negative.
  it("quality of an item is never negative", () => {
    const testItem = new BasicItem("basic", 3, 0);
    items.push(testItem);
    updateQuality();
    expect(testItem.quality).toBe(0);
    expect(testItem.sellIn).toBe(2);
  });
  //- "Aged Brie" actually increases in `quality` the older it gets.
  it("Aged Brie actually increases in 'quality' the older it gets", () => {
    const testItem = new CheeseItem("Aged Brie", 3, 40);
    items.push(testItem);
    updateQuality();
    expect(testItem.quality).toBe(41);
    expect(testItem.sellIn).toBe(2);
  });
  //- The `quality` of an item is never more than `50`.
  it("it never increases the quality of an item <50", () => {
    const testItem = new CheeseItem("Aged Brie", 3, 50);
    items.push(testItem);
    updateQuality();
    expect(testItem.quality).toBe(50);
  });
  //- "Sulfuras, Hand of Ragnaros," being a legendary item, never has to be sold nor does it decrease in `quality`.
  it("The 'Sulfuras, Hand of Ragnaros' never decreases in quality", () => {
    const testItem = new LegendaryItem("Sulfuras, Hand of Ragnaros", 3, 50);
    items.push(testItem);
    updateQuality();
    expect(testItem.quality).toBe(50);
    expect(testItem.sellIn).toBe(3);
  });
  //- "Backstage passes to a TAFKAL80ETC concert", increase in `quality` as it's `sellIn` value decreases:
  // - `quality` increases by `2` when there are `10` days or less left before the concert.
  it("Increases quality by 2 when there are <=10 days before 'Backstage passes to a TAFKAL80ETC concert'", () => {
    const testItem = new ConcertItem(
      "Backstage passes to a TAFKAL80ETC concert",
      10,
      4
    );
    items.push(testItem);
    updateQuality();
    expect(testItem.sellIn).toBe(9);
    expect(testItem.quality).toBe(6);
  });
  // - `quality` increases by `3` when there are `5` days or less left before the concert.
  it("quality increases by '3' when there are '5' days or less before concert", () => {
    const testItem = new ConcertItem(
      "Backstage passes to a TAFKAL80ETC concert",
      5,
      4
    );
    items.push(testItem);
    updateQuality();
    expect(testItem.sellIn).toBe(4);
    expect(testItem.quality).toBe(7);
  });
  // - `quality` drops to `0` after the concert.
  it("quality drops to '0' after the concert", () => {
    const testItem = new ConcertItem(
      "Backstage passes to a TAFKAL80ETC concert",
      0,
      4
    );
    items.push(testItem);
    updateQuality();
    expect(testItem.sellIn).toBe(-1);
    expect(testItem.quality).toBe(0);
  });
});
