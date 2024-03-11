const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/be1/some-api', (req, res) => {
  res.json({ "msg": "JSON from BE 1" })
})

app.get('/bypass-gw', (req, res) => {
  res.json({ "msg": "Bypassed Gateway" })
})

app.listen(PORT, () => {
  console.log(`Server 1 is running on port ${PORT}`);
});
