const { argv } = require("process");
const yargs = require("yargs");
const { saveContact, listContact, detailContact, deleteContact } = require("./contacts");

yargs
  .command({
    command: "add",
    describe: "Menambahkan contact baru",
    builder: {
      nama: {
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
      saveContact(argv.nama, argv.email, argv.noHP);
    },
  })
  .demandCommand();

//Menampilkan daftar semua nama & no HP contact
yargs.command({
  command: "list",
  describe: "Menampilkan semua nama & no HP contact",
  handler() {
    listContact();
  },
});

//menampilkan detail sebuah contact
yargs.command({
  command: "detail",
  describe: "Menampilkan detail nama & no HP contact",
  builder: {
    nama: {
      describe: "Isi Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    detailContact(argv.nama);
  },
});

//menghapus contact berdasarkan nama
yargs.command({
  command: "delete",
  describe: "Menghapus sebuah contact berdasarkan nama",
  builder: {
    nama: {
      describe: "Isi Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
  },
});

yargs.parse();
