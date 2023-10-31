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
  { id: "description", title: "Description" },
  { id: "has_media", title: "Has Media" },
  { id: "featured", title: "Featured" },
  { id: "market_center", title: "Market Center" },
  { id: "paymentCurrency", title: "Payment Currency" },
  { id: "property_type", title: "Property Type" },
  { id: "contact_stage", title: "Contact Stage" },
  { id: "furniture", title: "Furniture" },
  { id: "lease_end_date_formatted", title: "Lease End Date" },
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
