const UserModel = require("../model/user");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "hajselems@gmail.com",
    pass: "your-email-password",
  },
});


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send("user not found");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send("invalid password");
    }
    const token = jwt.sign({ _id: user._id }, "!azertyuiop@123456789");
    res.send({ token: token, role: user.role });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Create and Save a new user
exports.create = [
  // Validate and sanitize fields.
  body("email").isEmail().withMessage("Email must be valid").normalizeEmail(),
  body("firstName")
    .notEmpty()
    .withMessage("First name cannot be empty")
    .trim()
    .escape(),
  body("lastName")
    .notEmpty()
    .withMessage("Last name cannot be empty")
    .trim()
    .escape(),
  body("phone")
    .notEmpty()
    .withMessage("Phone number cannot be empty")
    .isMobilePhone()
    .withMessage("Phone number must be valid")
    .trim()
    .escape(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const validationToken = crypto.randomBytes(32).toString("hex");

    const user = new UserModel({
      email: req.body.email,
      firstName: req.body.firstName,
      password: req.body.password,
      lastName: req.body.lastName,
      phone: req.body.phone,
      gouvernerat: req.body.gouvernerat,
      age: req.body.age,
      genre: req.body.genre,
      validationToken: validationToken,
      isValidated: false,
    });

    await user
      .save()
      .then(async (data) => {
        res.send({
          message: "User created successfully!!",
          user: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating user",
        });
      });
  },
];

exports.validateEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send({ message: "Invalid validation token." });
  }

  try {
    const user = await UserModel.findOne({ validationToken: token });

    if (!user) {
      return res.status(400).send({ message: "Invalid validation token." });
    }

    user.isValidated = true;
    user.validationToken = null;
    await user.save();

    res.send({ message: "Email validated successfully!" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while validating the email.",
    });
  }
};

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a user by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  console.log(id)
  await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User not found.`,
        });
      } else {
        res.send({ message: "User updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
  try {
    const data = await UserModel.findOneAndDelete({ _id: req.params.id });
    if (!data) {
      return res.status(404).send({
        message: `User not found.`,
      });
    }
    res.send({
      message: "User deleted successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while deleting the user.",
    });
  }
};
exports.forgotPassword = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.ex.com",
      port: 587,
      secure: false,
      auth: {
        user: "gaddour000@ex.com",
        pass: "test",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      to: user.email,
      from: "mbarek.abdelkader1996@gmail.com",
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      http://${req.headers.host}/reset/${resetToken}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: "Error sending email" });
      }
      res.status(200).send({ message: "Reset password email sent" });
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .send({ message: "Password reset token is invalid or has expired" });
    }

    if (!req.body.password) {
      return res.status(400).send({ message: "New password is required" });
    }

    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.status(200).send({ message: "Password has been reset" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getNumberOfUsersByGouvernerat = async (req, res) => {
  try {
    const result = await UserModel.aggregate([
      {
        $group: {
          _id: "$gouvernerat",
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(result);
  } catch (error) {
    console.error("Error fetching number of users by gouvernerat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getNumberOfUsersByGenre =  async (req, res) => {
  try {
    const result = await UserModel.getNumberOfUsersByGenre();
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
}
exports.getNumberOfUsersByAge =  async (req, res) => {
  try {
    const result = await UserModel.getNumberOfUsersByAge();
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
}
