import express from "express";
import cors from "cors";
import connectDB from "./connection.js";
import Products from "./model/productSchema.js";
import AllCategories from "./model/categorySchema.js";
import Users from "./model/userSchema.js";
import bcrypt from "bcrypt";
import router from "./routes/paymentRoutes.js";
import dotenv from "dotenv";
import Razorpay from "razorpay";
dotenv.config();

const app = express();
const port = 8080;

const myCors = {
  origin: "http://localhost:3000",
  methods: "GET, POST",
  credentials: true, // enable passing of cookies, authentication headers, etc.
};

//Connect with the MongoDB Database
connectDB();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors(myCors));

//Routes
app.use("/api",router);

//Razorpay payment gateway integration
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

app.get('/api/getkey',  (req, res) => {
    try {
        const key = {key: process.env.RAZORPAY_API_KEY}
        res.status(200).json(key);
    } catch (error) {
        res.status(500).send(error.message)
    }
});

//Get All products from the Database
app.get("/allproduct", async (request, response) => {
  const result = await Products.find({});
  response.json(result);
});

//Get All Categories from the Database
app.get("/category", async (request, response) => {
  const categories = await AllCategories.find({});

  response.json(categories);
});

//Get Products of specific category (Work State:- Pending)
app.get("/category/:cat", async (request, response) => {
  const gotCat = request.params.cat;

  try {
    const products = await Products.find({
      category: { $regex: new RegExp(`^${gotCat}$`, "i") },
    });
    response.json(products);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

//Get specific product based on the id
app.get("/product/:id", async (request, response) => {
  const getId = parseInt(request.params.id);

  const getProduct = await Products.findOne({ id: getId });

  response.json(getProduct);
});

//Registration Form

app.post("/user/register", async (request, response) => {
  const { email, password } = request.body;

  try {
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new Users({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    response.status(200).json(" Registration Done"); // Respond with the saved user data
  } catch (error) {
    console.error("Registration failed:", error.message);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

//Login Form
app.post("/user/login", async (request, response) => {
  const { email, password } = request.body;

  try {
    const existingUser = await Users.findOne({ email });

    if (!existingUser) {
      return response.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return response.status(401).json({ error: "Invalid password" });
    }

    response.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Registration failed:", error.message);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
