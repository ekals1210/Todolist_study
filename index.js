const path = require('path');
const express = require('express')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public'))); // 프론트 페이지 보내주는 역할


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
