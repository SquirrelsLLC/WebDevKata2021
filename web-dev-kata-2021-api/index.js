const express = require('express')
const moment = require('moment')
const cors = require('cors')
const app = express()
const port = 3000

var allowedOrigins = ['http://localhost:8080'];
app.use(cors({
    origin(origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) { return callback(null, true); }
        if (allowedOrigins.indexOf(origin) === -1) {
            let msg = `The CORS policy for this site (${allowedOrigins.toString()}) does not allow access from the specified Origin "${origin}".`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

//https://materialdesignicons.com/
app.get('/dashboard', (req, res) => {
    const date1 = new moment().format('YYYY.MM.DD');;
    const date2 = new moment().add(1, 'days').format('YYYY.MM.DD');
    const date3 = new moment().add(2, 'days').format('YYYY.MM.DD');
    
    const todayData =
    {
        today: {
            date: date1,
            summary: {
                precipitation: {
                    probability: 0.80,
                    weatherType: 'weather-lightening-rainy'
                },
                temperature: {
                    high:{f:46, c: 7.777},
                    low: {f:26, c: -3.333}
                },
                description: 'Snow showers. Low 9F. Winds light and variable. Chance of snow 60%. Snowfall around one inch.'
            },
            am: {
                precipitation: {
                    probability: 0.60,
                    weatherType: 'weather-snowy'
                },
                temperature: {
                    high:{f:32, c: 0.000},
                    low: {f:26, c: -3.333}
                },
                description: 'Snow showers. Winds light and variable. Chance of snow 60%. Snowfall around one inch.'
            },
            pm: {
                precipitation: {
                    probability: 0.80,
                    weatherType: 'weather-lightening-rainy'
                },
                temperature: {
                    high:{f:46, c: 7.777},
                    low: {f:32, c: 0}
                },
                description: 'Thunderstorms likely',
                notification: {
                    title: 'THUNDERSTORM WARNING',
                    county: 'Stark',
                    description: 'The Squirrels Weather Service (SWC) has issues a severe thunderstorm warning for Stark County until 10pm',
                    weatherType: 'weather-lightening-rainy'
                }
            }
        },
        next48: [
            {
                date: date2,
                summary: {
                    precipitation: {
                        probability: 0.02,
                        weatherType: 'weather-sunny'
                    },
                    temperature: {
                        high:{f:53, c: 11.666},
                        low: {f:33, c: 0.555}
                    },
                    description: 'Sunny spring like day'
                },
                am: {
                    precipitation: {
                        probability: 0.02,
                        weatherType: 'weather-sunny'
                    },
                    temperature: {
                        high:{f:48, c: 8.888},
                        low: {f:33, c: 0.555}
                    },
                    description: 'Sunny spring like day'
                },
                pm: {
                    precipitation: {
                        probability: 0.02,
                        weatherType: 'weather-sunny'
                    },
                    temperature: {
                        high:{f:53, c: 11.666},
                        low: {f:47, c: 8.333}
                    },
                    description: 'Sunny spring like evening.'
                }
            },
            {
                date: date3,
                summary: {
                    precipitation: {
                        probability: 0.25,
                        weatherType: 'winweather-windy'
                    },
                    temperature: {
                        high:{f:63, c: 17.222},
                        low: {f:52, c: 11.111}
                    },
                    description: 'Windy start with a low chance of precipitation clearing towards the evening.'
                },
                am: {
                    precipitation: {
                        probability: 0.25,
                        weatherType: 'weather-windy'
                    },
                    temperature: {
                        high:{f:55, c: 12.777},
                        low: {f:52, c: 11.111}
                    },
                    description: 'Windy with a 23% chance of rain.'
                },
                pm: {
                    precipitation: {
                        probability: 0.05,
                        weatherType: 'weather-sunny'
                    },
                    temperature: {
                        high:{f:63, c: 17.222},
                        low: {f:55, c: 12.777}
                    },
                    description: 'Chance of wind clearing through the day bring warm tempatures and sunshine.'
                }
            }
        ]
    }

    res.send(todayData);
  })

  app.get('/today', (req, res) => {
    const date1 = new moment().format('YYYY.MM.DD');
    let temp = 26;
    
    const hourlyData = []

    for(let i = 0; i<=24; i++) {
        let weatherType = 'weather-snowy';
        weatherType = i > 10 ? 'weather-windy' : weatherType;
        weatherType = i > 15 ? 'weather-lightening-rainy' : weatherType;

        let probability = .60
        probability = i > 10 ? .05 : probability;
        probability = i > 15 ? .80 : probability;

        const tempC = (((temp + i) - 32) * (5/9)).toFixed(3);

        //32°F − 32) × 5/9 
        hourlyData.push({
            hour:i,
            summary: {
                precipitation: {
                    probability: 0.80,
                    weatherType: weatherType
                },
                temperature: {
                    high:{f:temp+i, c: tempC},
                    low: {f:temp+i, c: tempC}
                }
            },
        });
    }

    const todayData =
    {
        today: {
            date: date1,
            summary: {
                precipitation: {
                    probability: 0.80,
                    weatherType: 'weather-lightening-rainy'
                },
                temperature: {
                    high:{f:46, c: 7.777},
                    low: {f:26, c: -3.333}
                },
                description: 'Snow showers. Low 9F. Winds light and variable. Chance of snow 60%. Snowfall around one inch.'
            },
            hourly: hourlyData
        },
    }

    res.send(todayData);
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})