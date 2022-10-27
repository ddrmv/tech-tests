// do not change class Item
class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const doubleIfExpired = (sellIn, change) => {
  return sellIn < 0 ? 2 * change : change;
};

class StandardItem extends Item {
  updateQuality = () => {
    this.quality -= doubleIfExpired(this.sellIn, 1);
    if (this.quality < 0) {
      this.quality = 0;
    }
    this.sellIn -= 1;
  };
}

class CheeseItem extends Item {
  updateQuality = () => {
    this.quality += doubleIfExpired(this.sellIn, 1);
    if (this.quality > 50) {
      this.quality = 50;
    }
    this.sellIn -= 1;
  };
}

class SulfurasItem extends Item {
  updateQuality = () => {};
}

class TicketItem extends Item {
  updateQuality = () => {
    if (this.sellIn > 10) {
      this.quality += 1;
    } else if (this.sellIn > 5) {
      this.quality += 2;
    } else if (this.sellIn > 0) {
      this.quality += 3;
    } else {
      this.quality = 0;
    }
    if (this.quality > 50) {
      this.quality = 50;
    }
    this.sellIn -= 1;
  };
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      // new code
      if (item instanceof StandardItem) {
        item.updateQuality();
        continue;
      }
      if (item instanceof CheeseItem) {
        item.updateQuality();
        continue;
      }
      if (item instanceof SulfurasItem) {
        item.updateQuality();
        continue;
      }
      if (item instanceof TicketItem) {
        item.updateQuality();
        continue;
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  StandardItem,
  CheeseItem,
  SulfurasItem,
  TicketItem,
  Shop,
};
