const express = require("express")
const path = require("path")
const app = express()
const LogInCollection = require("./mongo");
const port = process.env.PORT || 5000
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const templatePath = path.join(__dirname, '../templates') // Corrected the path name
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', templatePath) // Corrected the directory name
app.use(express.static(publicPath))

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/', (req, res) => {
    res.render('login')
})

app.post('/signup', async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            password: req.body.password
        }

        const checking = await LogInCollection.findOne({ name: req.body.name })

        if (checking && checking.password === req.body.password) {
            return res.send("User details already exist");
        } else {
            await LogInCollection.create(data);
        }

        res.status(201).render("home", { naming: req.body.name });
    } catch (error) {
        console.error("Error signing up:", error);
        res.send("An error occurred during signup");
    }
})

app.post('/login', async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check && check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
        } else {
            res.send("Incorrect username or password")
        }
    } catch (error) {
        console.error("Error logging in:", error);
        res.send("An error occurred during login");
    }
})

app.listen(port, () => {
    console.log('port connected');
})
