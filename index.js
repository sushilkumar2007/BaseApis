const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio');


const searchString = "finance";
const encodedString = encodeURI(searchString);



// /import './module-name'////
// const gnews = require('gnews-scraper');

const app = express();

//Url For Web-Scrapping
const petrol_urls = {
    "BankHoliday_url": "https://www.bankbazaar.com/indian-holiday/bank-holidays.html",
    "Petrol_url": "https://www.goodreturns.in/petrol-price.html",
    "Diesel_url": "https://www.goodreturns.in/diesel-price.html",
    "AN_url": "https://www.goodreturns.in/petrol-price-in-andaman-nicobar-s1.html",
    "AP_url": "https://www.goodreturns.in/petrol-price-in-andhra-pradesh-s2.html",
    "AR_url": "https://www.goodreturns.in/petrol-price-in-arunachal-pradesh-s3.html",
    "AS_url": "https://www.goodreturns.in/petrol-price-in-assam-s4.html",
    "BR_url": "https://www.goodreturns.in/petrol-price-in-bihar-s5.html",
    "CH_url": "https://www.goodreturns.in/petrol-price-in-chandigarh-s6.html",
    "CG_url": "https://www.goodreturns.in/petrol-price-in-chhatisgarh-s7.html",
    "DH_url": "https://www.goodreturns.in/petrol-price-in-dadra-nagarhaveli-s8.html",
    "DD_url": "https://www.goodreturns.in/petrol-price-in-daman-diu-s9.html",
    "DL_url": "https://www.goodreturns.in/petrol-price-in-delhi-s10.html",
    "GA_url": "https://www.goodreturns.in/petrol-price-in-goa-s11.html",
    "GJ_url": "https://www.goodreturns.in/petrol-price-in-gujarat-s12.html",
    "HR_url": "https://www.goodreturns.in/petrol-price-in-haryana-s13.html",
    "HP_url": "https://www.goodreturns.in/petrol-price-in-himachal-pradesh-s14.html",
    "JK_url": "https://www.goodreturns.in/petrol-price-in-jammu-kashmir-s15.html",
    "JH_url": "https://www.goodreturns.in/petrol-price-in-jharkhand-s16.html",
    "KA_url": "https://www.goodreturns.in/petrol-price-in-karnataka-s17.html",
    "KL_url": "https://www.goodreturns.in/petrol-price-in-kerala-s18.html",
    "MP_url": "https://www.goodreturns.in/petrol-price-in-madhya-pradesh-s19.html",
    "MH_url": "https://www.goodreturns.in/petrol-price-in-maharashtra-s20.html",
    "MN_url": "https://www.goodreturns.in/petrol-price-in-manipur-s21.html",
    "ML_url": "https://www.goodreturns.in/petrol-price-in-meghalaya-s22.html",
    "MZ_url": "https://www.goodreturns.in/petrol-price-in-mizoram-s23.html",
    "NL_url": "https://www.goodreturns.in/petrol-price-in-nagaland-s24.html",
    "OR_url": "https://www.goodreturns.in/petrol-price-in-odisha-s25.html",
    "PY_url": "https://www.goodreturns.in/petrol-price-in-pondicherry-s26.html",
    "PB_url": "https://www.goodreturns.in/petrol-price-in-punjab-s27.html",
    "RJ_url": "https://www.goodreturns.in/petrol-price-in-rajasthan-s28.html",
    "SK_url": "https://www.goodreturns.in/petrol-price-in-sikkim-s29.html",
    "TN_url": "https://www.goodreturns.in/petrol-price-in-tamil-nadu-s30.html",
    "TS_url": "https://www.goodreturns.in/petrol-price-in-telangana-s31.html",
    "TR_url": "https://www.goodreturns.in/petrol-price-in-tripura-s32.html",
    "UP_url": "https://www.goodreturns.in/petrol-price-in-uttar-pradesh-s33.html",
    "UK_url": "https://www.goodreturns.in/petrol-price-in-uttarakhand-s34.html",
    "WB_url": "https://www.goodreturns.in/petrol-price-in-west-bengal-s35.html"

}

const lpg_urls = {
    "url": "https://www.goodreturns.in/lpg-price.html",
    "AN_url": "https://www.goodreturns.in/lpg-price-in-andaman-nicobar-s1.html",
    "AP_url": "https://www.goodreturns.in/lpg-price-in-andhra-pradesh-s2.html",
    "AR_url": "https://www.goodreturns.in/lpg-price-in-arunachal-pradesh-s3.html",
    "AS_url": "https://www.goodreturns.in/lpg-price-in-assam-s4.html",
    "BR_url": "https://www.goodreturns.in/lpg-price-in-bihar-s5.html",
    "CH_url": "https://www.goodreturns.in/lpg-price-in-chandigarh-s6.html",
    "CG_url": "https://www.goodreturns.in/lpg-price-in-chhatisgarh-s7.html",
    "DH_url": "https://www.goodreturns.in/lpg-price-in-dadra-nagarhaveli-s8.html",
    "DD_url": "https://www.goodreturns.in/lpg-price-in-daman-diu-s9.html",
    "DL_url": "https://www.goodreturns.in/lpg-price-in-delhi-s10.html",
    "GA_url": "https://www.goodreturns.in/lpg-price-in-goa-s11.html",
    "GJ_url": "https://www.goodreturns.in/lpg-price-in-gujarat-s12.html",
    "HR_url": "https://www.goodreturns.in/lpg-price-in-haryana-s13.html",
    "HP_url": "https://www.goodreturns.in/lpg-price-in-himachal-pradesh-s14.html",
    "JK_url": "https://www.goodreturns.in/lpg-price-in-jammu-kashmir-s15.html",
    "JH_url": "https://www.goodreturns.in/lpg-price-in-jharkhand-s16.html",
    "KA_url": "https://www.goodreturns.in/lpg-price-in-karnataka-s17.html",
    "KL_url": "https://www.goodreturns.in/lpg-price-in-kerala-s18.html",
    "MP_url": "https://www.goodreturns.in/lpg-price-in-madhya-pradesh-s19.html",
    "MH_url": "https://www.goodreturns.in/lpg-price-in-maharashtra-s20.html",
    "MN_url": "https://www.goodreturns.in/lpg-price-in-manipur-s21.html",
    "ML_url": "https://www.goodreturns.in/lpg-price-in-meghalaya-s22.html",
    "MZ_url": "https://www.goodreturns.in/lpg-price-in-mizoram-s23.html",
    "NL_url": "https://www.goodreturns.in/lpg-price-in-nagaland-s24.html",
    "OR_url": "https://www.goodreturns.in/lpg-price-in-odisha-s25.html",
    "PY_url": "https://www.goodreturns.in/lpg-price-in-pondicherry-s26.html",
    "PB_url": "https://www.goodreturns.in/lpg-price-in-punjab-s27.html",
    "RJ_url": "https://www.goodreturns.in/lpg-price-in-rajasthan-s28.html",
    "SK_url": "https://www.goodreturns.in/lpg-price-in-sikkim-s29.html",
    "TN_url": "https://www.goodreturns.in/lpg-price-in-tamil-nadu-s30.html",
    "TS_url": "https://www.goodreturns.in/lpg-price-in-telangana-s31.html",
    "TR_url": "https://www.goodreturns.in/lpg-price-in-tripura-s32.html",
    "UP_url": "https://www.goodreturns.in/lpg-price-in-uttar-pradesh-s33.html",
    "UK_url": "https://www.goodreturns.in/lpg-price-in-uttarakhand-s34.html",
    "WB_url": "https://www.goodreturns.in/lpg-price-in-west-bengal-s35.html"
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
function fetcherBankHolidays() {
    axios.get(petrol_urls["BankHoliday_url"]).then((response) => {

        const html = response.data
        const $ = cheerio.load(html)
        //  console.log(html)
        $("body > table > tbody > tr", html).each((index, element) => {
            console.log($(element).find("td"));
        });

        // $('.owspan="1" colspan="1" class="highlight"', html).each(function () {
        //     const capital = $(this).find('td:nth-child(1)').text();
        //     const t_Price = $(this).find('td:nth-child(2)').text().replace(/\t|\n/gm, "");
        //     const y_Price = $(this).find('td:nth-child(3)').text().replace(/\t|\n/gm, "");

        //     if(type === "petrol") 
        //     {
        //         parsed_data.petrol.push({
        //             "City": capital,
        //             "Today": t_Price,
        //             "Yesterday": y_Price
        //         })    
        //     }

        // })

        console.log(parsed_data.holidays)



    }).catch(err => {
        // res.abort()
        console.log(err)
    })
}


//Petrol Routers
app.get('/', (req, res) => {
    res.json("Hey Dev! Give '/<petrol/lpg>/<state-name>' with base Url to get respective Petrol Prices!!!");
})

app.get('/fuel-price/india', (req, res) => {
    script(res, petrol_urls["Petrol_url"], "petrol");
})

app.get('/nsd', (req, res) => {
    console.log("APi Call")
    var time = istDate()
    if(time!=nsData.time || nsData.news.length<200){
            getNewsByApi(req,res)
    }else {
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

var istDate  = function(){
    var baseDate =  Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'})
    var d = new Date(baseDate)
    var curr_date = d.getDate();
    if(curr_date<10) curr_date = `0${curr_date}`
    var curr_month = d.getMonth() + 1;
    if(curr_month<10) curr_month = `0${curr_month}`
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
const AXIOS_OPTIONS = {
    headers: {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36",
    },                                                  // adding the User-Agent header as one way to prevent the request from being blocked
    params: {
        q: encodedString,                                // our encoded search string        
        tbm: "nws",                                     // parameter defines the type of search you want to do ("nws" means news)
        hl: 'en',                                       // Parameter defines the language to use for the Google search
        gl: 'in'                                        // parameter defines the country to use for the Google search
    },
};



var nsData = { 
    news: "", 
    time:istDate()
 } 
function getNewsByApi(req,res){
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
    console.log(`Server is running at PORT HELLO ${PORT}`)
})
