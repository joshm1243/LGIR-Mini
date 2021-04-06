const ssn = require("express-session")
const express = require("express")
const app = express()
const http = require("http").createServer(app)

var io = require("socket.io")(http)

app.set("view engine","ejs")
app.use("/static",express.static("static"))

app.use(express.urlencoded({
    "extended":true
}))

app.use(ssn({secret:"JA9L1Z2F",resave:true,saveUninitialized:true}))


const Projects = require("./services/projects")
const Accounts = require("./services/accounts")
const Log = require("./services/log")
const { render } = require("ejs")

var session;

var accounts = [
    {
        "username" : "a",
        "password" : "a"
    },

    {
        "username" : "b",
        "password" : "b"
    }
]

function Authenticate(username,password) {
    return accounts.some(a => a.username == username && a.password == password)
}

app.get("/", (req,res) => { 
    res.redirect("/login")
})

app.get("/login", (req,res) => {
    res.render("login")
})


app.post("/login", (req,res) => {

    let username = req.body.username || ""
    let password = req.body.password || ""

    if (Authenticate(username,password)) {
     
        session = req.session
        session.username = username

        res.redirect("/dashboard")
    }
    else {
        res.redirect("/login")
    }
})

app.get("/dashboard", (req,res) => {

    session = req.session

    if (session.username) {

        userProjects = Projects.GetAccountProjects(session.username)

        res.render("dashboard",{
            projects : userProjects,
            [Accounts.AddBinding(session.username)] : Accounts
        })
    }
    else {
        res.redirect("/login")
    }

})

app.get("/application/:code/settings", (req,res) => {
    session = req.session

    if(session.username) {

        if (Projects.Exists(req.params.code)) {

            if (Projects.CanAccess(session.username,req.params.code)) {

                let projectInfo = Projects.GetInfo(req.params.code)

                let projectUsers = Projects.GetUsers(req.params.code)

                res.render("projectsettings",{
                    [Accounts.AddBinding(session.username)] : Accounts,
                    code : req.params.code,
                    username : session.username,
                    name : projectInfo.name,
                    description : projectInfo.description,
                    users : projectUsers
                })
            }
            else {
                res.redirect("/dashboard")
            }
        }
        else  {
            res.redirect("/dashboard")
        }
    }
    else {

    }
})




app.get("/application/:code/workspace", (req,res) => {

    session = req.session

    // if(session.username) {

    //     if (Projects.Exists(req.params.code)) {

    //         if (Projects.CanAccess(session.username,req.params.code)) {

    //             let projectInfo = Projects.GetInfo(req.params.code)

    //             let projectUsers = Projects.GetUsers(req.params.code)

    //             res.render("projectsettings",{
    //                 [Accounts.AddBinding(session.username)] : Accounts,
    //                 code : req.params.code,
    //                 username : session.username,
    //                 name : projectInfo.name,
    //                 description : projectInfo.description,
    //                 users : projectUsers
    //             })
    //         }
    //         else {
    //             res.redirect("/dashboard")
    //         }
    //     }
    //     else  {
    //         res.redirect("/dashboard")
    //     }
    // }
    // else {

    // }

    res.render("workspace")
})


app.get("/logout", (req,res) => {
    session = req.session
    session.destroy()
    res.redirect("/login")
})


http.listen("80", () => {
    console.log("Listeing on port 8080")
})


io.on("connection", (socket) => {
    console.log("There was a connection")

    socket.on("hello", (msg) => {
        socket.emit("hello")
    })

    socket.on("project_create", (msg) => {

        authResult = Accounts.AuthenticateToken(msg.token)

        if (authResult.auth) {
            project = Projects.Create(authResult.username)
            socket.emit("project_create_reply",project)
            console.log("# A new project was generated for user " + authResult.username)
        }
        else {
            console.log("# Stumbled upon an invalid token")
        }

    })

    socket.on("project_join", (msg) => {

        authResult = Accounts.AuthenticateToken(msg.token)

        if (authResult.auth) {
            socket.emit("project_join_reply",Projects.Join(authResult.username,msg.code))
        }
        else {

            console.log("# Stumbled upon an invalid token")
        }
        
    })

    socket.on("project_remove", (msg) => {
        authResult = Accounts.AuthenticateToken(msg.token)

        if (authResult.auth) {
            
            Projects.Remove(authResult.username,msg.code)   

        }
    })


    socket.on("project_name", (msg) => {
        authResult = Accounts.AuthenticateToken(msg.token)

        if (authResult.auth) {

            if (Projects.Exists(msg.code)) {

                if (Projects.CanAccess(authResult.username,msg.code)) {
                    
                    Projects.ChangeName(msg.code,msg.name)
                }
            }
        }
    })

    socket.on("project_description", (msg) => {
        authResult = Accounts.AuthenticateToken(msg.token)

        if (authResult.auth) {

            if (Projects.Exists(msg.code)) {

                if (Projects.CanAccess(authResult.username,msg.code)) {
                    
                    Projects.ChangeDescription(msg.code,msg.description)
                }
            }
        }
    })

    socket.on("project_changeusertype", (msg) => {
        authResult = Accounts.AuthenticateToken(msg.token)

        if (authResult.auth) {
            Projects.ChangeUserType(authResult.username,msg.code,msg.userToChange,msg.permission)
        }
    })

    socket.on("project_deleteuser", (msg) => {
        authResult = Accounts.AuthenticateToken(msg.token)


        if (authResult.auth) {

            if (Projects.Exists(msg.code)) {

                if (Projects.CanAccess(authResult.username,msg.code)) {
                    
                    Projects.Remove(msg.userToRemove,msg.code)
                }
            }
        }
    })

    socket.on("project_componentmapping", (msg) => {
        authResult = Accounts.AuthenticateToken(msg.token)

        if (authResult.auth) {

            if (Projects.Exists(msg.code)) {

                if (Projects.CanAccess(authResult.username,msg.code)) {
                    Projects.UpdateComponents(msg.code,msg.name)
                }
            }
        }
    })

    socket.on("feedback", (msg) => {
        console.log("# Some feedback has been returned")
    })
})

