const fs = require("fs");

const writeObjectToJsonFile = (object, filePath) => {
  const jsonString = JSON.stringify(object, null, 2);

  fs.writeFileSync(filePath, jsonString, "utf-8", (err) => {
    if (err) {
      console.error("Error writing to JSON file:", err);
    } else {
      console.log("Object has been written to", filePath);
    }
  });
};

module.exports = { writeObjectToJsonFile };
