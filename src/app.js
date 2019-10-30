const express = require('express');
const path = require('path');
const hbs = require('hbs');

//user modules
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;
//define path of express configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials')
//setup handlebar and view location

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//routes are setup here

app.get('/', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Tanmay Maity'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about Me',
        name: 'Tanmay Maity'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: "have you tried on and off",
        title: "help",
        name: "tanmay maity"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Must send a location to fetch details"
        })
    }

    const address = req.query.address;
    //weather logic goes here
    geocode(address, (error, {
        latitude,
        longtitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error: "something went wrong"
            })
        }
        forecast(latitude, longtitude, (error, foreCastData) => {
            if (error) {
                return res.send({
                    error: 'something went wrong'
                })

            }
            res.send({
                forecast: foreCastData,
                location: location,
            })

        })

    })


})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMsg: 'helppage not found',
        title: '404',
        name: "tanmay maity"
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        errorMsg: "No article found",
        title: "404",
        name: "tanmay maity"
    })
})
app.listen(port, () => {
    console.log('server is up on port ' + port)
})