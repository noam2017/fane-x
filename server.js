const Koa = require('koa');
const Router = require('@koa/router');
const koaBody = require('koa-body');
const fs = require('fs')
const express = require("express");
const app1 = express();
const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fanex'
})

db.connect(err => {
    if (err) {
        throw err
    }
    console.log('MySQL Connected')
})

const Discord = require("discord.js");
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
const { mongo_token } = require(`./Locked.json`)
const prefix = "."

client.on("ready", () => {
    console.log("ready")


const nbx = require('noblox.js');
const { body } = require('koa/lib/response');
const context = require('koa/lib/context');

const app = new Koa();
const router = new Router();

var randomnumber = Math.floor(Math.random() * 1000000000)

const newnumber = () => {
    setTimeout(() => {
        randomnumber = Math.floor(Math.random() * 1000000000)
        newnumber()
    }, 10000)
}

newnumber()

var randomnumber2 = Math.floor(Math.random() * 1000000000)

const newnumber2 = () => {
    setTimeout(() => {
        randomnumber = Math.floor(Math.random() * 1000000000)
        newnumber2()
    }, 10000)
}

newnumber2()

router.get('/63262346209175408912750971209561029650712340761365/38971465871365486125676135981368591356/13874618276549713659813751350/982137645981235981396859613/129837201945981275981725', async (ctx) => {
    ctx.body = randomnumber
})

router.get('/:number', async (ctx) => {
    if (ctx.params.number == randomnumber * randomnumber / 5 + randomnumber) {
        ctx.body = randomnumber2
    }
})

var users
var loadedusers = false

fs.readFile('users.json', function readFileCallback(error, data) {
    if (error) {console.error(error)}else {
        users = JSON.parse(data)
        loadedusers = true
    }
})

// [
//     {
//         tag: 'ArcX',
//         hwid:  '10',
//         role: 'OWNER',
//         blacklisted: 'false',
//         discord: '578525438499094539',
//         accounts: [
//             {
//                 id: 528326376
//             }
//         ],
//         dateCreated: '00:00/14/03/2008'
//     }
// ]

const saveusersdata = () => {
    setTimeout(() => {
        if (loadedusers == true) {
            fs.writeFile('users.json', JSON.stringify(users), err => {if (err) console.error(err)})
        }
        saveusersdata()
    }, 1000)
}

saveusersdata()

router.get('/get-username-from-id/:id', async (ctx, next) => {
    await nbx.getUsernameFromId(ctx.params.id).then(function (username){
        ctx.body = {
            success: true,
            data: username
        }
    }).catch(function (err) {
        ctx.body = {
            success: false,
            message: err.toString()
        }
        ctx.status = 404
    })
})

router.get('/getuser/:id', async (ctx, next) => {
    var stop = false
    var grabbeduser
    users.forEach((user => {
        if (ctx.request.headers.hwid && user.hwid == ctx.request.headers.hwid && ctx.request.headers.number == randomnumber && ctx.request.headers.userid) {
            users.forEach((nuser => {
                if (nuser.hwid == ctx.request.headers.hwid) {
                    user.accounts.forEach((account => {
                        if (account.id == ctx.request.headers.userid) {
                            const index = user.accounts.indexOf(account)
                            delete user.accounts[index]
                            nuser.accounts.push({ id: ctx.request.headers.userid })
                        }
                    }))
                }
            }))
        }
        if (user.hwid == ctx.params.id) {
            stop = true
            grabbeduser = user
        }
    }))

        if (stop == true) {
            ctx.body = grabbeduser
        }else {
            ctx.body = 'No user found with hwid'
            ctx.status = 404
        }

})

router.post('/adduser', koaBody(), ctx => {
    if (JSON.stringify(ctx.request.body) !== "{}") {
        console.log(ctx.request.body)
        ctx.body = JSON.stringify(ctx.request.body)
        const hwid = ctx.request.headers.hwid
        const executor = ctx.request.headers.executor
        // ctx.request.body.data[0].userid = ctx.request.body.data[0].accounts[0].id

        var stop = false
        if (!ctx.request.body.data[0].tag || !ctx.request.body.data[0].hwid || !ctx.request.body.data[0].role || !ctx.request.body.data[0].blacklisted || !ctx.request.body.data[0].discord ||!ctx.request.body.data[0].accounts[0]) stop = "Not enough data (tag, hwid, role)"
        
        var stop = false
        ctx.request.body.data[0].accounts.forEach((account => async() => {
            await nbx.getUsernameFromId(account.id).catch( function (err) {ctx.body = 'an error has occured [1]'; ctx.status = 400; stop = true})
        }))

        if (stop == true) return
        if (!hwid || !executor) {ctx.body = 'an error has occured [2]'; return ctx.status = 404}
        if (hwid !== ctx.request.body.data[0].hwid) {ctx.body = 'an error has occured [3]'; return ctx.status = 404}
        console.log(executor, randomnumber)
        if (executor !== 'discord' && executor !== 'Synapse X' + randomnumber && executor !== 'Krnl' + randomnumber) {ctx.body = 'an error has occured [4]'; return ctx.status = 404}

            users.forEach((user => {
        
            if (ctx.request.body.data[0].tag && user.tag == ctx.request.body.data[0].tag) return stop = 'A user already exists with the same tag'
            if (ctx.request.body.data[0].discord && user.discord == ctx.request.body.data[0].discord) return stop = 'A user already exists with the same discord'
            if (ctx.request.body.data[0].hwid && user.hwid == ctx.request.body.data[0].hwid) return stop = 'A user already exists with the provided hwid'

                user.accounts.forEach((account => {
                    ctx.request.body.data[0].accounts.forEach((naccount => {
                        const index = user.accounts.indexOf(naccount) + 1
                        if (naccount.id == account.id) {
                            delete user.accounts[index]
                            console.log(index, user.accounts)
                        }
                    }))
                }))
        }))
        if (stop == false) {
            var today = new Date();
            var minutes = String(today.getMinutes())
            var hours = String(today.getHours())
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            now = hours + ':' + minutes + '/' + dd + '/' + mm + '/' + yyyy;
            ctx.request.body.data[0].dateCreated = now
            ctx.request.body.data[0].role = ctx.request.body.data[0].role.toUpperCase()
            const user = users.push({
                tag: ctx.request.body.data[0].tag,
                hwid: ctx.request.body.data[0].hwid,
                role: ctx.request.body.data[0].role,
                blacklisted: ctx.request.body.data[0].blacklisted,
                discord: ctx.request.body.data[0].discord,
                accounts: ctx.request.body.data[0].accounts,
                dateCreated: ctx.request.body.data[0].dateCreated
            })
            ctx.body = `Successfully created user\n${JSON.stringify(users[user - 1])}`
            var hasdiscord = ctx.request.body.data[0].discord
            // if (ctx.request.body.data[0].discord != 'not provided') {hasdiscord = `<@${ctx.request.body.data[0].discord}`}else {
            //     hasdiscord = 'Not provided'
            // }
            client.channels.cache.get("976553534701068358").send(`A new user has been created!\n**Tag: **${ctx.request.body.data[0].tag}\n**HWID: **${ctx.request.body.data[0].hwid}\n**Role: **${ctx.request.body.data[0].role}\n**Discord: **${ctx.request.body.data[0].discord}`)
        }else {
            ctx.body = stop
            ctx.status = 400
        }
    }else {
        ctx.body = 'No body provided'
        ctx.status = 404    
    }
})

router.post('/edituser/:id', koaBody(), ctx => {
    if (JSON.stringify(ctx.request.body) !== "{}") {
        var userfound = false
        var user
        users.forEach((dat => {
            if (dat.hwid == ctx.params.id) {
                userfound = true
                user = dat
            }
        }))
        if (userfound == true) {
            if (ctx.request.body.data[0].tag !== user.tag || ctx.request.body.data[0].role !== user.role || ctx.request.body.data[0].blacklisted !== user.blacklisted || ctx.request.body.data[0].discord !== user.discord) {
                if (ctx.request.body.data[0].blacklisted == 'false' || ctx.request.body.data[0].blacklisted == 'true') {
                    users.forEach((dat => {
                        if (dat.hwid == ctx.params.id) {
                            dat.tag = ctx.request.body.data[0].tag
                            dat.role = ctx.request.body.data[0].role.toUpperCase()
                            dat.blacklisted = ctx.request.body.data[0].blacklisted
                            user = dat
                        }
                        ctx.body = dat
                    }))
                }else {
                    ctx.body = ' Blacklisted value can only be true or false'
                    ctx.status = 404
                }
            }else {
                ctx.body = 'Nothing changed'
                ctx.status = 400
            }
        }else {
            ctx.body = 'No user found'
            ctx.status = 404
        }
    }else {
        ctx.body = 'No body provided'
        ctx.status = 404
    }
})

//-------------------------------------------------------























var data = {
    '830540406294315018': ['request'],
    '1': ['Hello']
}

router.get('/data/:id', async (ctx, next) => {
    if (data) {
        ctx.body = {
            success: true,
            data: data
        }
    }else {
        ctx.body = {
            success: false
        }
        ctx.status = 404
    }
    client.channels.cache.get("964879655112937513").send("hello")
})

router.post('/senddata', koaBody(),
  (ctx) => {
    console.log(ctx.request.body);
    // => POST body
    data = ctx.request.body
    ctx.body = JSON.stringify(ctx.request.body);
  }
);


































//-------------------------------------------------------

var chatdata = [
    {
        userid: '528326376',
        message: 'hello this is a test message',
        timeSent: 'ignore',
        discord: 'false'
    }
]

const resetchat = () => {
    setTimeout(() => {
        chatdata = [
            {
                userid: '528326376',
                message: 'hello this is a test message',
                timeSent: 'ignore',
                discord: 'false'
            }
        ]
        resetchat()
    }, 100000000)
}

resetchat()

router.get('/getchat', async (ctx, next) => {
    console.log('??')
    ctx.body = chatdata
})

router.post('/sendchat', koaBody(), async ctx => {
    const body = ctx.request.body
    const hwid = ctx.request.headers.hwid
    const executor = ctx.request.headers.executor
    if (JSON.stringify(body) !== '{}') {
        if (!ctx.request.body.data) { ctx.body = 'No data provided'; return ctx.status = 400 }
        if (!ctx.request.body.data[0]) { ctx.body = 'No data provided'; return ctx.status = 400 }
        if (!ctx.request.body.data[0].userid) { ctx.body = 'No userid provided'; return ctx.status = 400 }
        if (!ctx.request.body.data[0].message) { ctx.body = 'No message provided'; return ctx.status = 400 }
        if (!ctx.request.body.data[0].discord) { ctx.body = 'No discord provided'; return ctx.status = 400 }
        var stop = false
        if (ctx.request.body.data[0].userid !== '0') {
            await nbx.getUsernameFromId(ctx.request.body.data[0].userid).catch( function (err) {ctx.body = 'an error has occured [1]'; ctx.status = 400; stop = true})
        }
        if (stop == true) return
        if (!hwid) {ctx.body = 'an error has occured [2]'; return ctx.status = 404}
        if (ctx.request.body.data[0].userid !== '0' && hwid == '84418938') {ctx.body = 'an error has occured [3]'; return ctx.status = 404}
        if (ctx.request.body.data[0].discord !== 'false' && hwid !== '84418938') {ctx.body = 'an error has occured [4]'; return ctx.status = 404}
        if (!executor) {ctx.body = 'an error has occured [5]'; return ctx.status = 404}
        if (executor !== 'discord' && executor !== 'Synapse X' + ctx.request.body.data[0].userid * randomnumber && executor !== 'Krnl' + ctx.request.body.data[0].userid * randomnumber) {ctx.body = 'an error has occured [6]'; return ctx.status = 404}
        if (ctx.request.body.data[0].discord == 'false' && executor == 'discord1234567898765432123456789') {ctx.body = 'an error has occured [7]'; return ctx.status = 404}


        var today = new Date();
        var seconds = String(today.getSeconds())
        var minutes = String(today.getMinutes())
        var hours = String(today.getHours())
        now = hours + ':' + minutes + ':' + seconds;
        
        var stop = false

        chatdata.forEach((chat => {
            if (chat.userid !== ctx.request.body.data[0].userid) return
            if (chat.message !== ctx.request.body.data[0].message) return
            var seconds = chat.timeSent.split(":")[0] * 3600
            seconds += chat.timeSent.split(":")[1] * 60
            seconds += chat.timeSent.split(":")[2] * 1
            var secondsnow = now.split(":")[0] * 3600
            secondsnow += now.split(":")[1] * 60
            secondsnow += now.split(":")[2] * 1
            if (secondsnow < seconds + 5) {
                stop = true
                ctx.body = 'Already sent the same message within 5 seconds'
                ctx.status = 400
            }
        }))

        if (stop == false) {
            chatdata.push({
                userid: ctx.request.body.data[0].userid,
                message: ctx.request.body.data[0].message,
                timeSent: now,
                discord: ctx.request.body.data[0].discord
            })
            ctx.body = `Successfully sent message: ${ctx.request.body.data[0].message} at ${now}`
        }
    }else {
        ctx.body = 'No body provided'
        ctx.status = 400
    }
})

//-------------------------------------------------------

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(koaBody());

app.listen(5000);

})

const { token } = require('./Locked.json');
const { text } = require("express");
const { json } = require("express/lib/response");

client.login(token);