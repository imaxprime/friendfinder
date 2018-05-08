var friendsData = require("../data/friends.js");



module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {
    var perfectFriend = {
      name: "",
      photo: "",
      scoreDifference: 0
    }

    var newUser = req.body;
    var newUserPhoto = req.body.photo;
    var newUserName = req.body.name;
    var newUserScores = req.body.scores;

    console.log(newUser);

    var totalDifference = 0;

    for (var i = 0; i < friendsData.length; i++) {
      totalDifference = 0;
      console.log("Friend: " + friendsData[i].name);
      for (var j = 0; j < friendsData[i].scores.length; j++) {
        totalDifference += Math.abs(parseInt(newUserScores[j]) - parseInt(friendsData[i].scores[j]));

        if (totalDifference < perfectFriend.scoreDifference) {
          perfectFriend.name = friendsData[i].name;
          perfectFriend.photo = friendsData[i].photo;
          perfectFriend.scoreDifference = totalDifference;

          console.log("Perfect Friend:" + perfectFriend.name);
        }
      }
      console.log("Difference in scores: " + totalDifference);
    }

	friendsData.push(newUser);

	res.json(perfectFriend);
  });
}