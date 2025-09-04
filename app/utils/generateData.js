const {
  WorkingDay: WorkingDay,
  Employee: Employee,
  Attendance: Attendance,
} = require("../../models");

const Sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");

function indonesia_hari(input) {
  switch (input) {
    case 0:
      return "Minggu";
    case 1:
      return "Senin";
    case 2:
      return "Selasa";
    case 3:
      return "Rabu";
    case 4:
      return "Kamis";
    case 5:
      return "Jum'at";
    case 6:
      return "Sabtu";
  }
}

function get_nama_bulan(input) {
  switch (input) {
    case 0:
      return "Januari";
    case 1:
      return "Februari";
    case 2:
      return "Maret";
    case 3:
      return "April";
    case 4:
      return "Mei";
    case 5:
      return "Juni";
    case 6:
      return "Juli";
    case 7:
      return "Agustus";
    case 8:
      return "September";
    case 9:
      return "Oktober";
    case 10:
      return "November";
    case 11:
      return "Desember";
  }
}

function get_bulan_angka(input) {
  switch (input) {
    case "Januari":
      return 0;
    case "Februari":
      return 1;
    case "Maret":
      return 2;
    case "April":
      return 3;
    case "Mei":
      return 4;
    case "Juni":
      return 5;
    case "Juli":
      return 6;
    case "Agustus":
      return 7;
    case "September":
      return 8;
    case "Oktober":
      return 9;
    case "November":
      return 10;
    case "Desember":
      return 11;
  }
}
const generate_polker = async (bulan, tahun) => {
  //const year = req.params.year;
  //const tahun = 2025;
  //const bulan = 7; //agustus

  var numOfDays = new Date(tahun, bulan + 1, 0).getDate(); //use 0 here and the actual month
  console.log(numOfDays);

  var list = [];
  for (var i = 0; i < numOfDays; i++) {
    var angka_hari = new Date(tahun, bulan, i + 1).getDay();
    var tgl = new Date(tahun, bulan, i + 1);
    list.push({
      uuid: uuidv4(),
      date: tgl,
      day_name: indonesia_hari(angka_hari),
    });
  }
  await WorkingDay.bulkCreate(list);
};

const generate_kehadiran = async (bulan, tahun, id) => {
  // var tahun = 2024;
  // var bulan = "Juli";
  const first = new Date(tahun, get_bulan_angka(bulan), 1).toLocaleString(
    "en-US",
    {
      timeZone: "Asia/Jakarta",
    }
  );
  const last = new Date(
    tahun,
    get_bulan_angka(bulan) + 1,
    0,
    23,
    59,
    59
  ).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  Employee.findAll({
    where: {
      employeeStatusId: 1,
      id: id,
    },
  })
    .then(async (data) => {
      //data.length
      var alldays = await WorkingDay.findAll({
        where: {
          date: {
            [Sequelize.Op.between]: [first, last],
          },
        },
        attributes: ["id"],
        order: [["date", "ASC"]],
      });
      var list_kehadiran = [];
      for (let k = 0; k < alldays.length; k++) {
        list_kehadiran.push({
          id: alldays[k].id,
        });
      }
      console.log(list_kehadiran.length);

      //data.length
      for (let i = 0; i < data.length; i++) {
        console.log(`read pegawai...${i}`);
        console.log(data[i].id, data[i].id);
        var list_keha = [];
        for (let j = 0; j < list_kehadiran.length; j++) {
          //console.log(list_kehadiran[j].jam_datang);
          var status = 9; //Alpha

          var keha = {
            uuid: uuidv4(),
            attendanceTypeId: status,
            employeeId: data[i].id,
            workingDayId: list_kehadiran[j].id,
            //presensiId: data.id,
          };
          list_keha.push(keha);
        }
        //console.log(list_keha);
        console.log(list_keha.length);
        await Attendance.bulkCreate(list_keha);

        //console.log(list_pendidikan);
        console.log(`done pegawai...${i}`);

        //await sleep(60 * 1000);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const generate_kehadiran_pegawai = async (bulan, tahun, id) => {
  // var tahun = 2024;
  // var bulan = "Juli";
  const first = new Date(tahun, get_bulan_angka(bulan), 1).toLocaleString(
    "en-US",
    {
      timeZone: "Asia/Jakarta",
    }
  );
  const last = new Date(
    tahun,
    get_bulan_angka(bulan) + 1,
    0,
    23,
    59,
    59
  ).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  Employee.findAll({
    where: {
      employeeStatusId: 1,
    },
  })
    .then(async (data) => {
      //data.length
      var alldays = await WorkingDay.findAll({
        where: {
          date: {
            [Sequelize.Op.between]: [first, last],
          },
        },
        attributes: ["id"],
        order: [["date", "ASC"]],
      });
      var list_kehadiran = [];
      for (let k = 0; k < alldays.length; k++) {
        list_kehadiran.push({
          id: alldays[k].id,
        });
      }
      console.log(list_kehadiran.length);

      //data.length
      for (let i = 0; i < data.length; i++) {
        console.log(`read pegawai...${i}`);
        console.log(data[i].id, data[i].id);
        var list_keha = [];
        for (let j = 0; j < list_kehadiran.length; j++) {
          //console.log(list_kehadiran[j].jam_datang);
          var status = 9; //Alpha

          var keha = {
            uuid: uuidv4(),
            attendanceTypeId: status,
            employeeId: data[i].id,
            workingDayId: list_kehadiran[j].id,
            //presensiId: data.id,
          };
          list_keha.push(keha);
        }
        //console.log(list_keha);
        console.log(list_keha.length);
        await Attendance.bulkCreate(list_keha);

        //console.log(list_pendidikan);
        console.log(`done pegawai...${i}`);

        //await sleep(60 * 1000);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  generate_polker,
  generate_kehadiran,
  generate_kehadiran_pegawai,
};
