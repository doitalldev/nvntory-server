const items = [
  {
    sku: 'sku1',
    name: 'name1',
    description: 'description1',
    price: 1,
    cost: 1,
    inventory: 1,
  },
  {
    sku: 'sku2',
    name: 'name2',
    description: 'description2',
    price: 2,
    cost: 2,
    inventory: 2,
  },
  {
    sku: 'sku3',
    name: 'name3',
    description: 'description3',
    price: 3,
    cost: 3,
    inventory: 3,
  },
];

function cleanUpTables(db) {
  return db.raw(
    `TRUNCATE
      items
      RESTART IDENTITY CASCADE`
  );
}
function seedItems(db, items) {
  return db.into('items').insert(items);
}

module.exports = {
  items,
  seedItems,
  cleanUpTables,
};
