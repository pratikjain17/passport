var express = require('express');
var app = express();
var swig = require('swig');
var mysql = require('mysql');
var bodyParser = require('body-parser');
const SHA256 = require("crypto-js/sha256");
class Block {
constructor(index, timestamp, data, previousHash = '') {
this.index = index;
this.previousHash = previousHash;
this.timestamp = timestamp;
this.data = data;
this.hash = this.calculateHash();
this.nonce = 0;
}
calculateHash() {
return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
}
mineBlock(difficulty) {
while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
this.nonce++;
this.hash = this.calculateHash();
}
console.log("BLOCK MINED: " + this.hash);
return "BLOCK MINED: " + this.hash;
}
}
class Blockchain{
constructor() {
this.chain = [this.createGenesisBlock()];
this.difficulty = 5;
}
createGenesisBlock() {
return new Block(0, "01/01/2017", "Genesis block", "0");
}
getLatestBlock() {
return this.chain[this.chain.length - 1];

}
addBlock(newBlock) {
newBlock.previousHash = this.getLatestBlock().hash;
var st = newBlock.mineBlock(this.difficulty);
this.chain.push(newBlock);
return st + "\n";
}
isChainValid() {
for (let i = 1; i < this.chain.length; i++){
const currentBlock = this.chain[i];
const previousBlock = this.chain[i - 1];
if (currentBlock.hash !== currentBlock.calculateHash()) {
return false;
}
if (currentBlock.previousHash !== previousBlock.hash) {
return false;
}
}
return true;
}
}
function poost(nme,psw,dob,nationality,pro,email,address,res){
var con = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database:"passport"
});
var resp;
con.connect(function(err) {
if (err) throw err;
console.log("Connected!");
var sql = "insert into passdetail(name,password,dob,nation,profession,email,address) values ("+ nme+','+psw+','+dob+','+nationality+','+pro+','+email+','+address + ')';
console.log(sql);
con.query(sql, function (err, result) {
if (err) throw err;
console.log("1 record inserted");
res.send(oncl());
21
});
});
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));
function oncl(res){
var resp = "";
let savjeeCoin = new Blockchain();
console.log('Mining block 1...');
resp += 'Mining block 1...\n';
resp += savjeeCoin.addBlock(new Block(1, "20/07/2017", { amount: 4 }));
console.log('Mining block 2...');
resp += 'Mining block 2...\n';
resp += savjeeCoin.addBlock(new Block(2, "20/07/2017", { amount: 8 }));
return resp;
}
app.post('/resp',function(req,res){
var name="'" + req.body.nme + "'";
var pass="'" + req.body.psw + "'";
var dob="'"+req.body.dob +"'" ;
var nation="'"+req.body.nationality+"'";
var pro="'"+req.body.pro+"'";
var email="'"+req.body.email+"'";
var address="'"+req.body.address+"'";
var resp = poost(name,pass,dob,nation,pro,email,address,res);
});
app.get('/',function(req,res){
var s = swig.renderFile('main.html',{});
res.send(s);
});
app.get('/oncl',function(req,res){
var response = oncl();
res.send(response);
});
var server = app.listen(3000, function () {
var host = server.address().address
var port = server.address().port
console.log("Example app listening at http://%s:%s", host, port)
})