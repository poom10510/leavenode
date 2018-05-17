import _ from 'lodash'
import Joi from 'joi'
import { respondResult, respondSuccess, respondErrors } from '../utils'
import User from '../models/user'
import Lineinfo from '../models/lineinfo'

const request = require('request')

export const findById1 = async(req, res) => {
    try {
        const { _id } = req.body
        const users = await User.findById({ deleted: false, _id })
        reportsupervisor(_id);
        respondResult(res)(users)
    } catch (err) {
        respondErrors(res)(err)
    }
}

const findId = async(id) => {
    try {
        const users = await User.findById({ deleted: false, _id: id })

        return users
    } catch (err) {
        return null;
    }
}

const findSuper = async(department) => {

    try {
        const users = await User.find({ deleted: false, department: department, role: "supervisor" })

        return users
    } catch (err) {
        return null;
    }
}
const findlindid = async(lineid) => {

    try {
        const infos = await Lineinfo.find({ deleted: false, lineid: lineid })

        return infos
    } catch (err) {
        return null;
    }
}

async function sendline(message, line) {
    console.log(line);

    try {
        var idline = await findlindid(line)
            //console.log(idline);
        if (idline.length > 0) {
            linesend(message, idline[0].userid)
        }
    } catch (error) {
        console.log(error);

    }
}

function linesend(message, line) {
    let headers = {
            'Content-Type': 'application/json',
        }
        // var body = JSON.stringify({
        //     id: line,
        //     text: message
        // })
        // console.log(body);

    // request.post({
    //     url: 'https://leavesystemlinechatbot.herokuapp.com/sendmessage',
    //     headers: headers,
    //     body: body
    // }, (err, res, body) => {
    //     console.log('status = ' + res.statusCode);
    //     console.log(err);
    // });
    var body = {
        id: line,
        text: message
    }
    request({
        "uri": 'https://leavesystemlinechatbot.herokuapp.com/sendmessage',
        "method": "POST",
        "json": body
    }, (err, res, body) => {
        if (!err) {
            console.log('sended!');
            console.log(body);
        } else {
            console.log('error!');
        }
    });
}


async function reportsupervisor(userid) {
    try {
        var userlist = await findId(userid);
        var message = "คุณ " + userlist.firstname + " " + userlist.lastname + " ขอลาหยุดค่ะ"
        console.log(message);
        //console.log(userlist);
        //console.log(userlist.department);
        var suserlist = await findSuper(userlist.department);
        suserlist.forEach(user => {
            if (user.contact) {
                if (user.contact.lineid) {
                    var line = user.contact.lineid;
                    //console.log(line);
                    console.log("find");
                    sendline(message, line);
                }
            }
        });

    } catch (error) {

    }

}
module.exports.reportsupervisor = reportsupervisor;