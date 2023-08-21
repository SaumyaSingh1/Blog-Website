import express from "express";
import mongoose from 'mongoose'; 
import bodyParser from "body-parser";
//for image upload
import multer from "multer";//for file upload
import path from "path";//to get path of file
 import _  from "lodash";//while using array to store img we compare title and send it to 
import {Post} from "./postModel.js"; // Import the Mongoose model
import {config} from "dotenv"
config();
const MongoUrl = process.env.MongoUrl;
// Get the directory path of the current module
const currentModulePath = new URL(import.meta.url).pathname;

// Set the views directory
const viewsPath = path.join(path.dirname(currentModulePath), 'views');
mongoose.connect(MongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
   writeConcern: { w: 'majority' }
}).then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log("not connected"));
const app=express();
// Set the views directory

app.set('views', viewsPath);
const port=process.env.PORT;
app.set("view engine","ejs");
//app.set("views", "D:\\Web Development\\Blog website\\views"); 
//app.set("views", "D:\\Web Development\\Blog website\\views");
app.use(express.static("public"));
// app.get("/",(req,res)=>{
// res.render("index.ejs");
// });
app.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}); // Fetch all posts from the database
    res.render("index.ejs", { posts: posts }); // Pass the posts to the view
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.render("index.ejs", { posts: [] });
  }
});

app.get("/contacts",(req,res)=>{
    res.render("contacts.ejs");

});
app.get("/about", (req, res) => {
    res.render("about.ejs");
  });

  app.post("/blog1",(req,res)=>{
   res.render("blog1.ejs");
  });
  app.post("/blog2",(req,res)=>
  {
    res.render("blog2.ejs");
  });
  app.post("/blog3",(req,res)=>{
    res.render("blog3.ejs");
  }); 
//   //for img upload by using array to store new blogs
//   let posts=[];
//   const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "_" + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage: storage });

// app.post("/newpage", upload.single("postImage"), function (req, res) {
//   const post = {
//    image: req.file ? req.file.filename : "",
//   title: req.body.postTitle,
//   content: req.body.postBody,
//  };
//    posts.push(post);

//  res.redirect("/")

// });
// app.get("/newpage", (req, res) => {
//   res.render("newpage.ejs");
// });
// // post page
// app.get("/posts/:postTitle", (req, res) => {
//   const { postTitle } = req.params;

//   const requestedPost = posts.find((post) => _.lowerCase(post.title) === _.lowerCase(postTitle));

//   if (requestedPost) {
//     res.render("posts", { post: requestedPost });
//   } else {
//     res.render("error", { errorMessage: "Post not found" });
//   }
// });
// app.post("/posts/:postTitle/delete", (req, res)=> {
//   const requestedTitle = req.params.postTitle;

//   const postIndex = posts.findIndex(function (post) {
//       return _.lowerCase(post.title) === _.lowerCase(requestedTitle);
//   });

//   if (postIndex !== -1) {
//       posts.splice(postIndex, 1);
//       res.redirect("/");
//   } else {
//       res.render("error", {
//           errorMessage: "Post not found"
//       });
//   }
// });
// app.get("/", (req, res)=> {
//   res.render("/", {
//       startingContent: homeStartingContent,
//       posts: posts
//   });
// });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
// ... Your other imports and code ...

app.get("/newpage", (req, res) => {
  res.render("newpage.ejs");
});

// ... The rest of your code ...

// Replace your /newpage POST route to save the post data to the database
app.post("/newpage", upload.single("postImage"), async function (req, res) {
  const post = new Post({
    image: req.file ? req.file.filename : "",
    title: req.body.postTitle,
    content: req.body.postBody,
  });

  try {
    await post.save();
    res.redirect("/");
  } catch (error) {
    // Handle error if the post saving fails
    console.error("Error saving the post:", error);
    res.redirect("/newpage");
  }
});

// Replace your homepage route to fetch the posts from the database
//pos
app.get("/posts/:postTitle", async(req, res) => {
    const { postTitle } = req.params;
  try{
    const requestedPost = await Post.findOne({title:postTitle});
  
    if (requestedPost) {
      res.render("posts", { post: requestedPost });
    } else {
      res.render("error", { errorMessage: "Post not found" });
    }
  }catch (error) {
      // Handle error if the database query fails
      console.error("Error fetching the post:", error);
      res.render("error", { errorMessage: "Error fetching the post" });
    }
  });
  app.post("/posts/:postTitle/delete", async(req, res)=> {
    const requestedTitle = req.params.postTitle;
  try{
    await Post.findOneAndDelete({title: requestedTitle});
        res.redirect("/");
    } catch(error){
   console.error("Error deleting the post:",error)
   res.render("error",{errorMessage:"Error deleting the post"});
    }
    
  });
app.listen(port,(req,res)=>{
console.log(`Server started at ${port}`)
});




  



