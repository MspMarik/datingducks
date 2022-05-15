const connection = require("../config/mongoConnection");
// const data = require("../data/");
const users = require("../data/user");

async function main() {
    const db = await connection.connectToDb();
    await db.dropDatabase();

    const user1 = await users.create("Patrick Hill", 18, "Drake (Male)", "phill@stevens.edu", "pic", "graffixnyc", "password", "a pretty cool professor", "css", "react", "quacktonic", ["Any"]);
    const user2 = await users.create("Brianna Ellis", 21, "Hen (Female)", "bri@stevens.edu", "pic", "sorrel", "tiramisu", "the sims, great scrabble player", "css", "react", "quacktonic", ["Any"]);
    const user3 = await users.create("Mark Spivak", 20, "Drake (Male)", "msp@stevens.edu", "pic", "mspmarik", "briisthebest", "ok scrabble player", "scrabble", "bad almond milk", "quacktonic", ["Any","Drake (Male)"]);
    const user4 = await users.create("Jan Del Rosario", 21, "Drake (Male)", "jan@stevens.edu", "pic", "corgis", "dogsaresocute", "average scrabble player", "scrabble", "weird old couples", "requacktionship", ["Hen (Female)", "Drake (Male)"]);
    const user5 = await users.create("Faraz Pathan", 21, "Drake (Male)", "farpath20@stevens.edu", "pic", "farpath20", "farpath20", "terrible scrabble player", "scrabble, being a loser", "not getting ran over", "down to duck", ["Hen (Female)","Drake (Male)"]);
    const user6 = await users.create("Zane ThummBorst", 21, "Drake (Male)", "zane@stevens.edu", "pic", "poomba", "goomba884", "coldstone stole my wallet", "coldstone", "coldstone thief", "down to duck", ["Hen (Female)"]);
    const user7 = await users.create("Luke Skywalker", 25, "Drake (Male)", "luke@stevens.edu", "pic", "lukesky", "bluemilk747", "daddy issues", "blue milk", "my dad", "quacktonic", ["Hen (Female)"]);
    const user8 = await users.create("Leia Organa", 25, "Hen (Female)", "leia@stevens.edu", "pic", "princessleia", "ilovehansolo", "you're my only hope :)", "light freighters", "darth vader", "requacktionship", ["Drake (Male)"]);
    const user9 = await users.create("Padme Amidala", 21, "Hen (Female)", "amidala@stevens.edu", "pic", "queenamidala", "ani123456", "Best Dressed in the Galaxy", "deception, dopplegangers", "death, the darkside", "requacktionship", ["Drake (Male)"]);
    const user10 = await users.create("Alina Starkov", 18, "Hen (Female)", "astarkov@stevens.edu", "pic", "sunsummoner", "themeadow", "Just your average mapmaker", "waffles", "the darkling", "requacktionship", ["Drake (Male)"]);
    const user11 = await users.create("Penelope Garcia", 36, "Hen (Female)", "hacker@stevens.edu", "pic", "linuxqueen", "myguiisgr8", "I'm probably going to hack you", "linux, fluffy pens, cute things, derek morgan", "criminals, unorganized files, the guy who shot me", "requacktionship", ["Drake (Male)"]);
    const user12 = await users.create("Jennifer Jareau", 37, "Hen (Female)", "jj@stevens.edu", "pic", "thejjbau", "Henry20050101", "Media Liason for the Behavioral Analysis Unit", "my son Henry, Penelope, happy endings", "criminals, news leaks", "quacktonic", ["Drake (Male)"]);
    const user13 = await users.create("Emily Prentiss", 38, "Hen (Female)", "empren@stevens.edu", "pic", "emilyp", "baufbiunitagentcool", "Behavioral Analysis Unit Agent", "ice cream, vacations, long walks on the beach", "criminals, creeps", "requacktionship", ["Drake (Male)"]);
    const user14 = await users.create("Jabba the Hutt", 123, "goose", "jabba@stevens.edu", "pic", "jabbajabba", "princessleia", "You know who I iz.", "Princess Leia", "Han Solo", "down to duck", ["Hen (Female)"]);
    const user15 = await users.create("Jar Jar Binks", 23, "Drake (Male)", "jarjar@stevens.edu", "pic", "mesajarjar", "gunganbestcity", "Mesa called Jar Jar Binks, mesa your humble servant!", "Gungan, politics, swamps", "sith lords", "quacktonic", ["Hen (Female)"]);
    const user16 = await users.create("R2-D2", 30, "goose", "r2-d2@stevens.edu", "pic", "artoo-detoo", "back2naboo", "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWWWW!!!", "Anakin, Luke, Padme, Leia, Han, Chewie", "not being updated, old firmware, needing maintenance", "quacktonic", ["Any"]);
    await connection.closeConnection();
    console.log("Done!");
}

main().catch((error) => {
    console.log(error);
});
