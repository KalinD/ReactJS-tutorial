var models = require("./server.js").models;

/*
models.Profile.create({
    name: "Kalin"
}, (err, profile) => {
    console.log("data?", err, profile);
});*/
/*
models.Profile.upsert({
    id: "609971ae97d7942d44537b1c",
    name: "KalinDoychev"
}, (err, profile) => {
    console.log("data?", err, profile);
});*/

/*
models.Profile.findOrCreate({
    name: "Kalin Ivov Doychev"
}, (err, profile) => {
    console.log("data?", err, profile);
});*/

/*
models.Profile.findOrCreate({
    name: "Kalin Ivov Doychev"
}, (err, profile) => {
    if (err) {
        console.log("There was an error");
    } else if (profile) {
        profile.updateAttributes({
            email: "k@myemail.com"
        }, (updateErr, updated) => {
            console.log("Saved?", updateErr, updated)
        });
    }
}); */

models.Profile.findOrCreate({
    name: "Kalin Ivov Doychev"
}, (err, profile) => {
    if (err) {
        console.log("There was an error");
    } else if (profile) {
        profile.email = 'newEmail';
        profile.save((updateErr, updated) => {
            console.log("Updated?", updateErr, updated)
        });
    }
});