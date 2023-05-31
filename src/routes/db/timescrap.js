import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const url = "https://herenow.com/results/#/races/21008/results";
const response = await fetch(url);
const body = await response.text();
let $ = cheerio.loadBuffer(body);


const list = $('span').text();
//$('flightList').find('li').children('div span');
//const time = list('div span');

console.log(body);
console.log(list);
