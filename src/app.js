const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geoCode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config.
const publicDir = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname, '../templates/views');
const partialsDirPath = path.join(__dirname, '../templates/partials')

// Define Template Engine.
app.set('view engine', 'hbs');
app.set('views', viewsDirPath);
hbs.registerPartials(partialsDirPath);

// Static Dir to use
app.use(express.static(publicDir));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'home',
    name: 'AbdElRahman Mostafa'
  })
});

app.get('/weather', (req, res)=> {
  if(!req.query.address) {
    return res.send({
      error: 'Error please add your address'
    })
  } else {
    geoCode(req.query.address, (errorGeo, {long, lat, country} = {}) => {
      if(errorGeo) {
        return res.send( {error: errorGeo} );
      } else {
        forecast(long, lat, (error, data) => {
          if(error) {
            return res.send({error: error});
          } else {
            res.send({
              error: error,
              forecast: data,
              location: country,
              address: req.query.address,
            })
          }
        });
      }
    })
  }
})

app.get('/help', (req, res)=> {
  res.render('help', {
    title: 'Help',
    name: 'Abdo'
  })
})

app.get('/about', (req, res) => {
  res.render('about',{
    title: 'About',
    name: 'Abdo',
  })
})

app.get('/help/*', (req, res)=> {
  res.render('404', {
    title: 'Opps! Error Help has no article',
    message: 'haha to help'
  })
})

app.get('*', (req, res)=> {
  res.render('404', {
    title: 'Our page is not found!',
    message: 'haha to anything'
  })
})

app.listen(port, ()=> {
  console.log("Server is Opened!")
})