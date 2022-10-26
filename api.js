const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = 3000;

app.get("/profile-data", (req, res) => {
  setTimeout(() => {
    res.send({
      birth_date: "1995-01-01",
      favorite_dog_ids: [],
      first_name: "John",
      last_name: "Doe",
      gender: "male",
    });
  }, 2000);
});

app.put("/set-favorite", (req, res) => {
  setTimeout(() => {
    res.send();
  }, 2000);
});

app.get("/dogs", (req, res) => {
  setTimeout(() => {
    res.send([
      {
        id: "1",
        img_src: "/assets/images/beagle.jpg",
        name: "Beagle",
      },
      {
        id: "2",
        img_src: "/assets/images/mastiff.jpg",
        name: "Mastiff",
      },
      {
        id: "3",
        img_src: "/assets/images/pug.jpg",
        name: "Pug",
      },
      {
        id: "4",
        img_src: "/assets/images/shiba-inu.jpg",
        name: "Shiba inu",
      },
    ]);
  }, 2000);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
