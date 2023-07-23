const PORT = process.env.PORT || 8000

const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || '12345678'
const DB_NAME = process.env.DB_NAME || 'usersdb'
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio');
var mysql = require('mysql2');
const app = express();
// const mysql = msq()


const hostname = "localhost",
    username = "root",
    password = "12345678",
    databsename = "BankDatabase"


// Establish connection to the database
// let con =  mysql.createConnection({
//     host: hostname,
//     user: username,
//     port :PORT,
//     password: password,
//     database: databsename,
// });
var con = mysql.createConnection({
    host: 'containers-us-west-135.railway.app',
    user: 'root',
    password: 'yAhGf57qQ8DiEPr5lzl5',
    port:'7297',
    database: "railway"
});


con.connect(function (err) {
    console.log("Try to connect")
    if (err) {
        console.log("Error ", err)
        throw err
    };
    console.log("Connected");
    let databaseName = "BankDatabase";
    // let createQuery = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;
    // con.query(createQuery, (err) => {
    //     if (err) throw err;

    //     console.log("Database Created Successfully !");


    // })
    // con.query("DROP TABLE BankInfo", (err, drop) => {
    //   if (err)
    //     console.log("ERROR: ", err);
        
    //     console.log("Table Dropped !");

    // });
  
    var createStatament =
        "CREATE TABLE IF NOT EXISTS BankInfo (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255),icon VARCHAR(1000),mobileBalance VARCHAR(255),callRequiredForbalance boolean DEFAULT false,smsTemplate VARCHAR(255),mobileMiniStatement VARCHAR(500),type VARCHAR(255),isPopular boolean DEFAULT false,CallRequiredForMiniStatement boolean DEFAULT false,customerCareNumber VARCHAR(255),twitter VARCHAR(255),email VARCHAR(255),headQuarters VARCHAR(255),founded VARCHAR(255),website VARCHAR(500),code VARCHAR(500),netbanking VARCHAR(1000),fdrates VARCHAR(1000))"

    // Creating table "sample"
    con.query(createStatament, (err, drop) => {
        if (err)
            console.log("ERROR: ", err);
         
            console.log("Table Created !");
    });
    //




});





const fileName = "IFSC_2021.csv";

// csv().fromFile(fileName).then(source => {

//   console.log(
//     "Runing");
//     // Fetching the data from each row 
//     // and inserting to the table "sample"
//     for (var i = 0; i < source.length; i++) {
//           var BANK = source[i]["BANK"],
//             IFSC = source[i]["IFSC"],
//             BRANCH = source[i]["BRANCH"],
//             CENTRE = source[i]["CENTRE"],
//             DISTRICT = source[i]["DISTRICT"],
//             STATE = source[i]["STATE"],
//             ADDRESS = source[i]["ADDRESS"],
//             CONTACT = source[i]["CONTACT"],
//             IMPS = source[i]["IMPS"],
//             RTGS = source[i]["RTGS"],
//             CITY = source[i]["CITY"],
//             ISO3166 = source[i]["ISO3166"],
//             NEFT = source[i]["NEFT"],
//             MICR = source[i]["MICR"],
//             UPI = source[i]["UPI"],
//             SWIFT = source[i]["SWIFT"]


//         var insertStatement = 
//         `INSERT INTO IFSC_DATA values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
//         var items = [BANK,IFSC,BRANCH,CENTRE,DISTRICT,STATE,ADDRESS,CONTACT,IMPS,RTGS,CITY,ISO3166,NEFT,MICR,UPI,SWIFT];

//         // Inserting data of current row
//         // into database
//     //     con.query(insertStatement, items, 
//     //         (err, results, fields) => {
//     //         if (err) {
//     //             console.log(
//     // "Unable to insert item at row ", i + 1);
//     //             return console.log(err);
//     //         }
//     //     });
//     }
//     console.log(
// "All items stored into database successfully");
// });


//Url For Web-Scrapping
const petrol_urls = {
    "BankHoliday_url": "https://www.bankbazaar.com/indian-holiday/bank-holidays.html",
    "Petrol_url": "https://www.goodreturns.in/petrol-price.html",
    "Diesel_url": "https://www.goodreturns.in/diesel-price.html",
}


//
const parsed_data = []
parsed_data.petrol = []
parsed_data.diesel = []
parsed_data.holidays = []

//Main Script for parsing necessary data
function script(res, url, type) {

    if (parsed_data.petrol.length > 0 && parsed_data.diesel.length > 0) {
        var data = {

            petrol: parsed_data.petrol,
            diesel: parsed_data.diesel,

        };
        res.json(data);
        return
    }

    console.log("Need to move ahed")

    axios.get(url).then((response) => {

        const html = response.data
        const $ = cheerio.load(html)


        $('.even_row, .odd_row', html).each(function () {
            const capital = $(this).find('td:nth-child(1)').text();
            const t_Price = $(this).find('td:nth-child(2)').text().replace(/\t|\n/gm, "");
            const y_Price = $(this).find('td:nth-child(3)').text().replace(/\t|\n/gm, "");

            if (type === "petrol") {
                parsed_data.petrol.push({
                    "City": capital,
                    "Today": t_Price,
                    "Yesterday": y_Price
                })
            }

        })
        axios.get(petrol_urls["Diesel_url"]).then((response) => {
            const html = response.data
            const $ = cheerio.load(html)



            $('.even_row, .odd_row', html).each(function () {
                const capital = $(this).find('td:nth-child(1)').text();
                const t_Price = $(this).find('td:nth-child(2)').text().replace(/\t|\n/gm, "");
                const y_Price = $(this).find('td:nth-child(3)').text().replace(/\t|\n/gm, "");
                let tip = "diesel"
                if (tip === "diesel") {
                    parsed_data.diesel.push({
                        "City": capital,
                        "Today": t_Price,
                        "Yesterday": y_Price
                    })
                }

            })
            var data = {

                petrol: parsed_data.petrol,
                diesel: parsed_data.diesel,

            };
            res.json(data);
        }).catch(err => console.log(err))



    }).catch(err => console.log(err))

}
// Petrol and Diesel Price
function fetcher() {
    axios.get(petrol_urls["Petrol_url"]).then((response) => {

        const html = response.data
        const $ = cheerio.load(html)

        var type = "petrol";
        $('.even_row, .odd_row', html).each(function () {
            const capital = $(this).find('td:nth-child(1)').text();
            const t_Price = $(this).find('td:nth-child(2)').text().replace(/\t|\n/gm, "");
            const y_Price = $(this).find('td:nth-child(3)').text().replace(/\t|\n/gm, "");

            if (type === "petrol") {
                parsed_data.petrol.push({
                    "City": capital,
                    "Today": t_Price,
                    "Yesterday": y_Price
                })
            }

        })
        type = "diesel";
        axios.get(petrol_urls["Diesel_url"]).then((response) => {
            const html = response.data
            const $ = cheerio.load(html)



            $('.even_row, .odd_row', html).each(function () {
                const capital = $(this).find('td:nth-child(1)').text();
                const t_Price = $(this).find('td:nth-child(2)').text().replace(/\t|\n/gm, "");
                const y_Price = $(this).find('td:nth-child(3)').text().replace(/\t|\n/gm, "");
                let tip = "diesel"
                if (tip === "diesel") {
                    parsed_data.diesel.push({
                        "City": capital,
                        "Today": t_Price,
                        "Yesterday": y_Price
                    })
                }

            })
            // res.abort()
        }).catch(err => {
            // res.abort()
            console.log(err)
        })



    }).catch(err => {
        // res.abort()
        console.log(err)
    })
}

var bankInfo = {
    id: "",
    name: "",
    icon: "",
    mobileBalance: "",
    callRequiredForbalance: false,
    smsTemplate: "",
    mobileMiniStatement: "",
    type: "",
    isPopular: false,
    CallRequiredForMiniStatement: false,
    customerCareNumber: "",
    twitter: "",
    email: "",
    headQuarters: "",
    founded: "",
    website: "",
    code: "",
}
app.get('/getbankdetails/:id', (req, res) => {
    var query = `select * from BankInfo where id=${req.params.id}`
    con.query(query, function (err, result, fields) {
        if (err) throw err;
            console.log(result);
            res.send({ data: result })
      });

})

app.get('/getbanklist', (req, res) => {
    con.query("select id,name,icon,code from BankInfo", function (err, result, fields) {
        if (err) throw err;
            console.log(result);
            res.send({ data: result })
      });

})
//sd

app.get('/push', (req, res) => {
//
    var firebase_url = "https://bank-info-ce9ad-default-rtdb.firebaseio.com/data.json"
    axios.get(firebase_url).then((response) => {
        // console.log(response.data)
        var bankInfoArray = response.data;

        for (var i in bankInfoArray) {
            console.log(bankInfoArray[i]);
            var name = bankInfoArray[i].name,
            icon = bankInfoArray[i].icon,
            mobileBalance = bankInfoArray[i].mobileBalance,
            callRequiredForbalance = bankInfoArray[i].callRequiredForbalance,
            smsTemplate = bankInfoArray[i].smsTemplate,
            mobileMiniStatement = bankInfoArray[i].mobileMiniStatement,
            type =  bankInfoArray[i].type,
            isPopular = bankInfoArray[i].isPopular,
            CallRequiredForMiniStatement = bankInfoArray[i].CallRequiredForMiniStatement,
            customerCareNumber = bankInfoArray[i].customerCareNumber,
            twitter  = bankInfoArray[i].twitter ,
            email = bankInfoArray[i].email,
            headQuarters = bankInfoArray[i].headQuarters,
            founded = bankInfoArray[i].founded,
            website = bankInfoArray[i].website,
            code = bankInfoArray[i].code,
            netbanking = "",
            fdrates = ""
             var insertStatement =
            `INSERT INTO  BankInfo values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
             var items = [null,name, icon, mobileBalance, callRequiredForbalance, smsTemplate, mobileMiniStatement, type, isPopular,CallRequiredForMiniStatement,customerCareNumber, twitter, email, headQuarters, founded, website, code ,netbanking,fdrates];
                        //  (null,'','','',true,'','','',false,false,'','','','','','','','','')
            //  con.query(insertStatement, items, 
            //         (err, results, fields) => {
            //         if (err) {
            //             console.log(
            //            "Unable to insert item at row ", i + 1);
            //             return console.log(err);
            //         }
            //     });

        } 
        console.log(
            "All items stored into database successfully");


    }).catch(err => {
        // res.abort()
        console.log(err)
    })



})

//Petrol Routers
app.get('/', (req, res) => {
    res.json("Welcome Sir");
})

app.get('/fuel-price/india', (req, res) => {
    script(res, petrol_urls["Petrol_url"], "petrol");
})

app.get('/nsd', (req, res) => {
    console.log("APi Call")
    var time = istDate()
    if (time != nsData.time || nsData.news.length < 200) {
        getNewsByApi(req, res)
    } else {
        res.send(nsData.news)
    }

})


var dd_mm_yy = function () {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    return (curr_year + "-" + curr_month + "-" + curr_date);
}

var istDate = function () {
    var baseDate = Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    var d = new Date(baseDate)
    var curr_date = d.getDate();
    if (curr_date < 10) curr_date = `0${curr_date}`
    var curr_month = d.getMonth() + 1;
    if (curr_month < 10) curr_month = `0${curr_month}`
    var curr_year = d.getFullYear();
    return (curr_year + "-" + curr_month + "-" + curr_date);
}
const one_day_milliseconds = 86400000;

function intervalFunc() {
    var curDate = dd_mm_yy()
    // console.log("Hello!!!!");
    var previousDateMilliseconds = new Date(preDate).getTime()
    var currentDateMilliseconds = new Date(curDate).getTime()
    // console.log("--Difference ---"+(currentDateMilliseconds-previousDateMilliseconds))


    if (currentDateMilliseconds - previousDateMilliseconds >= one_day_milliseconds) {
        console.log("One Day Passed");
        parsed_data.petrol = []
        parsed_data.diesel = []
        preDate = dd_mm_yy()
        fetcher()

    } else {
        // console.log("One Day Passed");
    }

}

var preDate = 0

var nsData = {
    news: "",
    time: istDate()
}
function getNewsByApi(req, res) {
    var business_url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=2fb087f1232f444a9f70f34855146fc6&category=business'
    // var business_url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=2fb087f1232f444a9f70f34855146fc6'
    axios.get(business_url).then((response) => {
        console.log(response.data)
        nsData.news = response.data;
        nsData.time = istDate()
        res.send(nsData.news)

    }).catch(err => {
        // res.abort()
        console.log(err)
    })

}



app.listen(PORT, () => {
    setInterval(intervalFunc, 1500);
    console.log(`Server  Sushil is running at PORT HELLO ${PORT}`)
})
