//function formatDate(dateString) {
//  const [day, month, year] = dateString.split("-");
//  return `${year}-${month}-${day}`;
//}

//function formatDateSlash(dateString) {
//  const [day, month, year] = dateString.split("/");
//  return `${year}-${month}-${day}`;
//}

const formatDate = (dateString) => {
  const [day, month, year] = dateString.split("-");
  return `${year}-${month}-${day}`;
};

const formatDateSlash = (dateString) => {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
};

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

function getDateTime() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  if (month.toString().length == 1) {
    month = "0" + month;
  }
  if (day.toString().length == 1) {
    day = "0" + day;
  }
  if (hour.toString().length == 1) {
    hour = "0" + hour;
  }
  if (minute.toString().length == 1) {
    minute = "0" + minute;
  }
  if (second.toString().length == 1) {
    second = "0" + second;
  }
  var dateTime =
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  return dateTime;
}

function formatToWIB(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

module.exports = {
  formatDate,
  formatDateSlash,
  get_nama_bulan,
  get_bulan_angka,
  getDateTime,
};
