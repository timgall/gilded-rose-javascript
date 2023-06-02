export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
export class BasicItem extends Item {
  updateQuality() {
    if (this.sellIn < 0 && this.quality >= 2) {
      this.sellIn--;
      this.quality -= 2;
    } else if (this.sellIn >= 0 && this.quality >= 1) {
      this.sellIn--;
      this.quality--;
    } else if (this.quality == 0) {
      this.sellIn--;
    }
  }
}
export class CheeseItem extends Item {
  updateQuality() {
    if (this.quality === 50) {
      this.sellIn--;
    } else {
      this.sellIn--;
      this.quality++;
    }
  }
}

export class LegendaryItem extends Item {
  updateQuality() {}
}

export class ConcertItem extends Item {
  updateQuality() {
    if (this.sellIn <= 0) {
      this.quality = 0;
    } else if (this.sellIn <= 5) {
      this.quality += 3;
    } else if (this.sellIn <= 10) {
      this.quality += 2;
    } else {
      this.quality++;
    }
    if (this.quality >= 50) {
      this.quality = 50;
    }
    this.sellIn--;
  }
}

export class ConjuredItem extends Item {
  updateQuality() {
    if (this.quality >= 2) {
      this.quality -= 2;
    } else {
      this.quality;
    }
    this.sellIn--;
  }
}
export let items = [];

export function makeItem(name, sellIn, quality) {
  if (name === "Aged Brie") {
    return new CheeseItem(name, sellIn, quality);
  } else if (name === "Sulfuras, Hand of Ragnaros") {
    return new LegendaryItem(name, sellIn, quality);
  } else if (name === "Backstage passes to a TAFKAL80ETC concert") {
    return new ConcertItem(name, sellIn, quality);
  } else if (name.startsWith("Conjured")) {
    return new ConjuredItem(name, sellIn, quality);
  } else {
    return new BasicItem(name, sellIn, quality);
  }
}

items.push(new BasicItem("+5 Dexterity Vest", 10, 20));
items.push(new CheeseItem("Aged Brie", 2, 0));
items.push(new LegendaryItem("Elixir of the Mongoose", 5, 7));
items.push(new LegendaryItem("Sulfuras, Hand of Ragnaros", 0, 80));
items.push(
  new ConcertItem("Backstage passes to a TAFKAL80ETC concert", 15, 20)
);
items.push(new ConjuredItem("Conjured Mana Cake", 3, 6));

export const updateQuality = () => {
  for (let item of items) {
    item.updateQuality();
  }
};
