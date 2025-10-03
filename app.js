const { writeQuestion, saveContact } = require("./contacts");

const main = async () => {
  const name = await writeQuestion("Input Your Name: ");
  const email = await writeQuestion("Input Your Email: ");
  const noHP = await writeQuestion("Input Your NoHP: ");

  saveContact(name, email, noHP);
};

//memanggil function
main();
