if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const bodyparser = require('body-parser') 
const express = require("express") 
const path = require('path') 
const app = express() 
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('be62d0d26ca5409787ce10b237890536');
var search; 

var left_results = [];


// View Engine Setup 
//app.set("views", path.join(__dirname)) 
//app.set("view engine", "ejs") 
  
// Body-parser middleware 
app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json()) 

app.get("/saveData", function(req, res){ 
    res.render("SampleForm") 
}); 
   
app.post('/saveData', (req, res) => { 
    console.log("Using Body-parser: ", req.body.email) 
     search = req.body.email
     console.log(search)
    
     newsapi.v2.topHeadlines({
        sources: 'fox-news', //CNN
        q: search,
        
        language: 'en',
     
      }).then(response => {
     // console.log(response);
  //      left_results = response;
          left_results = []


        console.log(response.articles[0].author)
        const articles = response.articles

        for(let i =0; i < articles.length; i++){
   
          let newObject = {
            title: articles[i].title,
            author: articles[i].author,
            url: articles[i].url
          }

      //    console.log(newObject)
          left_results.push(newObject)

        }
        console.log({left_results})
      });

      newsapi.v2.topHeadlines({
        sources: 'fox-news',
        q: search,
        
        language: 'en',
     
      }).then(response => {
        console.log( response)
        right_results = response;
        /*
          {
            status: "ok",
            articles: [...]
          }
        */
      });
     
   
      
    })
    app.get('/searchresults', (req, res) => {
      res.render('searchresults.html')
  
  })
  
  app.post('/searchresults', (req, res) => {
      res.render('searchresults.html')
  } )



//Static Files

app.use(express.static('MiddleGround'))

app.listen(3000, () => {
    console.log('Server Started')

})






