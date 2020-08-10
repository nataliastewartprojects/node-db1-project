const express = require("express");

const knex = require("../data/dbConfig.js"); //<< rename the db

const router = express.Router();

//-----------GET accounts---------
router.get("/", (req, res) => {
  knex
    .select("*")
    .from("accounts")
    .then((accounts) => {
      res.status(200).json({ data: accounts });
    })
    .catch((error) => {
      console.log(`GET/error`, error);
      res.status(500).json({ message: error.message });
    });
});

//----------GET account BY ID-----//
router.get("/:id", (req, res) => {
  // select * from account where id = req.params.id
  knex
    .select("*")
    .from("accounts")
    .where({ id: req.params.id })
    .first()
    .then((account) => {
      res.status(200).json({ data: account });
    })
    .catch((error) => {
      console.log(`GET BY ID/error:`, error);
      res.status(500).json({ message: error.message });
    });
});

//---------POST / INSERT account---/
router.post("/", (req, res) => {
  knex("accounts")
    .insert(req.body)
    .then((account) => {
      res.status(201).json(account);
    })
    .catch((error) => {
      console.log("POST/INSERT/ error:", error);
      res.status(500).json({ message: error.message });
    });
});

//------PUT/UPDATE account -----//
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  knex("accounts")
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count >= 0) {
        res.status(200).json({ message: "account updated successfully" });
      } else {
        res.status(404).json({ message: "no account updated or found" });
      }
    })
    .catch((error) => {
      console.log("PUT / error", error);
    });
});

//----------DELETE account by ID----//
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  knex("accounts")
    .where({ id }) // if not using a where, all records will be removed
    .del() // <----- don't forget this part
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "account deleted successfully" });
      } else {
        res.status(404).json({ message: "no accounts found" });
      }
    })
    .catch((error) => {
      console.log("DELETE / error", error);
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
