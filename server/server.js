require('dotenv').config();

const express = require('express')
const router = express.Router();
const mongoose = require("mongoose")
const https = require("https")

var multer = require('multer');        // Multer is a middleware used for handling multipart/form-data, which is primarily used for uploading files
const fs = require('fs');              // File system module
const path = require('path');          // Path module

const bodyParser = require("body-parser");      // Body parsing middleware
const session = require('express-session');     // Session management middleware
const passport = require('passport');     // Authentication middleware for Node.js 
const passportLocalMongoose = require('passport-local-mongoose');    //  Mongoose plugin for building usernames and passwords 
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const bcrypt = require('bcrypt');
const axios = require('axios');


var storage = multer.diskStorage({           // Store uploaded files with multer
    destination: (req, file, cb) => {        // Destination directory for uploaded files
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {           // Assign unique filename to uploaded files
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });     // Instantiate multer object using the defined storage configuration

const app = express();

app.set("view engine", "ejs");           // Set up EJS as the view engine
app.use(bodyParser.urlencoded({ extended: true }));       // Parse URL-encoded body higher in the middleware stack
app.use(bodyParser.json());
app.use(express.static("public"));       // Serve static files from a directory
app.use(session({                        // Set up session middleware 
    secret: "Our little secret.",         // Secret for session cookie
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());          // Initialize passport authentication middleware
app.use(passport.session());             // Use the same Passport session across multiple requests

var cors = require('cors');
app.use(cors());


app.use(express.static(__dirname + '/public'));      // Set up a static directory for Express

//Database connection
mongoose.set('strictQuery', true);              // Set strict query mode for mongoose
mongoose.connect("mongodb://localhost:27017/blogDB");  // Connect to a local MongoDB database called "blogDB"

const userSchema = new mongoose.Schema({
    id: Number,
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    phone: String,
    address1: String,
    password: String,
    status: String
});

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    img: {
        data: Buffer,
        contentType: String
    }
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);
const Post = new mongoose.model("Post", postSchema);       // Create a model named "Post" from the postSchema

passport.use(User.createStrategy());             // Use the createStrategy method to setup passport-local-mongoose strategy

// Set up serialization and deserialization of passport session support
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

var userProfile;     // Declare a global variable named userProfile to hold the profile data of an authenticated Google user

/* The following code sets up passport authentication strategy using Google OAuth 2.0. */

passport.use(new GoogleStrategy({                  // Define a new Google strategy for passport.
    clientID: process.env.CLIENT_ID,               // Use the CLIENT_ID environment variable for the Google app.
    clientSecret: process.env.CLIENT_SECRET,       // Use the CLIENT_SECRET environment variable for the Google app.
    callbackURL: "http://localhost:3000/auth/google/admin",  // The URL to redirect back after successful login.
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"  // The URL to fetch user's Google profile information.
},
    function (accessToken, refreshToken, profile, cb) {   // Callback function to be executed when an authorized Google user is returned. 
        // Takes accessToken, refreshToken, profile and cb (callback) as arguments.

        userProfile = profile;                           // Save the user's Google profile data into a global variable called userProfile.
        User.findOrCreate({ googleId: profile.id },      // Find or create a user with the given Google ID.
            function (err, user) {        // Execute a callback function that takes err and user as arguments.
                return cb(err, user);                      // Return the error and user object to the passport library.
            });
    }
));


/* Middleware function to check if a user is logged in */
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next(), true;
    } else {
        res.redirect("/login");
    }
}

/* Route for Google OAuth2 login */
app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile"] }), function (req, res) {
        //console.log(profile.username);
    }
);

/* Callback URL handler for successful authentication by Google */
app.get("/auth/google/admin",
    passport.authenticate("google", { failureRedirect: "/admin" }),
    function (req, res) {
        res.redirect("/adminPortal");
    }
);


app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"] })
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get("/getPosts", async (req, res) => {
    try {
        const allPost = await Post.find({});
        res.send({ status: "ok", data: allPost })
    } catch (e) {
        console.log(e);
    }
});


//Blog post routes 

/* Compose page route handling. Renders the compose template using EJS view */
app.route("/compose")
    .get(function (req, res) {
        res.render("compose", { user: userProfile });
    })
    .post(upload.single("image"), function (req, res) {   // Post the new blog post data and image
        const title = req.body.postTitle;
        const content = req.body.postContent;
        const newPost = new Post({
            title: title,
            content: content,
            img: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
        });
        newPost.save(function (err, post) {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/compose");          // Redirects back to the compose page for multiple posts
            }
        });
    })

/* Show individual blog posts with their full details */
app.get("/getPost/:postId", async (req, res) => {
    const postID = req.params.postId;

    try {
        const post = await Post.findOne({ _id: postID });
        res.send({ status: "ok", data: post })
    } catch (e) {
        console.log(e);
    }
});

app.route("/admin")
    .post(async function (req, res) {

        const adminEmail = req.body.adminEmail;
        const adminPass = req.body.adminPassword;

        let passHash;

        bcrypt.hash(adminPass, 10, function (err, hash) {
            if (err) {
                console.log(err);
            } else {
                passHash = hash;
            }
        });

        try {
            const user = await User.findOne({ email: adminEmail });
            if (user) {
                if (user.password === passHash) {
                    if (user.status === "admin") {
                        res.redirect("/adminPortal")
                    } else if (user.status != "admin") {
                        res.send({ message: "User is not an admin" });
                    }
                } else {
                    console.log("Wrong password");
                }
            } else if (!user) {
                res.send({ status: "ok", message: "Incorrect username" });
            }
        } catch (e) {
            console.log(e);
        }
    })

app.post("/getuser", async (req, res) => {
    const email = req.body.email;

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            res.json({ foundUser: true, user: user });
        } else {
            res.json({ foundUser: false })
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });

    }
});

app.get("/getTeam", async (req, res) => {
    try {
        const team = await User.find({});
        if (team) {
            res.json({ foundTeam: true, team: team });
        } else {
            res.json({ foundTeam: false })
        }

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.route("/newuser")
    .post(async function (req, res) {

        const id = req.body.id;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const username = req.body.username; //Change this variable when front end is complete
        const email = req.body.email;
        const phone = req.body.phone;
        const address1 = req.body.address1;
        const password = req.body.password;
        const status = req.body.status;


        User.create({ id: id, firstName: firstName, lastName: lastName, username: username, email: email, phone: phone, address1: address1, password: password, status: status });
    })

app.route("/updateUser")
    .post(function (req, res) {
        const id = req.body.id;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const username = req.body.username; //Change this variable when front end is complete
        const email = req.body.email;
        const phone = req.body.phone;
        const address1 = req.body.address1;
        const status = req.body.status;

        // console.log(id, firstName, lastName, username, email, phone, address1, status);

        User.updateOne({
            id: id,
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            phone: phone,
            address1: address1,
            status: status
        });
        console.log("Finished updating")
    })

app.route("/adminPortal")
    .get(function (req, res) {
        res.render("")
    })


app.listen(5001, () => {
    console.log("Server started on port 5001")
});