const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

//start the express server
const app = express();

//__dirname provides path till the the dir in which app.js file is
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set the engine which is to load
app.set('view engine', 'hbs')
app.set('views', viewsPath) //changing default views folder which live in home directory 
hbs.registerPartials(partialsPath) //setting path to load files with partial html

//used to load static files
app.use(express.static(publicDirectoryPath));

//rendering hbs file
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Anas"
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: "Anas",
        title: "Help page"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        name: "Anas",
        title: "About Me"
    })
})

app.get('/weather', (req, res) => {
    const location = req.query.search;

    if (!location) {
        return res.send({
            error: "You must provide a address"
        })
    }

    geocode(location, (error, {latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                location,
                Forecast: data,
            });
        });
    });
});

//matches anything after help
app.get('/help/*', (req, res) => {
    res.render('404', {
        error: "help article not found"
    })
})

//matches for any page that has not been defined up above
app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Anas",
        error: "page not found"
    })
})

//listen on port 
app.listen(port, () => {
    console.log("Server is up on port "+ port);
});