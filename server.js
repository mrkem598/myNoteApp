// backend
//dependencies
var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var logger = require("morgan");
//tell we are using express
var app = express();
//Set the app up with morgan, body-parser, and a static folder
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended:false
}));
app.use(express.static("public"));
//database configration'
var databaseUrl = "week18day2";
var collections = ["notes"];
//hook mongojs config to db variables
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log(error);
});
//Routes
app.get("/", function(req, res){
  res.send(index.html);
});
//route to save a note on the db's collection
app.get("/submit", function(req, res) {
  console.log(req.body);
  //insert the note into the notes collection
  db.notes.insert(req.body, function(error, saved) {
    if (error){
      console.log(error);
    }
    else res.send(saved);
  })
});


// 2. Retrieve all notes from the database's collection
// ====================================================
app.get("/all", function(req, res) {
  // find all notes in the collection
  db.notes.find({}, function(error, found) {
    if(error){
      console.log(error)
    }else{
      res.json(found);
  }
});
});
// 3. Retrieve one note in the database's collection by it's ObjectId
app.get("/find/:id", function(req, res){

// TIP: when searching by an id, the id needs to be passed in
// as (mongojs.ObjectId(IDYOUWANTTOFIND))
db.note.findOne({"_id": mongojs.ObjectId(req.params.id)
}, function(error, found){
  if(error) {
    console.log(error);
    res.send(error);
  }
  else{
    console.log(found);
    res.send(found);

  }
});
});
// ==================================================================
// 4. Update one note in the database's collection by it's ObjectId
// (remember, mongojs.ObjectId(IDYOUWANTTOFIND)
app.get("/update/_id", function(req, res){
  db.notes.update({"_id": mongojs.ObjectId(req.params.id)},
function (error, edited){
  if(error){
    console.log(error);
    res.send(edited);
}
  });
});

// ================================================================
// 5. Delete one note from the database's collection by it's ObjectId
// (remember, mongojs.ObjectId(IDYOUWANTTOFIND)
app.get("/delete/_id", function(req, res) {
  db.notes.deleteOne({"_id": mongojs.ObjectId(req.params.id)
}, function(error, removed){
  if(error){
    console.log(error);
    res.send(error);
  }
  else{
    console.log(removed);
    res.send(removed);
  }
});
});
// ==================================================================
// 6. Clear the entire note collection
app.get("/clearall", function(req, res){
  db.notes.remove({}, function(req, res){
    if(error) {
      console.log(error);
      res.send(error);
    }
    else {
      console.log(response);
      res.send(response);
    }
  });
});
// ===================================

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
