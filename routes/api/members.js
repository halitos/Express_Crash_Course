const express = require("express");
const router = express.Router();
const members = require("../../Members");
const uuid = require("uuid");

// Get all members
router.get("/", (req, res) => res.json(members));

// (GET) single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === Number(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === Number(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Create a member (POST)
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    age: req.body.age,
    status: "active",
  };

  if (!newMember.name || !newMember.age) {
    return res.status(400).json({ msg: "PLease include name and email" });
  }

  members.push(newMember);
  res.json(members);
});

// Update member (PUT)

router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === Number(req.params.id));

  if (found) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.age = updMember.age ? updMember.age : member.age;

        res.json({ msg: "member updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// DELETE member

router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === Number(req.params.id));
  if (found) {
    res.json({
      msg: "member deleted",
      members: members.filter((member) => member.id !== Number(req.params.id)),
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;
