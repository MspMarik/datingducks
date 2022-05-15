const ObjectId = require("mongodb").ObjectId; // from geksforgeeks

const mongoCollections = require("../config/mongoCollections");
const users2 = mongoCollections.users;
const bcrypt = require("bcrypt");
const saltRounds = 4;

async function create(name, age, gender, email, pic, uname, pword, bio, likes, dlikes, status, prefs) {
    if (!name) throw "name must be provided";
    if (typeof name != "string") throw "name is not a string";
    if (name.trim().length == 0) throw "name is empty";

    if (!age) throw "age not provided";
    if (typeof age != "number") throw "age is not an int";
    if (age < 18) throw "for legal reasons";
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
    if (!Array.isArray(prefs)) throw "preferences must be an array";

    const userColl = await users2();
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
    const user = await getID(String(newId));
    return user;
    //returns user or user id i don't remember lol
}

async function getAll() {
    if (arguments.length != 0) throw "no argument needed";
    let uCollection = await users2();
    const uList = await uCollection.find({}).toArray();
    return uList;
}

async function getID(id) {
    if (!id) throw "no id provided";
    if (typeof id != "string") throw "id is not a string";
    // check if its a valid ObjectId
    if (!ObjectId.isValid(id)) throw "object id is not valid";
    const uColl = await users2();
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
    let user1 = await getID(uid);
    let user2 = await getID(mid);
    let match = false;
    const userColl = await users2();
    // need to check to see if they are in each others likes
    if (user1.iducks.indexOf(mid) != -1 && user2.iducks.indexOf(uid) != -1) {
        // need to check if they are matched first
        if (user1.matches.indexOf(mid) == -1 && user2.matches.indexOf(uid) == -1) {
            match = true;
            user1.matches.push(mid);
            user2.matches.push(uid);
            let user1Matches = user1.matches;
            let user2Matches = user2.matches;

            const updatedInfo1 = await userColl.updateOne({ _id: uid }, { $set: { matches: user1Matches } });
            if (updatedInfo1.modifiedCount === 0) {
                throw "could not update matches successfully for user 1";
            }
            const updatedInfo2 = await userColl.updateOne({ _id: mid }, { $set: { matches: user2Matches } });
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
    let user = await getID(uid);
    //TODO check they are not there already
    if (user.iducks.indexOf(mid) != -1) throw "user is already liked";
    user.iducks.push(mid);
    let iducksArr = user.iducks;

    const userColl = await users2();
    const updatedInfo = await userColl.updateOne({ _id: uid }, { $set: { iducks: iducksArr } });
    if (updatedInfo.modifiedCount === 0) throw "could not add like successfully";
    // TODO need to check to see if there is a match
    return await checkMatch(uid, mid);
}

async function remMatch(uid, mid) {
    if (!uid) throw "no id provided";
    if (typeof uid != "string") throw "user id is not a string";
    if (!mid) throw "no id provided";
    if (typeof mid != "string") throw "match id is not a string";
    const userColl = await users2();
    // TODO check if they are a match
    let user1, user2;
    try {
        user1 = await getID(uid);
        user2 = await getID(mid);
    } catch (e) {
        throw e;
    }
    if (user1.matches.indexOf(mid) != -1 && user2.matches.indexOf(uid) != -1) {
        let user1Matches = user1.matches.filter((user) => user != user2._id);
        let user2Matches = user2.matches.filter((user) => user != user1._id);
        let user1Ducks = user1.iducks.filter((user) => user != user2._id);
        let user2Ducks = user2.iducks.filter((user) => user != user1._id);
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
    /*let oldprof;
    try{
       oldprof=await getID(id)
    }
    catch(e)
    {
        throw e;
    }*/
    //Possible errors likes and dislikes can recieve arrays maybe
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

    const userColl = await users2();
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
    return await getID(id);
}

async function getNext(id) {
    const user = await getID(id);
    const userList =  await getAll();
    let resArr = [];

    // if the user has no preference, everyone could be a potential profile
    // TODO get user collection, filter by preferences as an array
    if (user.preferences.includes("Any") == false) {
        userList.forEach((u) => {
            if (user.preferences.includes(u.gender)) {
                // check to see if the user prefers the current user
                resArr.push(u);
            }
        });
    } else {
        resArr = userList;
    }
    for (let i = 0; i < resArr.length; i++) {
        if(!(resArr[i]._id == id)){
            if (resArr[i].preferences.includes(user.gender) == false) {
                // if the user1 is not a pref of the user in the array, remove from the arr
                resArr.splice(i, 1);
                i--;
           }
        }
    }

    // TODO check array length, get random number =< length
    let num = Math.floor(Math.random() * (resArr.length + 1));
    let show = await getID(resArr[num]._id);

    return show;
    // TODO return profile ^
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
