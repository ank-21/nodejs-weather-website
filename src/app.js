const path = require('path')
const express = require('express')
const hbs = require('hbs')   //to load hbs

const forecast = require('./utilis/forecast.js')       //file extension is optional
const geocode = require('./utilis/geocode')


const app = express()                  //call it to generate new instance of application


//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')                 //for customising views directory
const partialPath = path.join(__dirname,'../template/partials')


//set up handlebars and views location. for dynamic
app.set('view engine','hbs')   //to set handlebars.  //default one
app.set('views',viewsPath)     //for the customised view option. 2nd arg is the path
hbs.registerPartials(partialPath) //path of partials


//setup static directory to serve
app.use(express.static(publicDirectoryPath))        //static means that the assets are static.they do not change


//for app.com but with dynamic handling i.e. hbs

app.get('',(req,res) => {
    res.render('index',{           //res.render file name will be searched by app.set('views')
        name:'Ankit',
        title:'Weather'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About',
        name:'Ankit'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        name:'Ankit',
        title:'Help page for you'
    }) 
})

//for app.com


// app.get('/',(req,res)=>{
//     res.send('<h1>Welcome to the express</h1>')
// })

//for app.com/help

// app.get('/help',(req,res)=>{
//     res.send({
//         name: 'Ankit',
//         age: 21
//     })
// })

// //for app.com/about

// app.get('/about',(req,res) => {
//     res.send('<h1>me</h1>')
// })

//for app.com/weather

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address to know weather'
        })
    }
    geocode(req.query.address,(error, {latitude , longitude , location} = {}/*data*/) =>{       //we can also destruct data object.so again we have to give default parameters
        if(error) {
            return res.send({
                error
            })
        }

        forecast(latitude,longitude, (error, forecastData) => { 
                if(error){
                    return res.send({
                        error
                    })
                }
                
                res.send({
                    address: req.query.address,
                    location,
                    forecast:forecastData
                })
            })
    })
})

//just for practice

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({    //return to get exit from function otherwise 2 response.send message will go and error occur.also can use if else
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})

//for error page

app.get('/help/*',(req,res)=>{
    //res.send('help article not found)
    res.render('404',{
        title : 'Help article',
        name:'Ankit',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=> {
    res.render('404',{
        title: '404 Page',
        name:'Ankit',
        errorMessage:'Page not found'
    })
})

// app.get('*',(req,res)=> {
//     res.send('My 404 page')
// })

app.listen(3000, () => {
    console.log('On the server 3000')
})