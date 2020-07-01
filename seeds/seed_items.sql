TRUNCATE items;
TRUNCATE users;

INSERT INTO items (sku, name, description, cost, price, isactive, inventory) VALUES (
    'SKU-1', 'Item Name 1', 'Item Desc 1', 2.98, 4.95,TRUE, 1
),
(
    'SKU-2', 'Item Name 2', 'Item Desc 2', 1.43, 10.67,FALSE, 5
),
(
    'SKU-3', 'Item Name 3', 'Item Desc 3', 4.78, 4.95,TRUE, 3
),
(
    'SKU-4', 'Item Name 4', 'Item Desc 4', 100, 101.01,TRUE,0
);

INSERT INTO users (email, pwd, firstName, lastName) VALUES (
    'test1@email.com', 1234, 'First1', 'Last1'
),
(
    'test2@email.com', 2234, 'First2', 'Last2'
),
(
    'test3@email.com', 3234, 'First3', 'Last3'
);