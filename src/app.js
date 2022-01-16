//REQUIRING LOCAL FILES
const geocode = require('./utils/geocode')
const weatherStack = require('./utils/weatherStack')

//REQUIRING LOCAL MODULES
const path = require('path')
//REQUIRING ONLINEMODULES
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//SETUP PATHS CONFIG FOR EXPRESS
const publicDirectory = path.join(__dirname, '../Public-Directory')
const viewDirectory = path.join(__dirname, '../template/views')
const partialsDirectory = path.join(__dirname, '../template/partials')
//HANDLEBARS ENGINE AND PATH SETTINGS
app.set('view engine', 'hbs')
app.set('views', viewDirectory)
hbs.registerPartials(partialsDirectory)
//STATIC PATH FOR PUBLIC LIBRARY
app.use(express.static(publicDirectory))

// app.get('', (req,res)=>{
//     res.send('<h1>Hello World</h1>')
// })
// app.get('/help', (req, res)=>{
//     res.send({
//         name : 'Mian Bilal',
//         city : 'Bahawalpur' 
//     })
// })
const name = '  Apex Group of Industries'
app.get('', (req,res)=>{
    res.render('index',{
        title : 'Weather',
        name 
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title : 'About Page',
        name 
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title : 'Help page',
        name 
    })
})
app.get('/products', (req, res)=>{
    res.send({
        title : '50C',
        name
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.location){
        return res.send({error : 'query string missing'})
    }
    geocode(req.query.location, (errorObject, {longitude,latitude, location}={})=>{
        console.log(errorObject,longitude,latitude, location )
        if(errorObject){
            return res.send({
                errorObject           })
        }
        weatherStack(longitude,latitude, (error, {weather_description, temperature, feels_like,forecast}={})=>{
            if(error){
                res.send({
                    error
                })
            }
            res.send({
                forecast,
                location,
                weather_description,
                temperature,
                feels_like
            })
        })

        })
})

app.get('/temperature', (req,res)=>{
    if(!req.query.search){
        return res.send({
             error : 'please use a valid query string'
            })
        } else {
            res.send({
                products : [req.query]
            })
        }
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        code : 'Invalid address',
        message: 'help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        code : 'Error: '+404,
        message: 'Page not found'
    })
})

// app.get('/about', (req,res)=>{
//     res.send('<h2>Know more about us...</h2>')
// })


app.listen(port, ()=>{
    console.log('Server is listening.... on ' + port)
})
