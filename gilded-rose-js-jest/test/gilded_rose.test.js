const {
  Item,
  StandardItem,
  CheeseItem,
  SulfurasItem,
  TicketItem,
  Shop,
} = require("../src/gilded_rose");

describe("Gilded Rose", () => {
  it("returns an empty list if empty", () => {
    const gildedRose = new Shop();
    const items = gildedRose.updateQuality();
    expect(items).toEqual([]);
  });

  // it("throws error if passed sellIn is not an integer", () => {

  // });

  it("returns a list of items", () => {
    const gildedRose = new Shop([new StandardItem("item name", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items.length).toBe(1);
    expect(items[0].name).toBe("item name");
  });

  it("decreases stanard item quality by one if not expired", () => {
    const newItem = new StandardItem("standard item", 10, 20);
    const shop = new Shop([newItem]);
    const items = shop.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(19);
  });

  it("decreases stanard item quality by two if expired", () => {
    const newItem = new StandardItem("standard item", -1, 10);
    const shop = new Shop([newItem]);
    const items = shop.updateQuality();
    expect(items[0].sellIn).toBe(-2);
    expect(items[0].quality).toBe(8);
  });

  it("decreases stanard item quality by two if expired but not below 0", () => {
    const newItem = new StandardItem("standard item", -1, 1);
    const shop = new Shop([newItem]);
    const items = shop.updateQuality();
    expect(items[0].sellIn).toBe(-2);
    expect(items[0].quality).toBe(0);
  });

  it("increases cheese item quality by one if not expired", () => {
    const newItem = new CheeseItem("some cheese", 10, 20);
    const shop = new Shop([newItem]);
    const items = shop.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(21);
  });

  it("increases cheese item quality by two if expired", () => {
    const newItem = new CheeseItem("some cheese", -10, 20);
    const shop = new Shop([newItem]);
    const items = shop.updateQuality();
    expect(items[0].sellIn).toBe(-11);
    expect(items[0].quality).toBe(22);
  });

  it("increases cheese item quality by two if expired but not above 50", () => {
    const newItem = new CheeseItem("some cheese", -10, 49);
    const shop = new Shop([newItem]);
    const items = shop.updateQuality();
    expect(items[0].sellIn).toBe(-11);
    expect(items[0].quality).toBe(50);
  });

  it("increases ticket quality by 1 when 11 days or more", () => {
    const newItem = new TicketItem("ticket", 12, 20);
    const shop = new Shop([newItem]);
    shop.updateQuality();
    const items = shop.updateQuality();
    expect(items[0].sellIn).toBe(10);
    expect(items[0].quality).toBe(22);
  });

  it("increases ticket quality by 2 when between 10 and 6 days", () => {
    const newItem = new TicketItem("ticket", 10, 20);
    const shop = new Shop([newItem]);
    shop.updateQuality();
    shop.updateQuality();
    shop.updateQuality();
    shop.updateQuality();
    const items = shop.updateQuality();
    expect(items[0].sellIn).toBe(5);
    expect(items[0].quality).toBe(30);
  });

  it("increases ticket quality but not over 50", () => {
    const newItem = new TicketItem("ticket", 3, 49);
    const shop = new Shop([newItem]);
    const items = shop.updateQuality();
    expect(items[0].sellIn).toBe(2);
    expect(items[0].quality).toBe(50);
  });

  it("drops ticket quality to zero on expiry", () => {
    const newItem = new TicketItem("ticket", 0, 50);
    const shop = new Shop([newItem]);
    const items = shop.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });

  it("works on day 1 (1 update) the same as on legacy code", () => {
    const items = [
      new StandardItem("+5 Dexterity Vest", 10, 20),
      new CheeseItem("Aged Brie", 2, 0),
      new StandardItem("Elixir of the Mongoose", 5, 7),
      new SulfurasItem("Sulfuras, Hand of Ragnaros", 0, 80),
      new SulfurasItem("Sulfuras, Hand of Ragnaros", -1, 80),
      new TicketItem("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new TicketItem("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new TicketItem("Backstage passes to a TAFKAL80ETC concert", 5, 49),

      // This Conjured item does not work properly yet
      // new Item("Conjured Mana Cake", 3, 6),
    ];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    result = "";
    result += `-------- day 1 --------`;
    result += "name, sellIn, quality";
    items.forEach(
      (item) => (result += `${item.name}, ${item.sellIn}, ${item.quality}`)
    );
    expect(result).toEqual(
      "-------- day 1 --------" +
        "name, sellIn, quality" +
        "+5 Dexterity Vest, 9, 19" +
        "Aged Brie, 1, 1" +
        "Elixir of the Mongoose, 4, 6" +
        "Sulfuras, Hand of Ragnaros, 0, 80" +
        "Sulfuras, Hand of Ragnaros, -1, 80" +
        "Backstage passes to a TAFKAL80ETC concert, 14, 21" +
        "Backstage passes to a TAFKAL80ETC concert, 9, 50" +
        "Backstage passes to a TAFKAL80ETC concert, 4, 50"
      // "Conjured Mana Cake, 2, 5"
    );
  });
});
