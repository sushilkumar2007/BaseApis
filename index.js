const PORT = process.env.PORT || 8000

const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || '12345678'
const DB_NAME = process.env.DB_NAME || 'usersdb'
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio');
var mysql = require('mysql2');
var csv = require('csvtojson');
var crypto = require('crypto');
var assert = require('assert');
const cryptLib = require('@skavinvarnan/cryptlib');




const app = express();
let connectionRequest = require('./connectionRequest')
const { isDate } = require('util/types')
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



// var con = mysql.createConnection({
//     host: 'containers-us-west-135.railway.app',
//     user: 'root',
//     password: 'yAhGf57qQ8DiEPr5lzl5',
//     port:'7297',
//     database: "railway"
// });


// con.connect(function (err) {
//     console.log("Try to connect")
//     if (err) {
//         console.log("Error ", err)
//         throw err
//     };
//     console.log("Connected");
//     let databaseName = "BankDatabase";
//     // let createQuery = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;
//     // con.query(createQuery, (err) => {
//     //     if (err) throw err;

//     //     console.log("Database Created Successfully !");


//     // })
//     // con.query("DROP TABLE BankInfo", (err, drop) => {
//     //   if (err)
//     //     console.log("ERROR: ", err);

//     //     console.log("Table Dropped !");

//     // });

//     // var createStatament =
//     //     "CREATE TABLE IF NOT EXISTS BankInfo (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255),icon VARCHAR(1000),mobileBalance VARCHAR(255),callRequiredForbalance boolean DEFAULT false,smsTemplate VARCHAR(255),mobileMiniStatement VARCHAR(500),type VARCHAR(255),isPopular boolean DEFAULT false,CallRequiredForMiniStatement boolean DEFAULT false,customerCareNumber VARCHAR(255),twitter VARCHAR(255),email VARCHAR(255),headQuarters VARCHAR(255),founded VARCHAR(255),website VARCHAR(500),code VARCHAR(500),netbanking VARCHAR(1000),fdrates VARCHAR(1000),creditcard VARCHAR(200))"

//     // // Creating table "sample"
//     // con.query(createStatament, (err, drop) => {
//     //     if (err)
//     //         console.log("ERROR: ", err);

//     //         console.log("Table Created !");
//     // });
//     //




// });





const fileName = "IFSC_2020.csv";
//
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
    console.log("Need to move ahed --> 11")
    var time = istDate()

    if (parsed_data.petrol.length > 0 && parsed_data.diesel.length > 0 && time == psData.time) {
        var data = {

            petrol: parsed_data.petrol,
            diesel: parsed_data.diesel,

        };
        console.log("Need to move ahed --> 2")
        res.json(data);
        return
    }

    console.log("Need to move ahed==>>,"+url)
    // return
    // axios.get(url).then(express.response)=>{

    // }

    const params = {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        },
    };
     // axios.config(config)
 
      var url = 'https://www.goodreturns.in/petrol-price.html/*/'
      axios.get(url, params).then(function (response) {
       console.log('Respone---'+response);
     
    }).catch(err => {
        console.log('ERROR OCCURED');
        console.log(err)
    })

    // axios.get(url).then((response) => {

    //     const html = response.data
    //     const $ = cheerio.load(html)
    //     console.log("---print $---",$)


    //     // $('.even_row, .odd_row', html).each(function () {
    //     //     const capital = $(this).find('td:nth-child(1)').text();
    //     //     const t_Price = $(this).find('td:nth-child(2)').text().replace(/\t|\n/gm, "");
    //     //     const y_Price = $(this).find('td:nth-child(3)').text().replace(/\t|\n/gm, "");

    //     //     if (type === "petrol") {
    //     //         parsed_data.petrol.push({
    //     //             "City": capital,
    //     //             "Today": t_Price,
    //     //             "Yesterday": y_Price
    //     //         })
    //     //     }

    //     // })
    //     // axios.get(petrol_urls["Diesel_url"]).then((response) => {
    //     //     const html = response.data
    //     //     const $ = cheerio.load(html)



    //     //     $('.even_row, .odd_row', html).each(function () {
    //     //         const capital = $(this).find('td:nth-child(1)').text();
    //     //         const t_Price = $(this).find('td:nth-child(2)').text().replace(/\t|\n/gm, "");
    //     //         const y_Price = $(this).find('td:nth-child(3)').text().replace(/\t|\n/gm, "");
    //     //         let tip = "diesel"
    //     //         if (tip === "diesel") {
    //     //             parsed_data.diesel.push({
    //     //                 "City": capital,
    //     //                 "Today": t_Price,
    //     //                 "Yesterday": y_Price
    //     //             })
    //     //         }

    //     //     })
    //     //     var data = {

    //     //         petrol: parsed_data.petrol,
    //     //         diesel: parsed_data.diesel,

    //     //     };
    //     //     psData.time = istDate()
    //     //     res.json(data);
    //     // }).catch(err => console.log(err))



    // }).catch(err => console.log(err))

}
// Petrol and Diesel Price
function fetcher() {
    axios.get(petrol_urls["Petrol_url"]).then((response) => {
        //
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
            throw err
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
    netbanking: "",
    fdrates: "",
    creditcard: "",
}
app.get('/getbankdetails/:id/:token', (req, res) => {
    if(!isValidToken(req.params.token)){
        res.send("Invalid Token")
        return
    }
    var query = `select * from BankInfo where id=${req.params.id}`
    var connection = connectionRequest()
    connection.query(query, function (err, result, fields) {
        if (!err) {

            res.send({ data: result })
            connection.destroy()


        } else {
            console.log(err);
            res.send("Error")
            connection.destroy()
        }

    });

})

app.get('/getbanklist/:token', (req, res) => {
    if(!isValidToken(req.params.token)){
        res.send("Invalid Token")
        return
    }
    var query = "select id,name,icon,code from BankInfo";
    var connection = connectionRequest()
    connection.query(query, function (err, result, fields) {
        if (!err) {

            res.send({ data: result })
            connection.destroy()


        } else {
            console.log(err);
            res.send("Error")
            connection.destroy()
        }

    });


})





app.get('/gettopbanklist/:token', (req, res) => {
    if(!isValidToken(req.params.token)){
        res.send("Invalid Token")
        return
    }
    var query = `select id,name,icon,code from BankInfo where isPopular=1`


    var connection = connectionRequest()
    connection.query(query, function (err, result, fields) {
        if (!err) {

            res.send({ data: result })
            connection.destroy()


        } else {
            console.log(err);
            res.send("Error")
            connection.destroy()
        }

    });



})

app.get("/price",(req,res)=>{




});

app.get('/getStateList/:bankcode/:token', (req, res) => {
    if(!isValidToken(req.params.token)){
        res.send("Invalid Token")
        return
    }

    var query = `SELECT distinct state FROM IFSC_DATA_2020 where IFSC like '%${req.params.bankcode}%'`
    var connection = connectionRequest()
    connection.query(query, function (err, result, fields) {
        if (!err) {

            var states = [...new Set(result.map(x => x.state))];
            res.send({ states })
            connection.destroy()


        } else {
            console.log(err);
            res.send("Error")
            connection.destroy()
        }

    });


})

app.get('/getDistrict/:bankcode/:state/:token', (req, res) => {
    if(!isValidToken(req.params.token)){
        res.send("Invalid Token")
        return
    }
    // var query = `select distinct state from IFSC_DATA_2021 where IFSC=${req.params.bankcode}`
    var query = `SELECT distinct district FROM IFSC_DATA_2020 where IFSC like '%${req.params.bankcode}%' and state like '%${req.params.state}%'`
    var connection = connectionRequest()
    connection.query(query, function (err, result, fields) {
        if (!err) {

            var districts = [...new Set(result.map(x => x.district))];
            res.send({ districts })
            connection.destroy()


        } else {
            console.log(err);
            res.send("Error")
            connection.destroy()
        }

    });

})

app.get('/getBranch/:state/:district/:bankcode/:token', (req, res) => {
    if(!isValidToken(req.params.token)){
        res.send("Invalid Token")
        return
    }
    var query = `SELECT distinct branch FROM IFSC_DATA_2020 where IFSC like '%${req.params.bankcode}%' and district like '%${req.params.district}%' and state like '%${req.params.state}%'`
    var connection = connectionRequest()
    connection.query(query, function (err, result, fields) {
        if (!err) {

            var branches = [...new Set(result.map(x => x.branch))];
            res.send({ branches })
            connection.destroy()


        } else {
            console.log(err);
            res.send("Error")
            connection.destroy()
        }

    });

})

app.get('/getifsc/:bankcode/:branch/:token', (req, res) => {
    if(!isValidToken(req.params.token)){
        res.send("Invalid Token")
        return
    }
    // var query = `select distinct state from IFSC_DATA_2021 where IFSC=${req.params.bankcode}`
    var query = `SELECT * FROM IFSC_DATA_2020 where IFSC like '%${req.params.bankcode}%' and branch like '%${req.params.branch}%'`
    var connection = connectionRequest()
    connection.query(query, function (err, result, fields) {
        if (!err) {

            res.send({ data: result })
            connection.destroy()


        } else {
            console.log(err);
            res.send("Error")
            connection.destroy()
        }

    });

})



// app.get('/setBankData', (req, res) => {

// //     con.query("DROP TABLE IFSC_DATA_2020", (err, drop) => {
// //       if (err)
// //         console.log("ERROR: ", err);

// //         console.log("Table Dropped !");

// //     });

// //     var createStatament = 
// //     "CREATE TABLE IFSC_DATA_2020 (BANK VARCHAR(255),IFSC VARCHAR(255),BRANCH VARCHAR(255),CENTRE VARCHAR(255),DISTRICT VARCHAR(255),STATE VARCHAR(255),ADDRESS VARCHAR(500),CONTACT VARCHAR(255),IMPS VARCHAR(255),RTGS VARCHAR(255),CITY VARCHAR(255),ISO3166 VARCHAR(255),NEFT VARCHAR(255),MICR VARCHAR(255),UPI VARCHAR(255),SWIFT VARCHAR(255))"

// //   // Creating table "sample"
// //     con.query(createStatament, (err, drop) => {
// //       if (err)
// //           console.log("ERROR: ", err);

// //           console.log("IFSC table creadted")

// //     });

//     /// insert Data Part

//         csv().fromFile(fileName).then(source => {

//         console.log(
//           "Runing");
//           // Fetching the data from each row 
//           // and inserting to the table "sample"
//           console.log("--soruce lnegth--",source.length)
//           var counter = 0;
//         //   '153324'

//           for (var i = 153324; i < source.length; i++) {
//               var BANK = source[i]["BANK"],
//                   IFSC = source[i]["IFSC"],
//                   BRANCH = source[i]["BRANCH"],
//                   CENTRE = source[i]["CENTRE"],
//                   DISTRICT = source[i]["DISTRICT"],
//                   STATE = source[i]["STATE"],
//                   ADDRESS = source[i]["ADDRESS"],
//                   CONTACT = source[i]["CONTACT"],
//                   IMPS = source[i]["IMPS"],
//                   RTGS = source[i]["RTGS"],
//                   CITY = source[i]["CITY"],
//                   ISO3166 = source[i]["ISO3166"],
//                   NEFT = source[i]["NEFT"],
//                   MICR = source[i]["MICR"],
//                   UPI = source[i]["UPI"],
//                   SWIFT = source[i]["SWIFT"]


//               var insertStatement = 
//               `INSERT INTO IFSC_DATA_2020 values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
//               var items = [BANK,IFSC,BRANCH,CENTRE,DISTRICT,STATE,ADDRESS,CONTACT,IMPS,RTGS,CITY,ISO3166,NEFT,MICR,UPI,SWIFT];

//               // Inserting data of current row
//               // into database
//               con.query(insertStatement, items, 
//                   (err, results, fields) => {
//                   if (err) {
//                       console.log(
//                 "Unable to insert item at row ", i + 1);
//                       return console.log(err);
//                   }

//                   counter = counter+1;
//               });
//           }
//           console.log("--counter--"+counter)
//           console.log( "All items stored into database successfully");

//       });




// })






//sd

app.get('/push', (req, res) => {
    //
    var firebase_url = "https://bank-info-ce9ad-default-rtdb.firebaseio.com/data.json"
    axios.get(firebase_url).then((response) => {
        // console.log(response.data)
        var bankInfoArray = response.data;

        for (var i in bankInfoArray) {

            var name = bankInfoArray[i].name,
                icon = bankInfoArray[i].icon,
                mobileBalance = bankInfoArray[i].mobileBalance,
                callRequiredForbalance = bankInfoArray[i].callRequiredForbalance,
                smsTemplate = bankInfoArray[i].smsTemplate,
                mobileMiniStatement = bankInfoArray[i].mobileMiniStatement,
                type = bankInfoArray[i].type,
                isPopular = bankInfoArray[i].isPopular,
                CallRequiredForMiniStatement = bankInfoArray[i].CallRequiredForMiniStatement,
                customerCareNumber = bankInfoArray[i].customerCareNumber,
                twitter = bankInfoArray[i].twitter,
                email = bankInfoArray[i].email,
                headQuarters = bankInfoArray[i].headQuarters,
                founded = bankInfoArray[i].founded,
                website = bankInfoArray[i].website,
                code = bankInfoArray[i].code,
                netbanking = bankInfoArray[i].netbanking,
                fdrates = bankInfoArray[i].fdrated,
                creditcard = bankInfoArray[i].creditcard

            var insertStatement =
                `INSERT INTO  BankInfo values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            var items = [null, name, icon, mobileBalance, callRequiredForbalance, smsTemplate, mobileMiniStatement, type, isPopular, CallRequiredForMiniStatement, customerCareNumber, twitter, email, headQuarters, founded, website, code, netbanking, fdrates, creditcard];
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
    res.json("Welcome To Web>>"+istDate());
})

// app.get('/fuel-price/india/:token', (req, res) => {
//     // if(!isValidToken(req.params.token)){
//     //     res.send("Invalid Token")
//     //     return
//     // }
//     script(res, petrol_urls["Petrol_url"], "petrol");
// })
app.get('/fuel-price/india', (req, res) => {
    // if(!isValidToken(req.params.token)){
    //     res.send("Invalid Token")
    //     return
    // }
    script(res, petrol_urls["Petrol_url"], "petrol");
})


app.get('/privacy', (req, res) => {
    res.send(privacy_content)
})
app.get('/lte/privacy', (req, res) => {
    res.send(privacy_content_lte)
})

app.get('/nsd/:token', (req, res) => {

    if(!isValidToken(req.params.token)){
        res.send("Invalid Token")
        return
    }
    var time = istDate()
    if (time != nsData.time || nsData.news.length < 200) {
        getNewsByApi(req, res)
    } else {
        res.send(nsData.news)
    }

})

function isValidToken(token){
   if(istDate()==decryptData(token))
     return true;
    
    return false;  
}

 var alpha = ""


var dd_mm_yy = function () {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    return (curr_year + "-" + curr_month + "-" + curr_date);
}
process.env.TZ = "Asia/Kolkata";


var istDate = function () {
    var baseDate = Date()
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

var psData = {
    time: istDate()
}

function getNewsByApi(req, res) {
    var business_url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=2fb087f1232f444a9f70f34855146fc6&category=business'
    // var business_url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=2fb087f1232f444a9f70f34855146fc6'
    axios.get(business_url).then((response) => {

        nsData.news = response.data;
        nsData.time = istDate()
        res.send(nsData.news)

    }).catch(err => {
        // res.abort()
        console.log(err)
    })

}



var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
// var key = 'password';
// var text = 'I love kittens';
// var iv = "this is iv"

const key = "top_bank_info"

//Encrypting text
function encryptData(data) {
      //
     try {
        return cryptLib.encryptPlainTextWithRandomIV(data, key)
      } catch (exceptionVar) {
       return ""
      } 

  }
  
  // Decrypt data
function decryptData(data) {
   
      try {
        return cryptLib.decryptCipherTextWithRandomIV(data, key);
      } catch (exceptionVar) {
       return ""
      } 
    
  }



app.listen(PORT, () => {
    //setInterval(intervalFunc, 1500);
   

    var date = istDate()

    console.log(`Hellosss Sushil is running at PORT HELLO ${PORT}`)







})



var privacy_content = "<!DOCTYPE html>\n" +
"    <html>\n" +
"    <head>\n" +
"      <meta charset='utf-8'>\n" +
"      <meta name='viewport' content='width=device-width'>\n" +
"      <title>Privacy Policy</title>\n" +
"      <style> body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding:1em; } </style>\n" +
"    </head>\n" +
"    <body>\n" +
"    <strong>Privacy Policy</strong> <p>\n" +
"                  Android Pathy built the All Bank Balance app as\n" +
"                  a Free app. This SERVICE is provided by\n" +
"                  Android Pathy at no cost and is intended for use as\n" +
"                  is.\n" +
"                </p> <p>\n" +
"                  This page is used to inform visitors regarding my\n" +
"                  policies with the collection, use, and disclosure of Personal\n" +
"                  Information if anyone decided to use my Service.\n" +
"                </p> <p>\n" +
"                  If you choose to use my Service, then you agree to\n" +
"                  the collection and use of information in relation to this\n" +
"                  policy. The Personal Information that I collect is\n" +
"                  used for providing and improving the Service. I will not use or share your information with\n" +
"                  anyone except as described in this Privacy Policy.\n" +
"                </p> <p>\n" +
"                  The terms used in this Privacy Policy have the same meanings\n" +
"                  as in our Terms and Conditions, which are accessible at\n" +
"                  All Bank Balance unless otherwise defined in this Privacy Policy.\n" +
"                </p> <p><strong>Information Collection and Use</strong></p> <p>\n" +
"                  For a better experience, while using our Service, I\n" +
"                  may require you to provide us with certain personally\n" +
"                  identifiable information. The information that\n" +
"                  I request will be retained on your device and is not collected by me in any way.\n" +
"                </p> <div><p>\n" +
"                    The app does use third-party services that may collect\n" +
"                    information used to identify you.\n" +
"                  </p> <p>\n" +
"                    Link to the privacy policy of third-party service providers used\n" +
"                    by the app\n" +
"                  </p> <ul><li><a href=\"https://www.google.com/policies/privacy/\" target=\"_blank\" rel=\"noopener noreferrer\">Google Play Services</a></li><li><a href=\"https://support.google.com/admob/answer/6128543?hl=en\" target=\"_blank\" rel=\"noopener noreferrer\">AdMob</a></li><li><a href=\"https://firebase.google.com/policies/analytics\" target=\"_blank\" rel=\"noopener noreferrer\">Google Analytics for Firebase</a></li><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----></ul></div> <p><strong>Log Data</strong></p> <p>\n" +
"                  I want to inform you that whenever you\n" +
"                  use my Service, in a case of an error in the app\n" +
"                  I collect data and information (through third-party\n" +
"                  products) on your phone called Log Data. This Log Data may\n" +
"                  include information such as your device Internet Protocol\n" +
"                  (“IP”) address, device name, operating system version, the\n" +
"                  configuration of the app when utilizing my Service,\n" +
"                  the time and date of your use of the Service, and other\n" +
"                  statistics.\n" +
"                </p> <p><strong>Cookies</strong></p> <p>\n" +
"                  Cookies are files with a small amount of data that are\n" +
"                  commonly used as anonymous unique identifiers. These are sent\n" +
"                  to your browser from the websites that you visit and are\n" +
"                  stored on your device's internal memory.\n" +
"                </p> <p>\n" +
"                  This Service does not use these “cookies” explicitly. However,\n" +
"                  the app may use third-party code and libraries that use\n" +
"                  “cookies” to collect information and improve their services.\n" +
"                  You have the option to either accept or refuse these cookies\n" +
"                  and know when a cookie is being sent to your device. If you\n" +
"                  choose to refuse our cookies, you may not be able to use some\n" +
"                  portions of this Service.\n" +
"                </p> <p><strong>Service Providers</strong></p> <p>\n" +
"                  I may employ third-party companies and\n" +
"                  individuals due to the following reasons:\n" +
"                </p> <ul><li>To facilitate our Service;</li> <li>To provide the Service on our behalf;</li> <li>To perform Service-related services; or</li> <li>To assist us in analyzing how our Service is used.</li></ul> <p>\n" +
"                  I want to inform users of this Service\n" +
"                  that these third parties have access to their Personal\n" +
"                  Information. The reason is to perform the tasks assigned to\n" +
"                  them on our behalf. However, they are obligated not to\n" +
"                  disclose or use the information for any other purpose.\n" +
"                </p> <p><strong>Security</strong></p> <p>\n" +
"                  I value your trust in providing us your\n" +
"                  Personal Information, thus we are striving to use commercially\n" +
"                  acceptable means of protecting it. But remember that no method\n" +
"                  of transmission over the internet, or method of electronic\n" +
"                  storage is 100% secure and reliable, and I cannot\n" +
"                  guarantee its absolute security.\n" +
"                </p> <p><strong>Links to Other Sites</strong></p> <p>\n" +
"                  This Service may contain links to other sites. If you click on\n" +
"                  a third-party link, you will be directed to that site. Note\n" +
"                  that these external sites are not operated by me.\n" +
"                  Therefore, I strongly advise you to review the\n" +
"                  Privacy Policy of these websites. I have\n" +
"                  no control over and assume no responsibility for the content,\n" +
"                  privacy policies, or practices of any third-party sites or\n" +
"                  services.\n" +
"                </p> <p><strong>Children’s Privacy</strong></p> <div><p>\n" +
"                    These Services do not address anyone under the age of 13.\n" +
"                    I do not knowingly collect personally\n" +
"                    identifiable information from children under 13 years of age. In the case\n" +
"                    I discover that a child under 13 has provided\n" +
"                    me with personal information, I immediately\n" +
"                    delete this from our servers. If you are a parent or guardian\n" +
"                    and you are aware that your child has provided us with\n" +
"                    personal information, please contact me so that\n" +
"                    I will be able to do the necessary actions.\n" +
"                  </p></div> <!----> <p><strong>Changes to This Privacy Policy</strong></p> <p>\n" +
"                  I may update our Privacy Policy from\n" +
"                  time to time. Thus, you are advised to review this page\n" +
"                  periodically for any changes. I will\n" +
"                  notify you of any changes by posting the new Privacy Policy on\n" +
"                  this page.\n" +
"                </p> <p>This policy is effective as of 2023-08-01</p> <p><strong>Contact Us</strong></p> <p>\n" +
"                  If you have any questions or suggestions about my\n" +
"                  Privacy Policy, do not hesitate to contact me at sushil.sh2007@gmail.com.\n" +
"                </p> <p>This privacy policy page was created at <a href=\"https://privacypolicytemplate.net\" target=\"_blank\" rel=\"noopener noreferrer\">privacypolicytemplate.net </a>and modified/generated by <a href=\"https://app-privacy-policy-generator.nisrulz.com/\" target=\"_blank\" rel=\"noopener noreferrer\">App Privacy Policy Generator</a></p>\n" +
"    </body>\n" +
"    </html>\n" +
"      "


var privacy_content_lte = "<!DOCTYPE html>\n" +
"    <html>\n" +
"    <head>\n" +
"      <meta charset='utf-8'>\n" +
"      <meta name='viewport' content='width=device-width'>\n" +
"      <title>Privacy Policy</title>\n" +
"      <style> body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding:1em; } </style>\n" +
"    </head>\n" +
"    <body>\n" +
"    <strong>Privacy Policy</strong> <p>\n" +
"                  IntellectX built the 5G/4G LTE SWITCHER app as\n" +
"                  a Free app. This SERVICE is provided by\n" +
"                  IntellectX at no cost and is intended for use as\n" +
"                  is.\n" +
"                </p> <p>\n" +
"                  This page is used to inform visitors regarding my\n" +
"                  policies with the collection, use, and disclosure of Personal\n" +
"                  Information if anyone decided to use my Service.\n" +
"                </p> <p>\n" +
"                  If you choose to use my Service, then you agree to\n" +
"                  the collection and use of information in relation to this\n" +
"                  policy. The Personal Information that I collect is\n" +
"                  used for providing and improving the Service. I will not use or share your information with\n" +
"                  anyone except as described in this Privacy Policy.\n" +
"                </p> <p>\n" +
"                  The terms used in this Privacy Policy have the same meanings\n" +
"                  as in our Terms and Conditions, which are accessible at\n" +
"                  5G/4G LTE SWITCHER unless otherwise defined in this Privacy Policy.\n" +
"                </p> <p><strong>Information Collection and Use</strong></p> <p>\n" +
"                  For a better experience, while using our Service, I\n" +
"                  may require you to provide us with certain personally\n" +
"                  identifiable information. The information that\n" +
"                  I request will be retained on your device and is not collected by me in any way.\n" +
"                </p> <div><p>\n" +
"                    The app does use third-party services that may collect\n" +
"                    information used to identify you.\n" +
"                  </p> <p>\n" +
"                    Link to the privacy policy of third-party service providers used\n" +
"                    by the app\n" +
"                  </p> <ul><li><a href=\"https://www.google.com/policies/privacy/\" target=\"_blank\" rel=\"noopener noreferrer\">Google Play Services</a></li><li><a href=\"https://support.google.com/admob/answer/6128543?hl=en\" target=\"_blank\" rel=\"noopener noreferrer\">AdMob</a></li><li><a href=\"https://firebase.google.com/policies/analytics\" target=\"_blank\" rel=\"noopener noreferrer\">Google Analytics for Firebase</a></li><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----></ul></div> <p><strong>Log Data</strong></p> <p>\n" +
"                  I want to inform you that whenever you\n" +
"                  use my Service, in a case of an error in the app\n" +
"                  I collect data and information (through third-party\n" +
"                  products) on your phone called Log Data. This Log Data may\n" +
"                  include information such as your device Internet Protocol\n" +
"                  (“IP”) address, device name, operating system version, the\n" +
"                  configuration of the app when utilizing my Service,\n" +
"                  the time and date of your use of the Service, and other\n" +
"                  statistics.\n" +
"                </p> <p><strong>Cookies</strong></p> <p>\n" +
"                  Cookies are files with a small amount of data that are\n" +
"                  commonly used as anonymous unique identifiers. These are sent\n" +
"                  to your browser from the websites that you visit and are\n" +
"                  stored on your device's internal memory.\n" +
"                </p> <p>\n" +
"                  This Service does not use these “cookies” explicitly. However,\n" +
"                  the app may use third-party code and libraries that use\n" +
"                  “cookies” to collect information and improve their services.\n" +
"                  You have the option to either accept or refuse these cookies\n" +
"                  and know when a cookie is being sent to your device. If you\n" +
"                  choose to refuse our cookies, you may not be able to use some\n" +
"                  portions of this Service.\n" +
"                </p> <p><strong>Service Providers</strong></p> <p>\n" +
"                  I may employ third-party companies and\n" +
"                  individuals due to the following reasons:\n" +
"                </p> <ul><li>To facilitate our Service;</li> <li>To provide the Service on our behalf;</li> <li>To perform Service-related services; or</li> <li>To assist us in analyzing how our Service is used.</li></ul> <p>\n" +
"                  I want to inform users of this Service\n" +
"                  that these third parties have access to their Personal\n" +
"                  Information. The reason is to perform the tasks assigned to\n" +
"                  them on our behalf. However, they are obligated not to\n" +
"                  disclose or use the information for any other purpose.\n" +
"                </p> <p><strong>Security</strong></p> <p>\n" +
"                  I value your trust in providing us your\n" +
"                  Personal Information, thus we are striving to use commercially\n" +
"                  acceptable means of protecting it. But remember that no method\n" +
"                  of transmission over the internet, or method of electronic\n" +
"                  storage is 100% secure and reliable, and I cannot\n" +
"                  guarantee its absolute security.\n" +
"                </p> <p><strong>Links to Other Sites</strong></p> <p>\n" +
"                  This Service may contain links to other sites. If you click on\n" +
"                  a third-party link, you will be directed to that site. Note\n" +
"                  that these external sites are not operated by me.\n" +
"                  Therefore, I strongly advise you to review the\n" +
"                  Privacy Policy of these websites. I have\n" +
"                  no control over and assume no responsibility for the content,\n" +
"                  privacy policies, or practices of any third-party sites or\n" +
"                  services.\n" +
"                </p> <p><strong>Children’s Privacy</strong></p> <div><p>\n" +
"                    These Services do not address anyone under the age of 13.\n" +
"                    I do not knowingly collect personally\n" +
"                    identifiable information from children under 13 years of age. In the case\n" +
"                    I discover that a child under 13 has provided\n" +
"                    me with personal information, I immediately\n" +
"                    delete this from our servers. If you are a parent or guardian\n" +
"                    and you are aware that your child has provided us with\n" +
"                    personal information, please contact me so that\n" +
"                    I will be able to do the necessary actions.\n" +
"                  </p></div> <!----> <p><strong>Changes to This Privacy Policy</strong></p> <p>\n" +
"                  I may update our Privacy Policy from\n" +
"                  time to time. Thus, you are advised to review this page\n" +
"                  periodically for any changes. I will\n" +
"                  notify you of any changes by posting the new Privacy Policy on\n" +
"                  this page.\n" +
"                </p> <p>This policy is effective as of 2023-08-01</p> <p><strong>Contact Us</strong></p> <p>\n" +
"                  If you have any questions or suggestions about my\n" +
"                  Privacy Policy, do not hesitate to contact me at sushil.sh2007@gmail.com.\n" +
"                </p> <p>This privacy policy page was created at <a href=\"https://privacypolicytemplate.net\" target=\"_blank\" rel=\"noopener noreferrer\">privacypolicytemplate.net </a>and modified/generated by <a href=\"https://app-privacy-policy-generator.nisrulz.com/\" target=\"_blank\" rel=\"noopener noreferrer\">App Privacy Policy Generator</a></p>\n" +
"    </body>\n" +
"    </html>\n" +
"      "