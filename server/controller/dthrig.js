import mongoose from "mongoose";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import dthrig from "../model/dthrig.js";
import productparts from "../model/productpart.js";
import equiry from "../model/equiry.js";
import subscribe from "../model/Subscribe.js";
import contact from "../model/contact.js";

dotenv.config({ path: `./.env` });

const myemail = process.env.emailid;
const mypassword = process.env.emailpassword;

export const Dthrig = async (req, res) => {
    try {
        const dthrigdata = await dthrig.find();

        if (!dthrigdata) {
            return res.status(404).json({ msg: "user data not found" });
        }
        res.status(200).json(dthrigdata);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}

export const Dthdetails = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await dthrig.findById(id);

        if (!userExist) {
            return res.status(404).json({ msg: "user not found" });
        }
        res.status(200).json(userExist);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}

export const allproductparts = async (req, res) => {
    try {
        const dthrigdata = await productparts.find();

        if (!dthrigdata) {
            return res.status(404).json({ msg: "user data not found" });
        }
        res.status(200).json(dthrigdata);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}

export const oneproductpart = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await productparts.findById(id);

        if (!userExist) {
            return res.status(404).json({ msg: "user not found" });
        }
        res.status(200).json(userExist);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}

export const editenquiry = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await equiry.findById(id);
        if (!userExist) {
            return res.status(404).json({ msg: "user not found" });
        }

        const updatedData = await equiry.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ msg: "user updated successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}

export const oneenquiry = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await equiry.findById(id);

        if (!userExist) {
            return res.status(404).json({ msg: "user not found" });
        }
        res.status(200).json(userExist);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}

export const equiryusers = async (req, res) => {

    try {
        const userData = new equiry({
            _id: new mongoose.Types.ObjectId(),
            nameofproduct: req.body.dthname,
            name: req.body.name,
            Email: req.body.Email,
            PurposeofRequirement: req.body.PurposeofRequirement,
            RequirementDetails: req.body.RequirementDetails,

        });
        if (!userData) {
            return res.status(404).json({ msg: "user data not found" });
        }
        const savedData = await userData.save();
        res.status(200).json({ msg: "enquiry added successfully" });

        return new Promise((resolve, reject) => {

            const mail_configs = {
                from: myemail,
                to: req.body.Email,
                subject: "enquiry from user",
                html: `<div style="background-color: white;">
                <h1 style=" color: rgba(255, 193, 7, 1); font-weight: 1000;">
                    Thanks for Enquiring in Jay Agro Enginnering
                </h1>
                <h3 style="color: rgb(255, 193, 7);  font-weight: 700;">
                    Product Name: <span style="color: black; font-weight: 400;">`+ req.body.dthname + `</span>
                </h3>
                <h3 style="color: rgb(255, 193, 7);  font-weight: 700;">
                    Your Name: <span style="color: black; font-weight: 400;">`+ req.body.name + `</span>
                </h3>
                <h3 style="color: rgb(255, 193, 7);  font-weight: 700;">
                    Purpose of Requirement: <span style="color: black; font-weight: 400;">`+ req.body.PurposeofRequirement + `</span>
                </h3>
                <h3 style="color: rgb(255, 193, 7);  font-weight: 700;">
                    Requirement Details: <span style="color: black; font-weight: 400;">`+ req.body.RequirementDetails + `</span>
                </h3>
                <a href="https://jay-agro-server.onrender.com/editenquiry/`+ userData._id + `"  target='_self'>Edit your Enquiry </a>
            </div>`
            };
            transporter.sendMail(mail_configs, function (error, info) {
                if (error) {
                    return reject({ message: 'an error has occured' });
                }
                return resolve({ message: 'Email sent succesfuly' });
            });
        })
    }
    catch (error) {
        res.status(500).json({ error: error });
    }

};

export const subscribeusers = async (req, res) => {
    try {
        const userData = new subscribe({
            _id: new mongoose.Types.ObjectId(),
            Email: req.body.Email
        });
        if (!userData) {
            return res.status(404).json({ msg: "user data not found" });
        }
        const savedData = await userData.save();
        res.status(200).json({ msg: "subscribe added successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};

export const contactusers = async (req, res) => {
    try {
        const userData = new contact({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            Email: req.body.Email,
            number: req.body.number,
            subject: req.body.subject,
            message: req.body.message,
        });
        if (!userData) {
            return res.status(404).json({ msg: "user data not found" });
        }
        const savedData = await userData.save();
        res.status(200).json({ msg: "contact added successfully" });



        return new Promise((resolve, reject) => {

            const mail_configs = {
                from: myemail,
                to: req.body.Email,
                subject: req.body.username,
                html: `<div style="background-color: white;">
            <h1 style=" color: rgba(255, 193, 7, 1); font-weight: 1000;">
                Thanks for Contacting Jay Agro Enginnering
            </h1>
            <h3 style="color: rgb(255, 193, 7);  font-weight: 700;">
                Your Name: <span style="color: black; font-weight: 400;">`+ req.body.username + `</span>
            </h3>
            <h3 style="color: rgb(255, 193, 7);  font-weight: 700;">
                Your Number: <span style="color: black; font-weight: 400;">`+ req.body.number + `</span>
            </h3>
            <h3 style="color: rgb(255, 193, 7);  font-weight: 700;">
                Your Message: <span style="color: black; font-weight: 400;">`+ req.body.message + `</span>
            </h3>
            <h3 style="color: rgb(255, 193, 7);  font-weight: 700;">
                Your subject: <span style="color: black; font-weight: 400;">`+ req.body.subject + `</span>
            </h3>
            <a href="https://jay-agro-server.onrender.com/editcontact/`+ userData._id + `"  target='_self'>Edit your Contact </a>
            <h4>You can change your contact only for 1 day</h4>
        </div>`
            };


            transporter.sendMail(mail_configs, function (error, info) {
                if (error) {
                    return reject({ message: 'an error has occured' });
                }
                return resolve({ message: 'Email sent succesfuly' });
            });
        })

    }
    catch (error) {
        res.status(500).json({ error: error });
    }

};

export const onecontact = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await contact.findById(id);

        if (!userExist) {
            return res.status(404).json({ msg: "user not found" });
        }
        res.status(200).json(userExist);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}

export const editcontactusers = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await contact.findById(id);
        if (!userExist) {
            return res.status(404).json({ msg: "user not found" });
        }

        const updatedData = await contact.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ msg: "user updated successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: myemail,
        pass: mypassword,
    },
});

export const sendEmailOfenquiry = async (req, res) => {
    try {
        sendEmailforenquiry(req).then((response) => res.send(response.message))
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}

export const sendEmailOfcontact = async (req, res) => {
    try {
        sendEmailforcontact(req).then((response) => res.send(response.message))
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}
