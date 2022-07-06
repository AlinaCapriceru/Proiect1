import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
mongoose.connect('mongodb+srv://alinamiri:alinamiri@cluster0.e62nj.mongodb.net/posts?retryWrites=true&w=majority', {
    useNewUrlParser: true
})


const app = express();
//setting view engine to ejs
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/posts/new', (req, res) => {
    res.render('create')
});

app.post('/posts/store', (req, res) => {
    Post.create(req.body, (error, post) => {
        res.redirect('/')
    })
});


const posts = [
    { title: 'Title 1', body: 'Body 1' },
    { title: 'Title 2', body: 'Body 2' },
    { title: 'Title 3', body: 'Body 3' },
    { title: 'Title 4', body: 'Body 4' },
]
const user = {
    firstName: 'Alina',
    lastName: 'Zmeura',
}
app.get('/', (req, res) => {
    res.render('pages/index', {
        user,
        title: "Home Page",
        text: "hello"
    })
})
app.get('/articles', (req, res) => {
    res.render('pages/articles', {
        articles: posts,
        title: "Articles"
    })
})
app.get('/about', (req, res) => {
    res.render('pages/about.ejs', {
        title: "About"
    })
})
app.get('/create', (req, res) => {
    res.render('pages/create.ejs', {
        title: "Create"
    })
})

//legatura cu articolele
//app.use(express.urlencoded({ extended: false }))
//app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
})

// !!!! trebuie sa vad eroarea
// app.use('/articles', articleRouter)
//se termina legatura

//formular articol nou prima pagina
//form action = "/articles" method = "POST" 

//app.listen(3000, () => console.log("up and running..."))

app.listen(3000, async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://alinamiri:alinamiri@cluster0.e62nj.mongodb.net/test?retryWrites=true&w=majority')
        console.log("Conected to MongoDB")
    } catch (err) {
        console.error("DB connection error")
    }
    console.log("up and running")
})