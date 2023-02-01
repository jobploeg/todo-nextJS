migrate((db) => {
  const collection = new Collection({
    "id": "sxxzilcyl58e1rw",
    "created": "2023-01-24 09:40:20.973Z",
    "updated": "2023-01-24 09:40:20.973Z",
    "name": "todos",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pxtqmr1e",
        "name": "content",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("sxxzilcyl58e1rw");

  return dao.deleteCollection(collection);
})
