const express = require("express");
const app = express();
const port = 8008;
const axios = require("axios");
async function getNumbers(url) {
  try {
    const { data } = await axios.get(url);
    return data.numbers;
  } catch (error) {
    return [];
  }
  return [];
}
app.get("/numbers", async (req, res) => {
  const urlsQuery = req.query.url;
  let urls = [];
  if (typeof urlsQuery == typeof "") {
    urls.push(urlsQuery);
  } else {
    urls.push(...urlsQuery);
  }
  let numbers = [];
  for (let url of urls) {
    const num = await getNumbers(url);
    numbers.push(...num);
  }
  //   make unique and sort
  numbers = [...new Set(numbers)];
  console.log(numbers);
  numbers.sort((a, b) => a - b);
  console.log(numbers);
  res.json({ numbers });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
