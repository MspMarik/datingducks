const ObjectId = require("mongodb").ObjectId; // from geeksforgeeks
const { users } = require("../config/mongoCollections");
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const bcrypt = require("bcrypt");
const saltRounds = 16;

async function create(name, age, gender, email, pic, uname, pword, bio, likes, dlikes, status, prefs) {
    if (!name) throw "name must be provided";
    if (typeof name != "string") throw "name is not a string";
    if (name.trim().length == 0) throw "name is empty";

    if (!age) throw "age not provided";
    if (typeof age != "number") throw "age is not an int";
    if (age <= 18) throw "for legal reasons";
    if (age > 125) throw "be realistic";

    // TODO gender idk if i'm doing this? it would be better off as a button or something
    if (!gender) throw "gender must be provided";
    if (typeof gender != "string") throw "gender is not a string";

    if (!email) throw "no email provided";
    if (typeof email != "string") throw "email is not a string";
    if (email.endsWith("@stevens.edu") == false) throw "not a stevens student";

    //TODO pic but idk i will think about it
    if (!pic) throw "no pic provided";
    if (typeof pic != "string") throw "picture not a string";

    //TODO username and password but need to salt it i dont feel like doing that rn
    if (!uname) throw "username must be provided";
    if (typeof uname != "string") throw "username not a string";
    if (uname.length < 4) throw "username must be 4 characters or more";
    if (uname.length > 20) throw "username is too long";

    if (!pword) throw "password must be provided";
    if (typeof pword != "string") throw "password not a string";
    if (pword.length < 8) throw "password must be 8 characters";
    if (pword.length > 20) throw "password too long";
    const hash = await bcrypt.hash(pword, saltRounds);

    if (!bio) throw "need a bio";
    if (typeof bio != "string") throw "bio not a string";

    if (!likes) throw "likes not provided";
    if (typeof likes != "string") throw "likes not a string";
    let likesArr = likes.split(",");

    if (!dlikes) throw "likes not provided";
    if (typeof dlikes != "string") throw "likes not a string";
    let dlikesArr = dlikes.split(",");

    // TODO status should be a button?
    if (!status) throw "status not provided";
    if (typeof status != "string") throw "status must be a string";

    if (!gender) throw "gender must be provided";
    if (typeof gender != "string") throw "gender is not a string";

    if (!prefs) throw "preferences not provided";
    if (typeof prefs != "string") throw "preferences must be a string";

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
        password: hash,
        bio: bio,
        likes: likesArr,
        dlikes: dlikesArr,
        iducks: [],
        matches: [],
        status: status,
        preferences: prefs,
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

async function checkMatch(uid, mid) {
    if (!uid) throw "no id provided";
    if (typeof uid != "string") throw "user id is not a string";
    if (!mid) throw "no id provided";
    if (typeof mid != "string") throw "match id is not a string";
    if (!ObjectId.isValid(uid)) throw "user id is not valid";
    if (!ObjectId.isValid(mid)) throw "match id is not valid";
    let user1 = await this.getID(uid);
    let user2 = await this.getID(mid);
    let match = false;
    // need to check to see if they are in each others likes
    if (user1.iducks.indexOf(mid) && user2.iducks.indexOf(uid)) {
        // need to check if they are matched first
        if (!user1.matches.indexOf(mid) && !user2.matches.indexOf(uid)) {
            match = true;

            let user1Matches = user1.matches.push(mid);
            let user2Matches = user2.matches.push(uid);
            
            const updatedInfo1 = await userColl.updateOne({ _id: id }, { $set: { matches: user1Matches } });
            if (updatedInfo1.modifiedCount === 0) {
                throw "could not update matches successfully for user 1";
            }
            const updatedInfo2 = await userColl.updateOne({ _id: id }, { $set: {}matches: user2Matches });
            if (updatedInfo2.modifiedCount === 0) {
                throw "could not update matches successfully for user 2";
            }
        }
    }
    let matchObj = {
        user1: uid,
        user2: mid,
        match: match,
    };
    return matchObj;
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

    let iducksArr = user.iducks.push(mid);
    //TODO check they are not there already
    if (user.iducks.indexOf(mid) != -1) throw "user is already liked";
    
    const userColl = await users();
    const updatedInfo = await userColl.updateOne({ _id: uid }, { $set: {iducks:iducksArr} });
    if (updatedInfo.modifiedCount === 0) throw "could not add like successfully";
    // TODO need to check to see if there is a match
    return await checkMatch(uid, mid);
}

async function remMatch(uid, mid) {
    if (!uid) throw "no id provided";
    if (typeof uid != "string") throw "user id is not a string";
    if (!mid) throw "no id provided";
    if (typeof mid != "string") throw "match id is not a string";
    const userColl = await users();
    // TODO check if they are a match
    if (!user1.matches.indexOf(mid) && !user2.matches.indexOf(uid)) {
        let user1 = getID(uid);
        let user2 = getID(mid);
        let user1Matches = user1.matches.filter((user) => user != user2.id);
        let user2Matches = user2.matches.filter((user) => user != user1.id);
        let user1Ducks = user1.iducks.filter((user) => user != user2.id);
        const updatedInfo1 = await userColl.updateOne({ _id: uid }, { $set: { matches: user1Matches, iducks: user1Ducks } });
        if (updatedInfo1.modifiedCount === 0) {
            throw "could not update matches or iducks successfully for user 1";
        }
        const updatedInfo2 = await userColl.updateOne({ _id: mid }, { $set: { matches: user2Matches, iducks: user2Ducks } });
        if (updatedInfo2.modifiedCount === 0) {
            throw "could not update matches successfully for user 2";
        }
    }
    return checkMatch(uid, mid);
}

async function updateUser(id, name, age, gender, email, pic, uname, pword, bio, likes, dlikes, status, prefs) {
    if (!name) throw "name must be provided";
    if (typeof name != "string") throw "name is not a string";
    if (name.trim().length == 0) throw "name is empty";

    if (!age) throw "age not provided";
    if (typeof age != "number") throw "age is not an int";
    if (age <= 18) throw "for legal reasons";
    if (age > 125) throw "be realistic";

    // TODO gender idk if i'm doing this? it would be better off as a button or something
    if (!gender) throw "gender must be provided";
    if (typeof gender != "string") throw "gender is not a string";

    if (!email) throw "no email provided";
    if (typeof email != "string") throw "email is not a string";
    if (email.endsWith("@stevens.edu") == false) throw "not a stevens student";

    //TODO pic but idk i will think about it
    if (!pic) throw "no pic provided";
    if (typeof pic != "string") throw "picture not a string";

    //TODO username and password but need to salt it i dont feel like doing that rn
    if (!uname) throw "username must be provided";
    if (typeof uname != "string") throw "username not a string";
    if (uname.length < 4) throw "username must be 4 characters or more";
    if (uname.length > 20) throw "username is too long";

    if (!pword) throw "password must be provided";
    if (typeof pword != "string") throw "password not a string";
    if (pword.length < 8) throw "password must be 8 characters";
    if (pword.length > 20) throw "password too long";
    const hash = await bcrypt.hash(pword, saltRounds);

    if (!bio) throw "need a bio";
    if (typeof bio != "string") throw "bio not a string";

    if (!likes) throw "likes not provided";
    if (typeof likes != "string") throw "likes not a string";
    let likesArr = likes.split(",");

    if (!dlikes) throw "likes not provided";
    if (typeof dlikes != "string") throw "likes not a string";
    let dlikesArr = dlikes.split(",");

    // TODO status should be a button?
    if (!status) throw "status not provided";
    if (typeof status != "string") throw "status must be a string";

    if (!gender) throw "gender must be provided";
    if (typeof gender != "string") throw "gender is not a string";

    if (!prefs) throw "preferences not provided";
    if (typeof prefs != "string") throw "preferences must be a string";

    const userColl = await users();
    const updatedInfo = await userColl.updateOne(
        { _id: id },
        {
            $set: {
                name: name,
                age: age,
                gender: gender,
                email: email,
                pic: pic,
                username: uname,
                password: hash,
                bio: bio,
                likes: likesArr,
                dlikes: dlikesArr,
                status: status,
                preferences: prefs,
            },
        }
    );
    if (updatedInfo.modifiedCount === 0) {
        throw "could not update user";
    }
    return getID(id);
}

async function getNext(id) {
    // TODO get user collection, filter by preferences as an array
    // TODO check array length, get random number =< length
    // TODO return profile
}

module.exports = {
    create,
    getAll,
    getID,
    checkMatch,
    addLike,
    remMatch,
    updateUser,
    getNext,
};
