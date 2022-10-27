const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", () => {
  it("returns a list of items", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items.length).toBe(1);
    expect(items[0].name).toBe("foo");
  });

  it("works on day 1 (1 update) the same as on legacy code", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),

      // This Conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6),
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
        "Backstage passes to a TAFKAL80ETC concert, 4, 50" +
        "Conjured Mana Cake, 2, 5"
    );
  });
});
