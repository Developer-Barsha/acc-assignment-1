let userData = require('./../user.json');
const fs = require('fs');


module.exports.getAllUsers = (req, res, next) => {
    const { limit } = req.query;
    res.send(userData.slice(0, limit));
}


module.exports.getRandomUser = (req, res, next) => {
    const randomUser = userData[Math.floor(Math.random() * userData.length)];
    res.send(randomUser);
}


module.exports.saveAUser = async (req, res, next) => {
    const newUser = req.body;
    const { id, name, photoUrl, contact, address, gender } = newUser;
    if (!id || !gender || !name || !contact || !address || !photoUrl)
        return res.status(500).send("6 properties (id, gender, name, contact, address, photoUrl) are required to add a new user");
    newUser.id = parseInt(newUser.id);
    userData.push(newUser);
    fs.writeFileSync("user.json", JSON.stringify(userData, null));
    res.send("Successfully added!");
}


module.exports.updateAUser = (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;
    const userToBeUpdated = userData.find(d => d.id == id);

    if (!id) {
        return res.status(500).send("Please send id as parameter");
    }

    else if (!userToBeUpdated) {
        return res.status(404).send("No user exists with provided id");
    }

    else {
        const index = userData.indexOf(userToBeUpdated);
        const updatedUser = { ...userToBeUpdated, ...updates };
        userData[index] = updatedUser;
        fs.writeFileSync("user.json", JSON.stringify(userData, null));
        return res.status(200).send("User updated successfully.");
    }
};




module.exports.updateMultipleUsers = (req, res, next) => {
    const updates = req.body;
    const updatedUsers = [];
    if (!Array.isArray(updates)) {
        return res.status(500).send("Please send an array of objects in body containing id, and updated key-values")
    };

    updates.forEach(u => {
        console.log(u.id);
        const { id } = u;
        if (id === undefined || null) {
            return res.status(500).send("Id not found in one of the objects. Please send an array of objects with these key-values, id and update(an object with the updated values)");
        }

        const userToBeUpdated = userData.find(d => d.id == id);
        if (userToBeUpdated) {
            const index = userData.indexOf(userToBeUpdated);
            const updatedUser = { ...userToBeUpdated, ...u };
            updatedUsers.push(updatedUser);
            userData[index] = updatedUser;
        } 
        else {
            updatedUsers.push("User with this id does not exist.");
        }
    });

    fs.writeFileSync("user.json", JSON.stringify(userData, null));
    res.status(200).send("Users updated successfully.");
};


module.exports.deleteAUser = (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(500).send("Kindly provide id property as parameter")
    };

    const userToBeDeleted = userData.find((d) => d.id == id);

    if (!userToBeDeleted) {
        return res.status(404).send("User with this id does not exist.")
    };

    const restUsers = userData.filter(d => d.id != id);
    fs.writeFileSync("user.json", JSON.stringify(restUsers, null));
    res.status(200).send("successfully deleted!");
};