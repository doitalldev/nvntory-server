CREATE TABLE items (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    itemSKU TEXT NOT NULL,
    itemName TEXT NOT NULL,
    itemDesc TEXT NOT NULL,
    itemCost MONEY NOT NULL,
    itemPrice MONEY NOT NULL,
    itemModified TIMESTAMPTZ NOT NULL DEFAULT now(),
);