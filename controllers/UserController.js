const mongoose = require("mongoose"),
  user = mongoose.model("Users");

exports.getListOfUsers = function (req, res) {
  user.find((err, users) => {
    if (err) res.send(err);

    res.json(users);
  }

  )
  .sort({age: -1})
  // .limit(2);

};
exports.getUsersByName = function (req, res) {
  user.find(
    {
      name: { $regex: req.params.name, $options: "i" },
    },
    (err, users) => {
      if (err) res.send(err);

      res.json(users);
    }
  );
};
exports.addUser = function (req, res) {
  let newUser = new user(req.body);
  console.log(req);
  newUser.save((err, user) => {
    if (err) res.send(err);

    res.json(user);
  });
};
exports.removeUser = (req, res) => {
  user.remove({
    _id: req.params.userId,
  },
  (err, user)=>{
    if(err) res.send(err);
    res.json({message: "User successfully delete"})
  }
  )
}

exports.updateUser = (req, res) => {
  user.findOneAndUpdate({
    _id: req.params.userId
  },
  req.body, {new: true},
  (err, user) =>{
    if(err) 
      res.send(err);

    res.json(user)
  }
  )
}

exports.getUsersByAge = (req, res) => {
  user.find({
    age: {
      $gte:req.params.from,
      $lte:req.params.to,
    }
  },
    (err, users) =>{
    if(err) 
      res.send(err);

    res.json(users)
  }
  )
}

exports.removeEmptyDocument = (req, res) => {
  user.remove({
    name: {$exists: false}
  },(err, users) =>{
    if(err) 
      res.send(err);
    res.status(200)
    .json({message: "Successful"});
  } )
}

exports.addFildHeight = (req,res)=>{
  user.updateMany({},{$set:{"height":170}},
  (err,users)=>{
    if(err)
      res.status(404).send(err);
    res.status(200).json({message:"Successful"})}
  )
}
exports.getHeightsUser = (req,res)=>{
  user.find({},
  (err, users) => {
    if(err) res.send(err);
    res.json(users)
  })
  .sort({"height":-1})
  .limit(1)
}

// 1) Видалити документи в яких порожнє АБО ім'я, АБО вік (використайте $or)

exports.removeNameOrAge = (req, res) => {
  user.remove({ 
    $or:[
      { name: {$exists: false}, age: {$exists: true} },
      { name: {$exists: true}, age: {$exists: false} },
      { name: "", age: {$exists: true} },
      { name: {$exists: true}, age: "" }
    ]},(err, users) =>{
    if(err) 
      res.send(err);
    res.json(users)
  })
}

// 8) Показати корстувачів ім'я яких починається з заданої користувачем літери

exports.getNameByFirstLetter = (req, res) => {
  user.find({ 
    name: { $regex: '^' + req.params.letter[0], $options: 'i' } 
    },(err, users) => {
      if (err) res.send(err);
      res.status(200).json({ message: users });
    }
  );
};

// 10) Показати найcтаршого користувача, використати функцію findOne(). Додати перевірку, щоб поле зріст існувало в документі 

exports.getOneHeighest = (req, res) => {
  user.findOne({
      height: { $exists: true },
      },(err, users) => {
        if (err) res.send(err);
        res.json(users);
      }
    )
    .sort({ age: -1 });
};

// 11) Додати поле стать в бд, якщо його не існує. За допомогою функції агрегації реалізувати отримання найвищих жінок і чоловіків

exports.getHeghestGender = (req,res) => {
  user.aggregate(
    [{
      $group:
        {
          _id: "$gender",
          max: {$max:"$height"}
        }
    }],
    (err, users) => {
      if(err) res.send(err);
      res.json(users)
    }
  )
}