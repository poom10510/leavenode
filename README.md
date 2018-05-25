# Leave node

## Back-end setup
## Install
- Clone project from https://github.com/poom10510/leavenode
- access to project run command `npm install`
- After finish, run command `npm start`

## Database Config
- To connect database, access to `src/app.js`
- change value of `mconfig` to `mongodb://leave01:<PASSWORD>@cluster0-shard-00-00-8go1q.mongodb.net:27017,cluster0-shard-00-01-8go1q.mongodb.net:27017,cluster0-shard-00-02-8go1q.mongodb.net:27017/admin?replicaSet=Cluster0-shard-0&ssl=true` password is `leaveleave`

## Line Chatbot Install
- Clone project from https://github.com/poom10510/lineleavesystem
- deploy project to server

## Line Chatbot Config
-  register Line Developers like in https://medium.com/ingkwan/%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87-line-bot-%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2-node-js-aiml-a-beginners-guide-b7708b0b2440
-  replace `channel access token` with channel access token from step above. In our project use `tMhaUlVVtEqxCluO8i7QF439s/hqBJNy4QB0iB9VLv2K61h+vjisdEyQqo326vIQR7NHjCyzNZB20vbFZQkfUqAIau4iQr/evNEj5dSJRrnvMCADI77GOIq6ifQz+fmnyFwVPlgHyOjcS+NssSqldQdB04t89/1O/w1cDnyilFU=`

## Line Usage
- access to project folder
- scan qr code from `RGDZD1DkGW.png` file. We will access to line chat.
- To register account, please type `id <lineid>` in chat. Lineid is supervisor's line id.
- Supervisor will get notify when subordinate make leave request.