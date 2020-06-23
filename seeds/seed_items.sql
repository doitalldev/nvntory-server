INSERT INTO items (itemSKU, itemName, itemDesc, itemCost, itemPrice) VALUES (
    'SKU-1', 'Item Name 1', 'Item Desc 1', 2.98, 4.95
),
(
    'SKU-2', 'Item Name 2', 'Item Desc 2', 1.43, 10.67
),
(
    'SKU-3', 'Item Name 3', 'Item Desc 3', 4.78, 4.95
),
(
    'SKU-4', 'Item Name 4', 'Item Desc 4', 100, 101.01
);

INSERT INTO users (email, pwd, firstName, lastName, items) VALUES (
    'test1@email.com', 1234, 'First1', 'Last1', 1
)