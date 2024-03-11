const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/api/be2/some-api', (req, res) => {
  res.json({ "msg": "JSON from BE 2" })
})

app.listen(PORT, () => {
  console.log(`Server 2 is running on port ${PORT}`);
});
