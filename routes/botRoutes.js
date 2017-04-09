/**
 * Created by rafa on 08/04/2017.
 */
var express = require('express');
var botrouter = express.Router();
var request = require('request');

//var upload = require('multer')();
var fs = require('fs');

var config = require('../config');
var TelegramBot = require('node-telegram-bot-api');
var token = config.token;
var bot = new TelegramBot(token, { polling: true});



bot.onText(/\/info/, function (msg, match) {
  var userId = msg.chat.id;

  // var message = "Доступные команды для работы с книгами:\n"
  //   + "1) /info - команда для получения информации о доступных командах для бота\n"
  //   + "2) /userinfo - информации о сотрудниках\n"
  //   + "3) /sendbook@touser <Название книги | Ссылка на веб ресурс> <ID сотрудника> - отправка книги определенному сотруднику\n"
  //   + "4) /sendbook@toserver <link | title > - отправка книги на сервер ввиде ссылки или Названия книги\n"
  //   + "5) /getbookinfo <ID сотрудника> - для получения списка книг сотрудников\n"
  //   + "6) @automatoChecklist_bot - название бота Checklist Automato\n";

  bot.sendMessage(userId, message);
});


bot.onText(/\/start/, function (msg, match) {
  var userId = msg.chat.id;
  console.log(msg);
  bot.sendMessage(userId, 'Пожалуйста введит свой гостевой ID. \n');
});


var sheetUrl = 'https://docs.google.com/spreadsheets/d/1WNRQsKHG9iM_7ocXDaKFo8C6j2i36YM97WZcSSuV1ZA/edit?ts=58e8c4ee#gid=2101339879';
var spreadSheetId = '15ta5gxcF3AtWBrEe4dxKkEkeMFU8C9JNbXSV5PvM_sA';
var apiKey = '1071047485832-m4nbek27ukmfepibg3a39g5343ltrvtn.apps.googleusercontent.com';
var sheetId = '' // gId;


bot.onText(/\/data/, function (msg, match) {
  request('https://sheets.googleapis.com/v4/spreadsheets/'+ spreadSheetId +'/values/Sheet1A1:L7**?majorDimension=COLUMNS**&key='+apiKey, function (err, resp, body) {
    if(err){
      console.log(err);
    } else {
      console.log(body)
    }
  })
});


bot.onText(/\/sheet/, function (msg, match) {
  request(sheetUrl, function (err, resp, body) {
    if(err){
      console.log(err);
    } else {
      console.log(body);
    }
  })

});
module.exports = botrouter;



