import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandlerFunc } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created !");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const CheckUser = await User.findOne({ email: email });
    if (!CheckUser) return next(errorHandlerFunc(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, CheckUser.password);
    if (!validPassword)
      return next(errorHandlerFunc(401, "Incorrect login information!"));
    const token = jwt.sign({ id: CheckUser._id }, process.env.JWT_SECRET); //created the token

    const { password: hashedPassword, ...rest } = CheckUser._doc; // returning everything except the password

    // save the access token as Cookie
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
