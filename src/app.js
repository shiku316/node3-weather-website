const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//express config
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname , "../templates/views")
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handle bars
app.set('view engine',  'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirectoryPath))
const port = process.env.PORT || 3000

app.get('', (req,res) =>{
    res.render('index',{
        title:"Weather",
        name:"George"
    })
})

app.get('/about', (req,res) =>{
    res.render('about',{
        title:"About Me",
        name:"George"
    })
})

app.get('/help', (req,res) =>{
    res.render('help',{
        title:"Help Page",
        name:"George"
    })
})

//app.com/weather
app.get('/Weather',(req,res) =>{
   if(!req.query.address){
        return res.send({
            error:"you must provide an address!"
        })
   }

   geocode(req.query.address, (error,{latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
        })
    })
})



app.get('/products', (req,res)=>{
    if(!req.query.search){
       return res.send({
            Error: 'You Must provide a search term'
        })
    }
    res.send({
        products:[]
    })
    console.log(req.query)
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: "404",
        messageError:'Article not found',
        name:"George"
        })
    })

app.get('*',(req,res)=>{
    res.render('404',{
        title: "404",
        messageError:'Page not found',
        name:'George'
        })

})



app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})