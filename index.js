const express = require("express");
const app = express();

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// members API Route
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Serving on port ${PORT}`));
