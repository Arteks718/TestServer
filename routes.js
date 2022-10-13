const   users = [
    {name:"Masha", age:19},
    {name:"Andrii", age:20},
    {name:"Dasha", age:21}
]

module.exports = function(app){
    app.get("/", (req, res) => {
        res.json(users);
    })

    app.post("/", (req, res) => {
        res.send(users);
    })
}