const ObjectId = require("mongodb").ObjectId; // from geeksforgeeks
const { users } = require("../config/mongoCollections");
const mongoCollections = require("../config/mongoCollections");
const user = mongoCollections.user;

async function create(name, age, gender, email, pic, uname, pword, bio, likes, dlikes, status) {
    if (arguments.length != 11) throw "not enough arguments";

    if (!name) throw "name must be provided";
    if (typeof name != "string") throw "name is not a string";
    if (name.trim().length == 0) throw "name is empty";

    if (!age) throw "age not provided";
    if (typeof age != "int") throw "age is not an int";

    // TODO idk if i'm doing this? it would be better off as a button or something

    if (!email) throw "no email provided";
    if (typeof email != "string") throw "email is not a string";
    if (email.endsWith("@stevens.edu") == false) throw "not a stevens student";

    //TODO pic but idk i will think about it

    //TODO username and password but need to salt it i dont feel like doing that rn

    if (!bio) throw "need a bio";
    if (typeof bio != "string") throw "bio not a string";

    if (!likes) throw "likes not provided";
    if (typeof likes != "string") throw "likes not a string";

    if (!dlikes) throw "likes not provided";
    if (typeof dlikes != "string") throw "likes not a string";

    // TODO status should be a button?

    const userColl = await users();
    const ifExist = await userColl.findOne({ name: name, email: email, username: uname });
    if (ifExist != null) throw "user already exists";
    let { ObjectId } = require("mongodb");
    let newObjId = ObjectId();
    let x = newObjId.toString();
    let userObj = {
        _id: x,
        name: name,
        age: age,
        gender: gender,
        email: email,
        pic: pic,
        username: uname,
        password: pword,
        bio: bio,
        likes: likes,
        dlikes: dlikes,
        iducks: [],
        status: status,
    };
    const insertInfo = await userColl.insertOne(userObj);
    if (insertInfo.insertedCount === 0) throw "could not add user";
    const newId = insertInfo.insertedId;
    const user = await this.get(String(newId));
    return user;
    //returns user or user id i don't remember lol
}
