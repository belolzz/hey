      
const cheerio = require('cheerio')
	, snekfetch = require('snekfetch')
	, querystring = require('querystring');

async function googleCommand(msg, args) {

	let searchMessage = await < Message > .reply('Searching... Sec.');
	let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(msg.content)}`;
	return snekfetch.get(searchUrl)
		.then((result) => {
			let $ = cheerio.load(result.text);
			let googleData = $('.r')
				.first()
				.find('a')
				.first()
				.attr('href');
			googleData = querystring.parse(googleData.replace('/url?', ''));
			searchMessage.edit(`Result found!\n${googleData.q}`);
		});
  
		.catch((err) => {
			searchMessage.edit('No results found!');
		});
};

    