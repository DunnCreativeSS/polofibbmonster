const Poloniex = require('poloniex-api-node');
const tw = require('./trendyways.js');
let poloniex
				var bestAsk = []
				var bestBid = []
poloniex = new Poloniex('UKPBKVD4-YM7NGFH4-E5XR83C6-NOULGVC0', process.env.apikey , { socketTimeout: 130000, nonce: () => new Date().getTime() * 1000 + 5000});
const express = require('express');
var startDate = new Date('2018/06/28 19:20')
var favicon = require('serve-favicon')
var path = require('path')
 var startBtc = 0.007759151314717699;
var app = express()
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
	function sortFunction3(a,b){  
				var dateA = new Date(a.date).getTime();
				var dateB = new Date(b.date).getTime();
				return dateA < dateB ? 1 : -1;  
			}; 
var dorefresh = false;
var request = require("request")
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
var sList = []
var gobuy = [];
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

		var stoplimits = []
		var orders = []
		var count = 0;
function sortFunction2(a,b){  
	var dateA = (a.percent);
	var dateB = (b.percent);
	return dateA < dateB ? 1 : -1;  
}; 
function sortFunction(a,b){  
	var dateA = (a.percent);
	var dateB = (b.percent);
	return dateA > dateB ? 1 : -1;  
}; 
function doget(req, res){
	stoplimits = []
		orders = []
		count = 0;
		dbs = []
							poloniex.returnMyTradeHistory('all', tsYesterday, ts, 5000, function(err, data) {
								console.log(err);
								//console.log(data);
								var ccc = 0;
							for (var d in data){
							totals.push({'pair': d, 'total': 0});
								if (data[d].length > 0){
									for (var a in data[d]){
										data[d][a].pair = d;
										if (data[d][a].type == 'sell'){
											totals[ccc].total += parseFloat(data[d][a].total);
										}else {
											totals[ccc].total = totals[ccc].total - parseFloat(data[d][a].total);
										}
										trades.push(data[d][a]);
									
									}
								}
								ccc++;
							}
							var percent =  (100 * (-1 * (1 - (btcbal / startBtc)))).toFixed(4);
					var diff2 = Math.abs(new Date() - startDate);
					var minutes = Math.floor((diff2/1000)/60);
					var hours = ((diff2/1000)/60 / 60).toFixed(8);
					var percentHr = (percent / hours).toFixed(4);
							//////console.log(balances.BTC);
							var stoplimits = []
							var orders = []
							trades.sort(sortFunction3);
		res.send('<head><link rel="icon" href="https://polofibbmonster.herokuapp.com/favicon.ico?v=2" /><meta http-equiv="refresh" content="36"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script></head><h1>Don\'t Panic! If the data seems off, wait a minute or so.</h1>'
		+ 'current time: ' + new Date()
		+ '<br>BTC Balance (including open orders if sold at current bid): ' + btcbal + '<br>'
		+ 'minutes: ' + minutes + '<br>'
		+ 'hours: ' + hours + '<br>'
		+ 'percent: ' + percent + '%<br>'
		+ '<h1>percent/hr: ' + percentHr + '%</h1><br>'
		+ '<div style="display:none;" id="stoplimits">' + JSON.stringify(stoplimits) + '</div>'
		+ '<div style="display:none;" id="orders">' + JSON.stringify(orders) + '</div>'
		+ '<div style="display:none;" id="trades">' + JSON.stringify(trades) + '</div>'
		+ '<div style="display:none;" id="totals">' + JSON.stringify(totals) + '</div>'
		+ 'Actual closed totals 24hrs:'
		+ '<div id="showData4"></div><br>stoplimits:'
		+ '<div id="showData"></div><br>open orders: (' + orders.length + ')'
		+ '<div id="showData2"></div><br>closed orders 24hrs: (' + trades.length + ')'
		+ '<div id="showData3"></div>'
		+ '<script>for(var col=[],i=0;i<JSON.parse($("#totals").text()).length;i++)for(var key in JSON.parse($("#totals").text())[i])-1===col.indexOf(key)&&col.push(key);var table6=document.createElement("table");for(tr=table6.insertRow(-1),i=0;i<col.length;i++){var th=document.createElement("th");th.innerHTML=col[i],tr.appendChild(th)}for(i=0;i<JSON.parse($("#totals").text()).length;i++){tr=table6.insertRow(-1);for(var j=0;j<col.length;j++){var tabCell=tr.insertCell(-1);tabCell.innerHTML=JSON.parse($("#totals").text())[i][col[j]]}}var divContainer5=document.getElementById("showData4");divContainer5.innerHTML="",divContainer5.appendChild(table6);for(var col=[],i=0;i<JSON.parse($("#stoplimits").text()).length;i++)for(var key in JSON.parse($("#stoplimits").text())[i])-1===col.indexOf(key)&&col.push(key);var table2=document.createElement("table");for(tr=table2.insertRow(-1),i=0;i<col.length;i++){var th=document.createElement("th");th.innerHTML=col[i],tr.appendChild(th)}for(i=0;i<JSON.parse($("#stoplimits").text()).length;i++){tr=table2.insertRow(-1);for(var j=0;j<col.length;j++){var tabCell=tr.insertCell(-1);tabCell.innerHTML=JSON.parse($("#stoplimits").text())[i][col[j]]}}var divContainer2=document.getElementById("showData");divContainer2.innerHTML="",divContainer2.appendChild(table2);for(var col=[],i=0;i<JSON.parse($("#orders").text()).length;i++)for(var key in JSON.parse($("#orders").text())[i])-1===col.indexOf(key)&&col.push(key);var table3=document.createElement("table");for(tr=table3.insertRow(-1),i=0;i<col.length;i++){(th=document.createElement("th")).innerHTML=col[i],tr.appendChild(th)}for(i=0;i<JSON.parse($("#orders").text()).length;i++){tr=table3.insertRow(-1);for(var j=0;j<col.length;j++){(tabCell=tr.insertCell(-1)).innerHTML=JSON.parse($("#orders").text())[i][col[j]]}}var divContainer3=document.getElementById("showData2");divContainer3.innerHTML="",divContainer3.appendChild(table3);for(col=[],i=0;i<JSON.parse($("#trades").text()).length;i++)for(var key in JSON.parse($("#trades").text())[i])-1===col.indexOf(key)&&col.push(key);var table4=document.createElement("table");for(tr=table4.insertRow(-1),i=0;i<col.length;i++){var th;(th=document.createElement("th")).innerHTML=col[i],tr.appendChild(th)}for(i=0;i<JSON.parse($("#trades").text()).length;i++){tr=table4.insertRow(-1);for(j=0;j<col.length;j++){var tabCell;(tabCell=tr.insertCell(-1)).innerHTML=JSON.parse($("#trades").text())[i][col[j]]}}var divContainer4=document.getElementById("showData3");divContainer4.innerHTML="",divContainer4.appendChild(table4);</script>');
							});
}

app.get('/', function(req, res) {
	try {
		doget(req, res);
	} catch (err){
		console.log(err);
		setTimeout(function(){
		doget(req, res);
		}, 20000);
	}
});

            app.listen(process.env.PORT || 8080, function() {});
						console.log('2');
poloniex.subscribe('ticker');
//poloniex.subscribe('BTC_ETC');
 var vols = [];
	var winnas = []
 var doVols = false;
 var pairs = [];
 var basePairs = [];
 function doVol(){
	 
	 var bases = [];
	 for (var pair in pairs){
		 var base = pairs[pair].substr(0, pairs[pair].indexOf('_'));
		 if (!bases.includes(base)){
			 bases.push(base);
		 }
	 }
	 ////////console.log(bases);
	 for (var base in bases){
		 basePairs[bases[base]] = []
	 }
	 for (var obj in vols){
		 var base = vols[obj].currencyPair.substr(0, vols[obj].currencyPair.indexOf('_'));
		 
		 basePairs[base].push(vols[obj]);
	
	 }
	 var volTot = 0;
	 var count = 0;
	// //////console.logbasePairs);
	for (var p in basePairs){
		for (var a in basePairs[p]){
		if (p == 'USDT'){
			volTot += parseFloat(basePairs[p][a].baseVolume / btcusdt);
		}
		else if (p == 'ETH'){
			volTot += parseFloat(basePairs[p][a].baseVolume * btceth);
		}
		else if (p == 'XMR'){
			volTot += parseFloat(basePairs[p][a].baseVolume * btcxmr);
			
		}
		else {
			volTot += parseFloat(basePairs[p][a].baseVolume);
		}
		count++;
		}
	}
	////////console.log(volTot);
	////////console.log(count);
	////////console.log('avg vol: ' + volTot / count);
	var avg = volTot / count;
	var winners = [];
	for (var p in basePairs){
		for (var a in basePairs[p]){
			if (p == 'USDT'){
			if ( parseFloat(basePairs[p][a].baseVolume / btcusdt) > (avg / 1.33)){
				winners.push(basePairs[p][a]);
			}
		}
		else if (p == 'ETH'){
			if ( parseFloat(basePairs[p][a].baseVolume * btceth) > (avg / 1.33)){
				winners.push(basePairs[p][a]);
			}
		}
		else if (p == 'XMR'){
			if ( parseFloat(basePairs[p][a].baseVolume * btcxmr) > (avg / 1.33)){
				winners.push(basePairs[p][a]);
			}
			
		}
		else {
			if ( parseFloat(basePairs[p][a].baseVolume) > (avg / 1.33)){
				winners.push(basePairs[p][a]);
			}
		}
		}
		
	}
	////////console.log(winners);
	////////console.log(winners.length);
	for (var p in winners){
				subs(winners[p].currencyPair);	
			}
 }
 subsPairs = []
 function subs(currencyPair){
	 if (!subsPairs.includes(currencyPair)){
subsPairs.push(currencyPair);	
	setTimeout(function(){
					//	console.log('3');
					poloniex.subscribe(currencyPair);
					}, Math.random() * 10000);
 }
 }
 
 var btceth = 0;
 var btcxmr = 0;
 var btcusdt = 0;
 var msgcount = 0;
var dbs = []

 function dobuy(d3d, cc, amount){
	 poloniex.buy(d3d.trades.currencyPair, parseFloat(d3d.trades.buy1).toFixed(8), amount.toFixed(8), 0, 0, 0 , function (err, data2){
		 console.log(err)
		console.log(data2);
	 });
 }
function dosell(d3d, cc, amount){
	poloniex.sell(d3d.trades.currencyPair, parseFloat(d3d.trades.sell1).toFixed(8), (amount).toFixed(8), 0, 0, 0 , function (err, data3){
			console.log(data3);
			console.log(err);
			

	});
}
function doCollections(){
							
							
						//console.log('8'); 
    poloniex.returnBalances(function(err, balances) {
        if (err) {
            ////console.log(err.message);
			

                setTimeout(function() {
                    doCollections();
                }, 7500);
        } else {
            //////console.log(balances.BTC);
			
			var btc = parseFloat(balances.BTC) / 16;
			if (btc < 0.0001){
				btc = 0.0001;
			}
			var count = 0;
							
        }
    });
}
setInterval(function(){
	
    poloniex.returnBalances(function(err, balances) {
        if (err) {
            console.log(err.message);
			
        } else {
            console.log(balances.BTC);
			
			var btc = parseFloat(balances.BTC) / 16;
			if (btc < 0.0001){
				btc = 0.0001;
			}
			var count = 0;
			var sells = []
			var buys = []
			poloniex.returnOpenOrders('all', function(err, data) {
			for (var da in data){
				if (data[da].length > 0){
					for (var a in data[da]){
						if (data[da][a].type == "sell"){
							sells.push(da);
						}else {
							buys.push(da);
						}
					}
				}
			}
			for (var ask in bestAsk){
				if (!sells.includes(ask)){
					console.log('sell sell! ' + ask);
				}
			}
			for (var bid in bestBid){
				if (!buys.includes(bid)){
					console.log('buy buy! ' + bid);
				}
			}
        });
		}
    });
}, 10000);
poloniex.on('message', (channelName, data, seq) => {
  if (channelName === 'ticker') {
	  msgcount++;
	  
	  
	var obj = JSON.parse(JSON.stringify(data));
	////////console.log(obj);
	if (obj.currencyPair == "BTC_ETH"){
		btceth = obj.last;
		////////console.log('eth: ' + btceth);
	}
	else if (obj.currencyPair == "BTC_XMR"){
		btcxmr = obj.last;
		////////console.log('xmr: ' + btcxmr);
	}
	else if (obj.currencyPair == "USDT_BTC"){
		btcusdt = obj.last;
		////////console.log('usdt: ' + btcusdt);
	}
	if (!pairs.includes(obj.currencyPair)){
	vols.push(obj); 
	pairs.push(obj.currencyPair);
	}/*
	
		*/
		////////console.log(vols.length);
		if (vols.length > 20 && msgcount > 30){ // prod 50
		msgcount = 0;
		doVols = true;
			doVol();
		}
	}
	 else {
			// if (JSON.parse(JSON.stringify(data)).type == "orderBookModify"){
		 data = JSON.parse(JSON.stringify(data));
		 
		 if (data[0].type =='orderBook'){
			 ////console.log(Object.keys(data[0].data.asks)[0]);
			 ////console.log(Object.keys(data[0].data.bids)[0]);
			 bestAsk[channelName] = Object.keys(data[0].data.asks)[0];
			 bestBid[channelName] = Object.keys(data[0].data.bids)[0];
		
		 //poloniex.unsubscribe(channelName);
		 }
		 for (var d in data){
		 if (data[d].type =='orderBookModify'){
			 if (data[d].data.rate <= bestAsk[channelName] && data[d].data.type == 'ask'){
				 bestAsk[channelName] = data[d].data.rate;
		
			 }if (data[d].data.rate >= bestAsk[channelName] && data[d].data.type == 'bid'){
				 bestBid[channelName] = data[d].data.rate;
		
			 }
		 }
		 else if (data[d].type =='orderBookRemove'){
			 if (data[d].data.rate <= bestAsk[channelName] && data[d].data.type == 'ask'){
				 bestAsk[channelName] = data[d].data.rate;
		
			 }if (data[d].data.rate >= bestBid[channelName] && data[d].data.type == 'bid'){
				 bestBid[channelName] = data[d].data.rate;
		
			 }
		 }
		 }
		//	 }
	}
 
  if (channelName === 'BTC_ETC') {
    //////console.log(`order book and trade updates received for currency pair ${channelName}`);
    //////console.log(`data sequence number is ${seq}`);
  }
});
 
poloniex.on('open', () => {
  console.log(`Poloniex WebSocket connection open`);
});
 
poloniex.on('close', (reason, details) => {
 console.log(`Poloniex WebSocket connection disconnected`);
});
 
poloniex.on('error', (error) => {
console.log(`An error has occured`);
 console.log(error);
});

setTimeout(function(){
 
poloniex.openWebSocket({ version: 2 });
},2000);