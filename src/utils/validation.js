const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        throw new Error("All fields are required");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Invalid email format");
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error("Password must include at least 1 lowercase, 1 uppercase, 1 number, 1 special character and must be at least 8 characters long");
    }
}

module.exports = { validateSignUpData };