const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const headers = [
  { id: "url", title: "URL" },
  { id: "thumbnail", title: "Thumbnail" },
  { id: "title", title: "Title" },
  { id: "name", title: "Name" },
  { id: "address_origin", title: "Address Origin" },
  { id: "address", title: "Address" },
  { id: "num_bed_room", title: "Number of Bedrooms" },
  { id: "num_bath_room", title: "Number of Bathrooms" },
  { id: "area", title: "Area" },
  { id: "price", title: "Price" },
];
const exportDataToCsv = async (data, csvFileName) => {
  try {
    const csvWriter = createCsvWriter({
      path: csvFileName,
      header: headers,
    });

    await csvWriter.writeRecords(data);
    console.log(`Data exported to ${csvFileName}`);
  } catch (error) {
    console.error("Error exporting data to CSV:", error);
    throw error;
  }
};

module.exports = { exportDataToCsv };
