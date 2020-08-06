const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')     //needed to set handlebars
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Atul deo'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Atul Deo'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title: 'Help',
        helpText: 'Communtiy is here to help you !!!',
        name: 'Atul Deo'
    })
})

app.get('/products',(req, res) => {
    if (!req.query.search)
    {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })

})

app.get('/weather',(req, res) => {
    if (!req.query.address)
    {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address,(error, {latitude, longitude, location } = {} ) =>{
        if (error) 
        {
            return res.send(error)
        }
            forecast(latitude,longitude, (error, forecastData) => {
                if (error)
                {
                    return res.send(error)
                }

                res.send({
                forecast: forecastData,
                location,
                address: req.query.address
                })
              })
        })

})

app.get('/help/*',(req, res) =>{
    res.render('404',{
        title: '404',
        errorMessage: 'Help Page not found',
        name: 'Atul Deo'
    })
})

app.get('*',(req, res) =>{
    res.render('404',{
        title: '404',
        errorMessage: 'Page not found',
        name: 'Atul Deo'
    })
})

app.listen(port, () =>
{
    console.log('Server running at port ' + port)
})

