require("dotenv").config();
const mongoose = require("mongoose");
const Policy = require("./models/Policy");

const policies = [
  {
    policyNumber: "POL1001",
    customerName: "John Smith",
    email: "john.smith@example.com",
    vehicleType: "Car",
    vehicleYear: 2020,
    premiumAmount: 15000,
    status: "active",
    createdAt: new Date("2024-01-10")
  },
  {
    policyNumber: "POL1002",
    customerName: "Michael Brown",
    email: "michael.brown@example.com",
    vehicleType: "Bike",
    vehicleYear: 2018,
    premiumAmount: 8000,
    status: "pending",
    createdAt: new Date("2024-01-15")
  },
  {
    policyNumber: "POL1003",
    customerName: "David Wilson",
    email: "david.wilson@example.com",
    vehicleType: "Truck",
    vehicleYear: 2016,
    premiumAmount: 22000,
    status: "expired",
    createdAt: new Date("2024-02-01")
  },
  {
    policyNumber: "POL1004",
    customerName: "James Anderson",
    email: "james.anderson@example.com",
    vehicleType: "SUV",
    vehicleYear: 2021,
    premiumAmount: 18000,
    status: "active",
    createdAt: new Date("2024-02-05")
  },
  {
    policyNumber: "POL1005",
    customerName: "Robert Thomas",
    email: "robert.thomas@example.com",
    vehicleType: "Car",
    vehicleYear: 2019,
    premiumAmount: 14000,
    status: "pending",
    createdAt: new Date("2024-02-12")
  },
  {
    policyNumber: "POL1006",
    customerName: "William Jackson",
    email: "william.jackson@example.com",
    vehicleType: "Bike",
    vehicleYear: 2017,
    premiumAmount: 7000,
    status: "expired",
    createdAt: new Date("2024-02-18")
  },
  {
    policyNumber: "POL1007",
    customerName: "Richard White",
    email: "richard.white@example.com",
    vehicleType: "Truck",
    vehicleYear: 2015,
    premiumAmount: 25000,
    status: "active",
    createdAt: new Date("2024-03-02")
  },
  {
    policyNumber: "POL1008",
    customerName: "Joseph Harris",
    email: "joseph.harris@example.com",
    vehicleType: "SUV",
    vehicleYear: 2022,
    premiumAmount: 20000,
    status: "pending",
    createdAt: new Date("2024-03-08")
  },
  {
    policyNumber: "POL1009",
    customerName: "Thomas Martin",
    email: "thomas.martin@example.com",
    vehicleType: "Car",
    vehicleYear: 2014,
    premiumAmount: 12000,
    status: "expired",
    createdAt: new Date("2024-03-14")
  },
  {
    policyNumber: "POL1010",
    customerName: "Christopher Lee",
    email: "christopher.lee@example.com",
    vehicleType: "Bike",
    vehicleYear: 2023,
    premiumAmount: 9500,
    status: "active",
    createdAt: new Date("2024-03-20")
  },

  // 40 more entries below with realistic variation

  ...Array.from({ length: 40 }, (_, i) => {
    const id = 1011 + i;
    const names = [
      "Daniel Young","Matthew Hall","Anthony Allen","Mark Wright","Donald Scott",
      "Steven Green","Paul Adams","Andrew Baker","Joshua Nelson","Kevin Carter",
      "Brian Mitchell","George Perez","Edward Roberts","Ronald Turner","Timothy Phillips",
      "Jason Campbell","Jeffrey Parker","Ryan Evans","Jacob Edwards","Gary Collins",
      "Nicholas Stewart","Eric Sanchez","Stephen Morris","Jonathan Rogers","Larry Reed",
      "Justin Cook","Scott Morgan","Brandon Bell","Benjamin Murphy","Samuel Bailey",
      "Frank Rivera","Gregory Cooper","Raymond Richardson","Alexander Cox","Patrick Howard",
      "Jack Ward","Dennis Torres","Jerry Peterson","Tyler Gray","Aaron Ramirez"
    ];

    const vehicleTypes = ["Car", "Bike", "Truck", "SUV"];
    const statuses = ["active", "pending", "expired"];

    return {
      policyNumber: `POL${id}`,
      customerName: names[i],
      email: names[i].toLowerCase().replace(" ", ".") + "@example.com",
      vehicleType: vehicleTypes[i % 4],
      vehicleYear: 2015 + (i % 10),
      premiumAmount: 8000 + (i * 500),
      status: statuses[i % 3],
      createdAt: new Date(`2024-04-${(i % 28) + 1}`)
    };
  })
];


const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    // Optional: Clear old data
    await Policy.deleteMany();

    await Policy.insertMany(policies);

    console.log("Data Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
