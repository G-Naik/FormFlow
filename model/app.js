const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const contentModel = require("./content");
const { isURL } = require("validator");
const dotenv = require("dotenv")

dotenv.config();

const PORT = 9000


const app = express();



app.use(express.json());
app.use(cors());




mongoose.connect("mongodb://localhost:27017/CRUD").then(() => {
    console.log("Connection is made with DB");
});

app.get("/get-content", async (req, res) => {
    try {
        const contentData = await contentModel.find({});
        res.json(contentData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching content data" });
    }
});

app.post("/post-user", async (req, res) => {
    const { title, description, contentLink } = req.body;

    if (!title || !description || !contentLink) {
        return res.status(400).json({ message: "Fields are missing" });
    }

    // Check if contentLink is a valid URL
    if (!isURL(contentLink)) {
        return res.status(400).json({ message: "Invalid URL format for contentLink" });
    }

    const data = new contentModel({
        title: title,
        description: description,
        contentLink: contentLink,
    });

    try {
        await data.save();
        res.status(201).json({ message: "Content added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add content" });
    }
});

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
