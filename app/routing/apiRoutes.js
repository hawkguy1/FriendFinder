var friendData = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });

    app.post("/api/friends", function (req, res) {

        console.log(req.body);
        friendData.push(req.body);

        var currentPerson = friendData[friendData.length - 1];
        console.log("CURRENT PERSON:" + currentPerson);

        var closestMatchPerson = 0;
        var closestScore = 50;

        for (var i = 0; i < friendData.length - 1; i++) {
            var scoreDiff = compare(currentPerson, friendData[i]);
            if (scoreDiff < closestScore) {
                closestScore = scoreDiff;
                closestMatchPerson = i;
            }
        }
        console.log(friendData[closestMatchPerson]);
        res.json(friendData[closestMatchPerson]);
    });

    function compare(currentPerson, otherObj) {
        var scoreDifference = 0;
        for (var i = 0; i < friendData.length; i++) {
            scoreDifference += Math.abs(parseInt(currentPerson.scores[i]) - parseInt(otherObj.scores[i]));
        }
        return scoreDifference;
    }
};
