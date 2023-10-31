const { default: axios } = require("axios");
const { writeObjectToJsonFile } = require("./service/export-json");
const { exportDataToCsv } = require("./service/export-csv");
const apiUrl = "https://rever.vn/s-ajax-v2";
const fs = require("fs");

const checkSum = {
  1: "f1b797b852bc5a1d3fef0dc3a20753c2",
  2: "7feebae920e347df849841cdd8787ef3",
  3: "512ecd03cd9a7c373ad59fc66367f77c",
  4: "9dc6570567203570d5f09434f3a3de0b",
  5: "5b31514ba7c037e3eb1fb96e18aec93c",
  6: "9c7f642815e343bfbfce3433453ec65d",
  7: "ff29fd9a54d7ee0ffc54c74359a7aa77",
  8: "087dd996e0a7e255fe3157c05f7b7c5a",
  9: "aa3906a0c4907a69d0486e62eb4fc507",
  10: "5cfc0f2a88be93a4ad16559ab9ee202b",
  11: "5cfc0f2a88be93a4ad16559ab9ee202b",
  12: "9a5bb707bbd91f7dee57730457be5ff3",
  13: "4467ecbf6806d98c508b9e03acaf6a1b",
  14: "a8554b0baa2ff21e9c6f6c8ff3bd945e",
  15: "a87d098bb25140811fa26360706838e1",
  16: "a9c04e6a57fa95593296a1797393f3b5",
  17: "ef6779ee840710acd9b35a2d71595f7c",
  18: "8ea44a56fb9120c3cd1c66a7dcbc1db8",
  19: "1ca16d9cb4b9046c5ce9c42b92bf639b",
  20: "26c7b91df551d9e51b40764e6f57769c",
  21: "b6bbc46a7ebb58c57ec0f5d30baeae39",
  22: "9d14367741e0ad68051721f8c19a9465",
  23: "8d9538994581cc8b86828bca8e242c18",
  24: "4f2ba05277d7bfb66a4a59df4a756281",
  25: "65fe96340636008a5ffc951269ea4046",
  26: "ae05fefdef19e7c652c29d5d5205ce12",
  27: "bf7eaf2c44c2c2e4e57f2bee80858084",
  28: "3426c119eb3a8eca32978218201a1ac3",
  29: "2d48e7e248539fcf78073255fe95e934",
};

const fetchDataFromApi = async (apiUrl, page, c) => {
  try {
    const requestData = {
      keyword: "ho-chi-minh",
      title: "Hồ Chí Minh",
      page: parseInt(page),
      size: 24,
      service_type: 2,
      search_mode: 10,
      view: "grid",
      property_type: [
        "1",
        "16",
        "34",
        "8",
        "9",
        "11",
        "32",
        "2",
        "4",
        "3",
        "12",
      ],
      city_id: "1576833711767_2408",
    };

    const requestHeaders = {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9,vi;q=0.8",
      "Content-Length": 216,
      c: `${c}`,
      "Content-Type": "application/json;charset=UTF-8",
    };

    const response = await axios.post(apiUrl, requestData, {
      headers: requestHeaders,
    });
    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const dataToJson = async () => {
  let i = 21;
  for (const key of Object.keys(checkSum)) {
    const c = checkSum[key];
    const filePath = `fetch-data/data${i}.json`;
    i++;
    await fetchDataFromApi(apiUrl, key, c)
      .then((data) => {
        writeObjectToJsonFile(data, filePath);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }
  console.log("success");
};

const dataToCSV = (csvFileName) => {
  const data = [];
  for (let i = 1; i <= 24; i++) {
    const filePath = `fetch-data/data${i}.json`;
    const temp = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    temp.data.map((i) => {
      const {
        url,
        thumbnail,
        title,
        name,
        address_origin,
        address,
        num_bed_room,
        num_bath_room,
        area,
        price,
      } = i;
      data.push({
        url,
        thumbnail,
        title,
        name,
        address_origin,
        address,
        num_bed_room,
        num_bath_room,
        area,
        price,
      });
    });
  }
  exportDataToCsv(data, csvFileName);
};
const main = () => {
  dataToJson();
  dataToCSV("data-can-ho.csv");
};
main();
