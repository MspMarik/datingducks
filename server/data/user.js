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

    // TODO gender idk if i'm doing this? it would be better off as a button or something
    if (!gender) throw "gender must be provided";
    if (typeof gender != "string") throw "gender is not a string";

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
    if (!gender) throw "gender must be provided";
    if (typeof gender != "string") throw "gender is not a string";

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

async function getAll() {
    if (arguments.length != 0) throw "no argument needed";
    const uList = await uCollection.find({}).toArray();
    return uList;
}

async function getID(id) {
    if (!id) throw "no id provided";
    if (typeof id != "string") throw "id is not a string";
    // check if its a valid ObjectId
    if (!ObjectId.isValid(id)) throw "object id is not valid";
    const uColl = await users();
    const users = await uColl.findOne({ _id: id });
    if (users === null) throw "no user with that id";
    return users;
}

async function addLike(uid, mid) {
    //TODO
    if (!uid) throw "no id provided";
    if (typeof uid != "string") throw "user id is not a string";
    if (!mid) throw "no id provided";
    if (typeof mid != "string") throw "match id is not a string";
    if (!ObjectId.isValid(uid)) throw "user id is not valid";
    if (!ObjectId.isValid(mid)) throw "match id is not valid";
    let user = await this.getID(uid);
    //TODO check they are not there already
    if (user.likes.indexOf(mid)) throw "user is already liked";
    user.likes.push(mid);
    let userObj = {
        _id: x,
        name: user.name,
        age: user.age,
        gender: user.gender,
        email: user.email,
        pic: user.pic,
        username: user.uname,
        password: user.pword,
        bio: user.bio,
        likes: user.likes,
        dlikes: user.dlikes,
        iducks: user.iducks,
        status: user.status,
    };
    const updatedInfo = await userColl.update({ _id: id }, { $set: updatedData });
    if (updatedInfo.modifiedCount === 0) throw "could not add like successfully";
    return await this.get(uid);
    // TODO need to check to see if there is a match
}

async function checkMatch(uid, mid) {}

async function remMatch(uid, mid) {
    if (!uid) throw "no id provided";
    if (typeof uid != "string") throw "user id is not a string";
    if (!mid) throw "no id provided";
    if (typeof mid != "string") throw "match id is not a string";
}

async function updateUser(uid) {}
