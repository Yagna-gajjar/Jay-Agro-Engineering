import express from "express";
import { Dthrig, Dthdetails, allproductparts, oneproductpart, equiryusers, subscribeusers, contactusers, onecontact, editcontactusers, editenquiry, oneenquiry } from "../controller/dthrig.js";

const route = express.Router();

route.get("/", (req, res) => {
    res.status(200).json("server started");
});
route.get("/dthrig", Dthrig);
route.get("/dthdetails/:id", Dthdetails);
route.get("/productparts", allproductparts);
route.get("/productparts/:id", oneproductpart);
route.post("/equiry", equiryusers);
route.post("/subscribe", subscribeusers);
route.post("/contact", contactusers);
route.get("/onecontactuser/:id", onecontact);
route.get("/oneenquiryuser/:id", oneenquiry);
route.put("/editcontactuser/:id", editcontactusers);
route.put("/editenquiryuser/:id", editenquiry);
route.get("/oneProductpart/:id", oneproductpart);

export default route;