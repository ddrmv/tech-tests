const DEFAULT_MIN_QUALITY = 0;
const DEFAULT_MAX_QUALITY = 50;

class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class ItemWithUtilities extends Item {
  byDoubleIfExpired = (change) => {
    return this.sellIn < 0 ? 2 * change : change;
  };

  changeQualityWithRate = (rate) => {
    this.quality += this.byDoubleIfExpired(rate);
  };

  enforceMinMax = (min = DEFAULT_MIN_QUALITY, max = DEFAULT_MAX_QUALITY) => {
    if (this.quality < min) {
      this.quality = min;
    }
    if (this.quality > max) {
      this.quality = max;
    }
  };

  enforceMinMaxAndAge = () => {
    this.enforceMinMax();
    this.sellIn -= 1;
  };
}

class StandardItem extends ItemWithUtilities {
  updateQuality = () => {
    this.changeQualityWithRate(-1);
    this.enforceMinMaxAndAge();
  };
}

class CheeseItem extends ItemWithUtilities {
  updateQuality = () => {
    this.changeQualityWithRate(1);
    this.enforceMinMaxAndAge();
  };
}

class SulfurasItem extends ItemWithUtilities {
  updateQuality = () => {};
}

class TicketItem extends ItemWithUtilities {
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
    this.enforceMinMaxAndAge();
  };
}

class ConjuredItem extends ItemWithUtilities {
  updateQuality = () => {
    this.changeQualityWithRate(-2);
    this.enforceMinMaxAndAge();
  };
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].updateQuality();
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
  ConjuredItem,
  Shop,
};
