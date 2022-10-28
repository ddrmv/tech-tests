# Gilded rose tech test

This is a well known kata developed by [Terry Hughes](http://iamnotmyself.com/2011/02/13/refactor-this-the-gilded-rose-kata/). This is commonly used as a tech test to assess a candidate's ability to read, refactor and extend legacy code.

Here is the text of the kata:

\*"Hi and welcome to team Gilded Rose. As you know, we are a small inn with a prime location in a prominent city run by a friendly innkeeper named Allison. We also buy and sell only the finest goods. Unfortunately, our goods are constantly degrading in quality as they approach their sell by date. We have a system in place that updates our inventory for us. It was developed by a no-nonsense type named Leeroy, who has moved on to new adventures. Your task is to add the new feature to our system so that we can begin selling a new category of items. First an introduction to our system:

All items have a `SellIn` value which denotes the number of days we have to sell the item. All items have a Quality value which denotes how valuable the item is. At the end of each day our system lowers both values for every item. Pretty simple, right? Well this is where it gets interesting:

- Once the sell by date has passed, Quality degrades twice as fast
- The Quality of an item is never negative
- “Aged Brie” actually increases in Quality the older it gets
- The Quality of an item is never more than 50
- “Sulfuras”, being a legendary item, never has to be sold or decreases in Quality
- “Backstage passes”, like aged brie, increases in Quality as it’s `SellIn` value approaches; Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but Quality drops to 0 after the concert

We have recently signed a supplier of conjured items. This requires an update to our system:

- “Conjured” items degrade in Quality twice as fast as normal items

Feel free to make any changes to the `UpdateQuality` method and add any new code as long as everything still works correctly. However, do not alter the Item class or Items property as those belong to the goblin in the corner who will insta-rage and one-shot you as he doesn’t believe in shared code ownership (you can make the `UpdateQuality` method and Items property static if you like, we’ll cover for you)."\*

## The brief:

Choose [legacy code](https://github.com/emilybache/GildedRose-Refactoring-Kata) (translated by Emily Bache) in the language of your choice. The aim is to practice good design in the language of your choice. Refactor the code in such a way that adding the new "conjured" functionality is easy.

You don't need to clone the repo if you don't want to. Feel free to copy [the ruby code](https://github.com/emilybache/GildedRose-Refactoring-Kata/blob/main/ruby/gilded_rose.rb) into a new folder and write your tests from scratch.

HINT: Test first FTW!

## Legacy code from emilybache/GildedRose-Refactoring-Kata

```
Initial code taken from, then modified:
https://github.com/emilybache/GildedRose-Refactoring-Kata
```

## Gilded Rose

This is the Gilded Rose kata in JavaScript with Jest

## Getting started

Install dependencies

```sh
npm install
```

To run all tests

```sh
npm test
```

To run all tests in watch mode

```sh
npm run test:watch
```

To generate test coverage report

```sh
npm run test:coverage
```

## Refactor process

The main goal of the refactor was to test drive any changes to the code.

The first step was installing the legacy code, followed by applying standard
code formatting by Prettier and installing and running eslint.

After using the automatic formatting tools was the start of organising the
code in more sensible abstractions. In order to ensure the code doesn't break,
the texttest_fixture was used to create example output after one update and
that was converted to a jest test.

Next, after writing some tests for standard items, the Item class was extended
with polymorphism. This allowed to keep the unique update logic within the
item it was associated with. The approach to gradually replace the logic used
for each type of item. This was done by checking if it belonged to the new
class and using the refactored code for it, skipping the legacy update code for
that iteration.

After the standard item, other item types were abstracted one by one. The basic
case was implemented for each of them, then more test were added for special
cases: after expiry, on expiry.

Once all classes were implemented, further tests were added to ensure all of
them work correctly. Then the legacy code was removed. This was the first
refactor iteration.

Once the new overall abstraction structure was implemented the code could be
further and more easily improved. More functions were abstracted to avoid
repetition, some better names were selected, an intermediary ItemWithUtilities
class was created to allow for common actions on items to be contained in it
without altering the Item class itself.

After the legacy code refactor adding the new feature was very straightforward.
