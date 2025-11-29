const bcrypt = require("bcrypt");

/**
 * Hashes a plain text password using bcrypt.
 *
 * @param {string} password - The plain text password to hash.
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 */
const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

/**
 * Compares a plain text password with a hashed password.
 *
 * @param {string} password - The plain text password to compare.
 * @param {string} hashed - The hashed password to compare against.
 * @returns {Promise<boolean>} A promise that resolves to true if the passwords match, false otherwise.
 */
const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};

module.exports = {
  hashPassword,
  comparePassword,
};
