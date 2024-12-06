const express = require("express");
const router = express.Router();
const protobuf = require("protobufjs");
const path = require("path");

router.get("/", async function (req, res) {
  try {
    const protoPath = path.join(__dirname, "../test.proto");
    console.log("Proto file path:", protoPath);

    const root = await protobuf.load(protoPath);
    const PersonMessage = root.lookupType("test.Person");
    
    const payload = { name: "june", age: 27 };
    const errMsg = PersonMessage.verify(payload);
    
    if (errMsg) {
      throw new Error(errMsg);
    }

    const message = PersonMessage.create(payload);
    const buffer = PersonMessage.encode(message).finish();
    
    res.set('Content-Type', 'application/x-protobuf');
    res.send(buffer);
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ 
      error: error.message,
      stack: error.stack 
    });
  }
});

module.exports = router;