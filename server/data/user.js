const ObjectId = require("mongodb").ObjectId; // from geeksforgeeks
const mongoCollections = require("../config/mongoCollections");
const user = mongoCollections.user;

async function create(name, age, gender, email, pic, uname, pword, about, likes, dlikes, iducks, status) {
    if (arguments.length != 12) throw "not enough arguments";
    //name
    if (!name) throw "name must be provided";
    if (typeof name != "string") throw "name is not a string";
    if (name.trim().length == 0) throw "name is empty";
    //age
    if (!age) throw "age not provided";
    if (typeof age != "int") throw "age is not an int";
    //gender
    // TODO idk if i'm doing this? it would be better off as a button or something
    if (!email) throw "no email provided";
    if (typeof email != "string") throw "email is not a string";
    if (email.endsWith("@stevens.edu") == false) throw "not a stevens student";
}
