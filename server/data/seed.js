const connection = require("../config/mongoConnection");
const data = require("../data/");
const users = require("./user.js");

async function main() {
    const db = await connection.connectToDb();
    await db.dropDatabase();

    const user1 = await users.create("Patrick Hill", 18, "drake", "phill@stevens.edu", "pic", "graffixnyc", "password", "a pretty cool professor", "css", "react", "quacktonic");
    const user2 = await users.create("Brianna Ellis", 21, "hen", "bri@stevens.edu", "pic", "sorrel", "tiramisu", "the sims, great scrabble player", "css", "react", "quacktonic");
    const user3 = await users.create("Mark Spivak", 20, "drake", "msp@stevens.edu", "pic", "mspmarik", "bri", "ok scrabble player", "scrabble", "bad almond milk", "quacktonic");
    const user4 = await users.create("Jan Del Rosario", 21, "drake", "jan@stevens.edu", "pic", "corgi", "thedog", "average scrabble player", "scrabble", "weird old couples", "requacktionship");
    const user5 = await users.create("Faraz Pathan", 21, "drake", "farpath20@stevens.edu", "pic", "farpath20", "farpath20", "terrible scrabble player", "scrabble, being a loser", "not getting ran over", "down to duck");
    const user6 = await users.create("Zane ThummBorst", 21, "drake", "zane@stevens.edu", "pic", "poomba", "goomba", "coldstone stole my wallet", "coldstone", "coldstone thief", "down to duck");
    const user7 = await users.create("Luke Skywalker", 25, "drake", "luke@stevens.edu", "pic", "luke", "bluemilk", "daddy issues", "blue milk", "my dad", "quacktonic");
    const user8 = await users.create("Leia Organa", 25, "hen", "leia@stevens.edu", "pic", "leia", "hansolo", "you're my only hope :)", "light freighters", "darth vader", "requacktionship");
    const user9 = await users.create("Padme Amidala", 21, "hen", "amidala@stevens.edu", "pic", "queenamidala", "ani123456", "Best Dressed in the Galaxy", "deception, dopplegangers", "death, the darkside", "requacktionship");
    const user10 = await users.create("Alina Starkov", 17, "hen", "astarkov@stevens.edu", "pic", "sunsummoner", "themeadow", "Just your average mapmaker", "waffles", "the darkling", "requacktionship");
    const user11 = await users.create("Penelope Garcia", 36, "hen", "hacker@stevens.edu", "pic", "linuxqueen", "myguiisgr8", "I'm probably going to hack you", "linux, fluffy pens, cute things, derek morgan", "criminals, unorganized files, the guy who shot me", "requacktionship");
    const user12 = await users.create("Jennifer Jareau", 37, "hen", "jj@stevens.edu", "pic", "thejj", "henry20050101", "Media Liason for the Behavioral Analysis Unit", "my son Henry, Penelope, happy endings", "criminals, news leaks", "quacktonic");
    const user13 = await users.create("Emily Prentiss", 38, "hen", "empren@stevens.edu", "pic", "emilyp", "baufbiunitagentcool", "Behavioral Analysis Unit Agent", "ice cream, vacations, long walks on the beach", "criminals, creeps", "requacktionship");
    const user14 = await users.create("Jabba the Hutt", 213, "goose", "jabba@stevens.edu", "pic", "jabbajabba", "princessleia", "You know who I iz.", "Princess Leia", "Han Solo", "down to duck");
    const user15 = await users.create("Jar Jar Binks", 23, "drake", "jarjar@stevens.edu", "pic", "mesajarjar", "gunganbestcity", "Mesa called Jar Jar Binks, mesa your humble servant!", "Gungan, politics, swamps", "sith lords", "quacktonic");
    const user16 = await users.create("R2-D2", 30, "goose", "r2-d2@stevens.edu", "pic", "artoo-detoo", "back2naboo", "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWWWW!!!", "Anakin, Luke, Padme, Leia, Han, Chewie", "not being updated, old firmware, needing maintenance", "quacktonic");
}
