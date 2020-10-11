newsapi.v2.topHeadlines({
    sources: 'bbc-news,the-verge',
    q: [search],
    
    language: 'en',
 
  }).then(response => {
    console.log(response);
    /*
      {
        status: "ok",
        articles: [...]
      }
    */
  });