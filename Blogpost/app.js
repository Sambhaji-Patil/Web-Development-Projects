// app.js
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

// Render home page
app.get("/", (req, res) => {
  res.render("home.ejs", { posts });
});

// Render add post page
app.get("/add", (req, res) => {  
  res.render("add_post.ejs");
});

// Handle form submission to add a new post
app.post("/add", (req, res) => {
  res.redirect("/add");
  const newPost = {
    id: Date.now(), // Generate unique ID for the post
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(newPost);
   // Redirect to home page after adding the post
});

// Render edit post page
app.get("/edit/:postId", (req, res) => {
  const postId = req.params.postId;
  const postToEdit = posts.find(post => post.id === parseInt(postId));
  if (postToEdit) {
    res.render("edit_post.ejs", { post: postToEdit });
  } else {
    res.redirect("/");
  }
});

// Handle form submission to edit a post
app.post("/edit/:postId", (req, res) => {
  const postId = req.params.postId;
  const postToEdit = posts.find(post => post.id === parseInt(postId));
  if (postToEdit) {
    postToEdit.title = req.body.postTitle;
    postToEdit.content = req.body.postBody;
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

// Handle deleting a post
app.get("/delete/:postId", (req, res) => {
  const postId = req.params.postId;
  posts = posts.filter(post => post.id !== parseInt(postId));
  res.redirect("/");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
