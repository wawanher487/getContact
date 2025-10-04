const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

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

//meload  contacts
const loadContact = () => {
  let contacts = [];
  try {
    const fileBuffer = fs.readFileSync("data/contacts.json", "utf8");
    if (fileBuffer) {
      contacts = JSON.parse(fileBuffer);
    }
  } catch (e) {
    contacts = [];
  }

  return contacts;
};

//menyimpan contact
const saveContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };

  // let contacts = [];
  // try {
  //   const fileBuffer = fs.readFileSync("data/contacts.json", "utf8");
  //   if (fileBuffer) {
  //     contacts = JSON.parse(fileBuffer);
  //   }
  // } catch (e) {
  //   contacts = [];
  // }
  const contacts = loadContact();

  //validasi duplicate nama
  const duplicateNama = contacts.find((contact) => contact.nama === nama);
  if (duplicateNama) {
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

//fungsi menampilkan contact
const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.inverse.bold(`Daftar kontak: `));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
  });
};

//detail contact
const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.bgBlack.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  console.log(chalk.cyan.inverse.bold(`Nama: ${contact.nama}`));
  console.log(`No HP: ${contact.noHP}`);
  console.log(`Email: ${contact.email}`);
};

//Hapus contact
const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.length === newContacts.length) {
    console.log(chalk.bgBlack.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));

  console.log(
    chalk.bgGreen.black.bold(`data contact ${nama} berhasil dihapus`)
  );
};

module.exports = {
  saveContact,
  listContact,
  detailContact,
  deleteContact,
};
