const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");
const { emit } = require("process");

//membuat folder data jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

//membuat file contacts.js jika belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf8");
}

const saveContact = (name, email, noHP) => {
  const contact = { name, email, noHP };

  let contacts = [];
  try {
    const fileBuffer = fs.readFileSync("data/contacts.json", "utf8");
    if (fileBuffer) {
      contacts = JSON.parse(fileBuffer);
    }
  } catch (e) {
    contacts = [];
  }

  //validasi duplicate name
  const duplicateName = contacts.find((contact) => contact.name === name);
  if (duplicateName) {
    console.log(
      chalk.bgRed.white.inverse.bold(
        "Contact Sudah Terdaftar, gunakan nama lain"
      )
    );
    return false;
  }

  //validasi duplicate email
  const duplicateEmail = contacts.find((contact) => contact.email === email);
  if (duplicateEmail) {
    console.log(
      chalk.bgRed.white.inverse.bold(
        "Contact Sudah Terdaftar, gunakan email lain"
      )
    );
    return false;
  }

  //validasi email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.bgRed.white.inverse.bold("Email tidak Valid"));
      return false;
    }
  }

  //validasi noHP
  if (noHP) {
    if (!validator.isMobilePhone(noHP, "id-ID")) {
      console.log(chalk.bgRed.white.inverse.bold("Nomor HP tidak Valid"));
      return false;
    }
  }

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log(chalk.bgGreen.bold("Thank You for Input Data"));
};

module.exports = {
  saveContact,
};
