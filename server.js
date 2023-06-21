const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = 5000
app.use(express.json())

const Contact = require("./models/contactSchema")

// database connect
mongoose.connect("mongodb+srv://arfaouibechir43:Bechir2000@cluster0.8jglmto.mongodb.net/test_ws?retryWrites=true&w=majority")
.then(() => console.log("connected Database"))
.catch((err) => console.log(err))


app.post("/add", async (req, res) => {
    try {
        const newContact = new Contact(req.body)
        await newContact.save()
        res.status(201).json({msg: "success", contact: newContact })
    } catch (err) {
        res.status(500).json({msg: "something went wrong", error: err.message })

    }
})


app.get("/contacts", async (req, res) => {
    try {
        const newContact = await Contact.find()
        res.status(201).json({msg: "success", contact: newContact })
    } catch (err) {
        res.status(500).json({msg: "something went wrong", error: err.message })

    }
})

app.delete("/delete/:id", async (req, res) => {
    try {
        const newContact = await Contact.findByIdAndDelete({_id: req.params.id})
        res.status(200).json({msg: "success", contact: newContact })
    } catch (err) {
        res.status(500).json({msg: "something went wrong", error: err.message })

    }
})



app.put("/update/:id", async (req, res) => {
    try {
        const newContact = await Contact.findByIdAndUpdate({_id: req.params.id}, req.body)
        res.status(200).json({msg: "success", contact: {...newContact._doc , ...req.body} })
    } catch (err) {
        res.status(500).json({msg: "something went wrong", error: err.message })

    }
})

app.listen(port)