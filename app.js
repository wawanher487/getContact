const { argv } = require("process");
const yargs = require("yargs");
const { saveContact } = require("./contacts");

yargs.command({
  command: "add",
  describe: "Menambahkan contact baru",
  builder: {
    name: {
      describe: "Isi Nama Lengkap",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "Untuk Mengisikan Email",
      demandOption: true,
      type: "string",
    },
    noHP: {
      describe: "Untuk Mengisikan No HandPhone",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    saveContact(argv.name, argv.email, argv.noHP);
  },
});

yargs.parse();
