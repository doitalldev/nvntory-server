const ItemsService = {
  getAllItems(knex) {
    return knex.select('*').from('items');
  },
  insertItem(knex, newItem) {
    return knex
      .insert(newItem)
      .into('items')
      .returning('*')
      .then((rows) => {
        return rows[0];
      });
  },
  getItemById(knex, id) {
    return knex.from('items').select('*').where('id', id).first();
  },
  deleteItem(knex, id) {
    return knex('items').where({ id }).delete();
  },
  updateItem(knex, id, newItem) {
    return knex('items').select('*').where({ id }).update(newItem);
  },
};

module.exports = ItemsService;
