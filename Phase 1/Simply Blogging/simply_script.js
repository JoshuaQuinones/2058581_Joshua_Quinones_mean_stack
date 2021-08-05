let articles = new Array() //create array to store articles as objects
function addBlog()
{
    let articleTitle = document.getElementById("titleBox").value;
    let articleBody = document.getElementById("articleBox").value;
    let articleImage = document.getElementById("imageBox").value;
    //validate input
    if (articleTitle.length==0 || articleBody.length==0)
    {
        alert("Cannot add blog: Title and Article fields cannot be empty");
        return;
    }
    let newArticle = {title:articleTitle,body:articleBody,image:articleImage};
    //turn to string to store in array
    newArticle = JSON.stringify(newArticle);
    articles.unshift(newArticle); //add to front of array so new articles are displayed first
    displayBlogs();
}


function displayBlogs()
{
    //empty the current innerHTML since we will rebuild from scratch
    document.getElementById("blog_display").innerHTML = "";
    let newHtml = "";
    //For each blog, create a div tag containing a bootstrap card that contains the blog information
    for (let i = 0; i < articles.length; i++)
    {
        let current = JSON.parse(articles[i])
        if (current.image.length == 0) //if there is no image link, do not attempt to display
        {
            newHtml += "<div class='col-4'>" +
            "<div class='card'><div class='card-body'><h5 class='card-title'>" + current.title + 
            "</h5><p class='card text'>" + current.body + 
            "</p></div></div></div>";
        }
        else //image text has been entered. Attempt to display
        {
            newHtml += "<div class='col-4'>" +
            "<div class='card'><div class='card-body'><h5 class='card-title'>" + current.title + 
            "</h5><p class='card text'>" + current.body + 
            "</p></div><img class='card-img-bottom' src='" + current.image +
            "' alt='Card image cap'></div></div>";
        }
    }
    //replace the innerHTML with the string created by the loop to display all blogs from newest to oldest
    document.getElementById("blog_display").innerHTML = newHtml;
}