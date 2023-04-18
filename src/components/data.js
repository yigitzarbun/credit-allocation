export const unprocessedLoanRequests = [
  {
    customer_id: 1,
    fname: "Ahmet",
    lname: "Güneş",
    year_birth: 1980,
    sector: "Eğitim",
    occupation: "Yönetici",
    credit: 7.4,
  },
  {
    customer_id: 2,
    fname: "Mehmet",
    lname: "Ay",
    year_birth: 1970,
    sector: "Tarım",
    occupation: "Çiftçi",
    credit: 7.1,
  },
  {
    customer_id: 3,
    fname: "Ayşe",
    lname: "Kara",
    year_birth: 1985,
    sector: "Spor",
    occupation: "Sporcu",
    credit: 7.2,
  },
  {
    customer_id: 4,
    fname: "Fatma",
    lname: "Kuş",
    year_birth: 1990,
    sector: "Savunma",
    occupation: "Mühendis",
    credit: 7.5,
  },
];
export const processedLoanRequests = [
  {
    customer_id: 1,
    fname: "Ahmet",
    lname: "Güneş",
    year_birth: 1980,
    sector: "Eğitim",
    occupation: "Yönetici",
    credit: 7.4,
    feasible: "Evet",
  },
  {
    customer_id: 2,
    fname: "Mehmet",
    lname: "Ay",
    year_birth: 1970,
    sector: "Tarım",
    occupation: "Çiftçi",
    credit: 7.1,
    feasible: "Hayır",
  },
  {
    customer_id: 3,
    fname: "Ayşe",
    lname: "Kara",
    year_birth: 1985,
    sector: "Spor",
    occupation: "Sporcu",
    credit: 7.2,
    feasible: "Hayır",
  },
  {
    customer_id: 4,
    fname: "Fatma",
    lname: "Kuş",
    year_birth: 1990,
    sector: "Savunma",
    occupation: "Mühendis",
    credit: 7.5,
    feasible: "Evet",
  },
];

export const sectors = [
  {
    sector_id: 1,
    sector_name: "Eğitim",
  },
  {
    sector_id: 2,
    sector_name: "Sanayi",
  },
  {
    sector_id: 3,
    sector_name: "Tarım",
  },
  {
    sector_id: 4,
    sector_name: "Savunma",
  },
  {
    sector_id: 5,
    sector_name: "Eğlence",
  },
  {
    sector_id: 6,
    sector_name: "Sağlık",
  },
  {
    sector_id: 7,
    sector_name: "Teknoloji",
  },
];

export const occupations = [
  {
    occupation_id: 1,
    occupation_name: "Yönetici",
  },
  {
    occupation_id: 2,
    occupation_name: "Mühendis",
  },
  {
    occupation_id: 3,
    occupation_name: "Çiftçi",
  },
  {
    occupation_id: 4,
    occupation_name: "Sporcu",
  },
  {
    occupation_id: 5,
    occupation_name: "Memur",
  },
  {
    occupation_id: 6,
    occupation_name: "Girişimci",
  },
  {
    occupation_id: 7,
    occupation_name: "Mimar",
  },
];

export const employees = [
  {
    employee_id: 1,
    fname: "Ahmet",
    lname: "Güneş",
    email: "ahmetgunes@bank.com",
    department: "Kredi Tahsis",
    title: "Yönetici",
    access: true,
  },
  {
    employee_id: 2,
    fname: "Mehmet",
    lname: "Ay",
    email: "mehmetay@bank.com",
    department: "Kredi Tahsis",
    title: "Uzman",
    access: false,
  },
  {
    employee_id: 3,
    fname: "Ayşe",
    lname: "Kara",
    email: "aysekara@bank.com",
    department: "Kredi Tahsis",
    title: "Uzman",
    access: false,
  },
  {
    employee_id: 4,
    fname: "Fatma",
    lname: "Gül",
    email: "fatmagul@bank.com",
    department: "Kredi Tahsis",
    title: "Uzman Yrd.",
    access: false,
  },
];
