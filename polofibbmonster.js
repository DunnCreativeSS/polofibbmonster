const Poloniex = require('poloniex-api-node');
const tw = require('./trendyways.js');
var MongoClient = require('mongodb').MongoClient;
let poloniex
				var bestAsk = []
				var bestBid = []
poloniex = new Poloniex('70I6ABA8-69HS4C5S-Q7OT8P2T-6WXK4ZT1', process.env.apikey2 , { socketTimeout: 130000, nonce: () => new Date().getTime() * 1000 + 5000});
var mongodb = "";
const express = require('express');
var startDate = new Date('2018/06/29 22:08')
var favicon = require('serve-favicon')
var path = require('path')
 var startBtc = 0.00776254 ; //0.00796575 
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
	var dateA = new Date(a.date).getTime();
	var dateB = new Date(b.date).getTime();
	return dateA < dateB ? 1 : -1;  
}; 
function sortFunction(a,b){  
	var dateA = (a.percent);
	var dateB = (b.percent);
	return dateA > dateB ? 1 : -1;  
}; 
function doget(req, res){
	try{
		var gosend = true;
	stoplimits = []
		orders = []
		count = 0;
		dbs = []
		collections = []
	dbo.listCollections().toArray(function(err, collInfos) {
        // collInfos is an array of collection info objects that look like:
        // { name: 'test', options: {} }
        for (col in collInfos) {

            dbs.push(collInfos[col].name);
            collections.push(dbo.collection(collInfos[col].name));
        }
        //////console.log(dbs);
		for (var c in collections){
			var collection = collections[c];
                collection.find({

                }, {
                    $exists: true
                }).sort({
                    _id: -1

                }).toArray(function(err, doc3) {
					for (var d in doc3){
					//	////console.log(doc3[d])
						
						//////console.log(doc3[d].trades);
						if (doc3[d].trades){
						if (doc3[d].trades.bought1 == false){
							if (doc3[d].trades.currencyPair.substr(0, doc3[d].trades.currencyPair.indexOf('_')) == "BTC" && parseFloat(doc3[d].trades.lowestAsk) > 0.00000200){
							var sl = {'pair' : doc3[d].trades.currencyPair, 'stoplimit': doc3[d].trades.buy1, 'currentAsk': doc3[d].trades.lowestAsk, 'percent': (parseFloat(doc3[d].trades.lowestAsk) / parseFloat(doc3[d].trades.buy1))}
							stoplimits.push(sl);
							}
						}
						if (doc3[d].trades.bought2 == false){
							if (doc3[d].trades.buy2 != undefined){
								if (doc3[d].trades.currencyPair.substr(0, doc3[d].trades.currencyPair.indexOf('_')) == "BTC" && parseFloat(doc3[d].trades.lowestAsk) > 0.00000200){

							var sl = {'pair' : doc3[d].trades.currencyPair, 'stoplimit': doc3[d].trades.buy2, 'currentAsk': doc3[d].trades.lowestAsk, 'percent': (parseFloat(doc3[d].trades.lowestAsk) / parseFloat(doc3[d].trades.buy2))}
							
							stoplimits.push(sl);
								}
							}
						} 
						}
					}
					if (count + 1 <= collections.length - 1){
						count++;
					}
					else{
						console.log('1');
						poloniex.returnBalances(function(err, balances) {
						if (err) {
							////console.log(err.message);
							res.send('temporary error, retry ' + err.message);
						} else {
							var totals = []
							var btcbal = 0;
							var orders = []
							poloniex.returnOpenOrders('all', function(err, data) {
								
							for (var d in data){
								if (d.substr(0, d.indexOf('_')) == 'BTC'){
								if (data[d].length > 0){
									for (var a in data[d]){
										data[d][a].pair = d;
										data[d][a].currentBid = bestBid[data[d][a].pair];
										data[d][a].percent = (parseFloat(data[d][a].currentBid) / parseFloat(data[d][a].rate));
										orders.push(data[d][a]);
										btcbal += (parseFloat(data[d][a].amount) * parseFloat(bestBid[data[d][a].pair]))
									}
								}
								}
							}
							btcbal = parseFloat(balances.BTC);
							orders.sort(sortFunction2);
							var ts = Math.round(new Date().getTime() / 1000) - 1000;
							var tsYesterday = ts - (24 * 3600) - 1000;
							var trades = []
							poloniex.returnMyTradeHistory('all', startDate.getTime() / 1000, ts, 200, function(err, data) {
								console.log(err);
								//console.log(data);
								var ccc = 0;
							for (var d in data){
							totals.push({'pair': d, 'total': 0});
								if (data[d].length > 0 && !d.startsWith("USDT")){
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
							trades.sort(sortFunction3);
							stoplimits.sort(sortFunction);
		//////console.log(stoplimits);
		console.log((totals).toString());
		var thetotal = 0;
		for (var t in totals){
			thetotal+=totals[t].total;
		}
		if (gosend == true){
			gosend = false;
		thetotal = thetotal * Math.pow(10, 8);
		res.send('<head><link rel="icon" href="https://polofibbmonster.herokuapp.com/favicon.ico?v=2" /><meta http-equiv="refresh" content="36"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script></head><h1>Don\'t Panic! If the data seems off, wait a minute or so.</h1>'
		+ 'current time: ' + new Date()
		+ '<br>BTC Balance: ' + btcbal + '<br>'
		+ 'minutes: ' + minutes + '<br>'
		+ 'hours: ' + hours + '<br>'
		+ 'percent: ' + percent + '%<br>'
		+ '<h1>percent/hr: ' + percentHr + '%</h1><br>'
		+ '<h1>total gains (sats): ' + thetotal + '</h1>'
		+ '<div style="display:none;" id="stoplimits">' + JSON.stringify(stoplimits) + '</div>'
		+ '<div style="display:none;" id="orders">' + JSON.stringify(orders) + '</div>'
		+ '<div style="display:none;" id="trades">' + JSON.stringify(trades) + '</div>'
		+ '<div style="display:none;" id="totals">' + JSON.stringify(totals) + '</div>'
		+ 'Actual closed totals 24hrs:'
		+ '<div id="showData4"></div><br>stoplimits:'
		+ '<div id="showData"></div><br>open orders: (' + orders.length + ')'
		+ '<div id="showData2"></div><br>closed orders 24hrs: (max 200) (' + trades.length + ')'
		+ '<div id="showData3"></div>'
		+ '<script>for(var col=[],i=0;i<JSON.parse($("#totals").text()).length;i++)for(var key in JSON.parse($("#totals").text())[i])-1===col.indexOf(key)&&col.push(key);var table6=document.createElement("table");for(tr=table6.insertRow(-1),i=0;i<col.length;i++){var th=document.createElement("th");th.innerHTML=col[i],tr.appendChild(th)}for(i=0;i<JSON.parse($("#totals").text()).length;i++){tr=table6.insertRow(-1);for(var j=0;j<col.length;j++){var tabCell=tr.insertCell(-1);tabCell.innerHTML=JSON.parse($("#totals").text())[i][col[j]]}}var divContainer5=document.getElementById("showData4");divContainer5.innerHTML="",divContainer5.appendChild(table6);for(var col=[],i=0;i<JSON.parse($("#stoplimits").text()).length;i++)for(var key in JSON.parse($("#stoplimits").text())[i])-1===col.indexOf(key)&&col.push(key);var table2=document.createElement("table");for(tr=table2.insertRow(-1),i=0;i<col.length;i++){var th=document.createElement("th");th.innerHTML=col[i],tr.appendChild(th)}for(i=0;i<JSON.parse($("#stoplimits").text()).length;i++){tr=table2.insertRow(-1);for(var j=0;j<col.length;j++){var tabCell=tr.insertCell(-1);tabCell.innerHTML=JSON.parse($("#stoplimits").text())[i][col[j]]}}var divContainer2=document.getElementById("showData");divContainer2.innerHTML="",divContainer2.appendChild(table2);for(var col=[],i=0;i<JSON.parse($("#orders").text()).length;i++)for(var key in JSON.parse($("#orders").text())[i])-1===col.indexOf(key)&&col.push(key);var table3=document.createElement("table");for(tr=table3.insertRow(-1),i=0;i<col.length;i++){(th=document.createElement("th")).innerHTML=col[i],tr.appendChild(th)}for(i=0;i<JSON.parse($("#orders").text()).length;i++){tr=table3.insertRow(-1);for(var j=0;j<col.length;j++){(tabCell=tr.insertCell(-1)).innerHTML=JSON.parse($("#orders").text())[i][col[j]]}}var divContainer3=document.getElementById("showData2");divContainer3.innerHTML="",divContainer3.appendChild(table3);for(col=[],i=0;i<JSON.parse($("#trades").text()).length;i++)for(var key in JSON.parse($("#trades").text())[i])-1===col.indexOf(key)&&col.push(key);var table4=document.createElement("table");for(tr=table4.insertRow(-1),i=0;i<col.length;i++){var th;(th=document.createElement("th")).innerHTML=col[i],tr.appendChild(th)}for(i=0;i<JSON.parse($("#trades").text()).length;i++){tr=table4.insertRow(-1);for(j=0;j<col.length;j++){var tabCell;(tabCell=tr.insertCell(-1)).innerHTML=JSON.parse($("#trades").text())[i][col[j]]}}var divContainer4=document.getElementById("showData3");divContainer4.innerHTML="",divContainer4.appendChild(table4);</script>');
							
							}});
							});
						}
					});
					}
					});
		
		}
	});
	}catch(err){
		res.send(err);
	}
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
			
			subs(basePairs[p][a].currencyPair);
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
			if ( parseFloat(basePairs[p][a].baseVolume / btcusdt) > (avg / 1.75)){
				winners.push(basePairs[p][a]);
			}
		}
		else if (p == 'ETH'){
			if ( parseFloat(basePairs[p][a].baseVolume * btceth) > (avg / 1.75)){
				winners.push(basePairs[p][a]);
			}
		}
		else if (p == 'XMR'){
			if ( parseFloat(basePairs[p][a].baseVolume * btcxmr) > (avg / 1.75)){
				winners.push(basePairs[p][a]);
			}
			
		}
		else {
			if ( parseFloat(basePairs[p][a].baseVolume) > (avg / 1.75)){
				winners.push(basePairs[p][a]);
			}
		}
		}
		
	}
	////////console.log(winners);
	////////console.log(winners.length);
	for (var p in winners){
		var avg = ((parseFloat(winners[p]['24hrHigh']) + parseFloat(winners[p]['24hrLow'])) / 2);
		
		if (parseFloat(winners[p].last) <= avg){
			var trend = 'DOWNTREND';
		}else {
			var trend = 'UPTREND';
		}
		var sfibb = [];
		 sfibb.push({
			h: parseFloat(winners[p]['24hrHigh']),
			l: parseFloat(winners[p]['24hrLow'])
		})
			var f = fibonacciRetrs(sfibb, trend)[0];
			var lesser = []
			var greater = []
			for (var fibb in f){
					if (f[fibb] <= parseFloat(winners[p].last)){
						lesser.push(f[fibb]);
					}
					else {
						greater.push(f[fibb]);
					}
			}
			if ((greater.length >= 1 && lesser.length >= 1)){
				
				var collection = dbo.collection(winners[p].currencyPair);
				if (greater[0] != undefined){
					winners[p].sell1 = greater[0]
				}
				if (greater[1] != undefined){
					winners[p].sell2 = greater[1]
					
				}
				if (lesser[0] != undefined){
					winners[p].buy1 = lesser[0]
					winners[p].sl = lesser[0] * 0.01; //0.93
					
				}
				if (lesser[1] != undefined){
					winners[p].buy2 = lesser[1]
					winners[p].sl = lesser[1] * 0.01; //.93
					
				}
				
				winners[p].bought1 = false;
				winners[p].bought2 = false;
				winners[p].cancelled = false;
				if (winners[p].currencyPair.substr(0, winners[p].currencyPair.indexOf('_')) == 'BTC'){
					if (!winnas.includes(winners[p].currencyPair)){
						winnas.push(winners[p].currencyPair);
											
					
					//insert(winners[p], collection);
					}
					updateStoplimits(winners[p], collection);
							}
				}
							
			}
	}
	function updateStoplimits(wp, collection){
		

		collection.find({

                }, {
                    $exists: true
                }).sort({
                    _id: -1

                }).toArray(function(err, doc3) {
                    for (var d in doc3) {
						if (doc3[d].trades){
							doc3[d].trades.buy1 = wp.buy1;
							doc3[d].trades.buy2 = wp.buy2;
							doc3[d].trades.sell1 = wp.sell1;
							doc3[d].trades.sell2 = wp.sell2;
							
	 collection.update({
	},{
                            $set: {
                                'trades': doc3[d].trades
                            }
                        }, {
		
	},
	function(err, result) {
		//console.log(result.result);
	});
	}
					}
					});
				}
 function subs(currencyPair){
	 setTimeout(function(){
					//	console.log('3');
					poloniex.subscribe(currencyPair);
					}, Math.random() *120000);
 }
 
 function insert(wp, collection){
	 console.log('insert');
	 collection.update({
		'trades.currencyPair': wp.currencyPair
	},{
		'trades': wp
	
	},
	function(err, result) {

		if (err) console.log(err);
		if (result.result.nModified == 0) {
			
			collection.insertOne({
				'trades': wp
			}, function(err, res) {
				if (err) console.log(err);
				
			if (wp.currencyPair == "BTC_BCH"){
				////console.log(wp);
			}
			  ////console.log(res.result);
			}); 
		} else {
			if (wp.currencyPair == "BTC_BCH"){
				////console.log(wp);
			}
			////console.log(wp);
		////console.log(result.result);
		}
	});
 }
 function update(ask, bid, currencyPair, collection){
	 collection.find({

                }, {
                    $exists: true
                }).sort({
                    _id: -1

                }).toArray(function(err, doc3) {
                    for (var d in doc3) {
						if (doc3[d].trades){
							doc3[d].trades.lowestAsk = ask;
	 collection.update({
		'trades.currencyPair': currencyPair
	},{
                            $set: {
                                'trades': doc3[d].trades
                            }
                        }, {
		
	},
	function(err, result) {

		if (err) console.log(err);
		if (result.result.nModified == 0) {
			/*
			collection.insertOne({
				'trades.lowestAsk': ask
			}, function(err, res) {
				if (err) console.log(err);
				
			if (currencyPair == "BTC_BCH"){
				////console.log(ask);
			}
			  ////console.log(res.result);
			}); */
		} else {
				//console.log(ask);
			////console.log(ask);
		////console.log(result.result);
		}
	});
						}
					}
					
						});
 }
 var btceth = 0;
 var btcxmr = 0;
 var btcusdt = 0;
 var msgcount = 0;
var dbs = []
var collections = []
setTimeout(function(){
MongoClient.connect(process.env.mongodb || mongodb, function(err, db) {
	console.log(err);
    var dbo = db.db('polomonster138-jare')
	var count = 0;
    dbo.listCollections().toArray(function(err, collInfos) {
        // collInfos is an array of collection info objects that look like:
        // { name: 'test', options: {} }
        for (col in collInfos) {

            dbs.push(collInfos[col].name);
            collections.push(dbo.collection(collInfos[col].name));
        }
        //////console.log(dbs);
						////////console.log('settimeout');
                setInterval(function() {
                    doCollections(collections);
                }, 7500);
    });
});
}, 10000);
 function dobuy(d3d, cc, amount){
	 if (d3d.trades.bought1 == false){
	 poloniex.buy(d3d.trades.currencyPair, parseFloat(d3d.trades.buy1).toFixed(8), amount.toFixed(8), 0, 0, 0 , function (err, data2){
		 console.log(err)
		console.log(data2);
		poloniex.sell(d3d.trades.currencyPair, parseFloat(d3d.trades.sell1).toFixed(8), (amount * .998).toFixed(8), 0, 0, 0 , function (err, data3){
		console.log(data3);
		console.log(err);

	});
 });
	 } else {
		 console.log('bought1 true, why buy?');
	 }
 }

 function dobuy2(d3d, cc, amount){
	 if (d3d.trades.bought2 == false){
	 poloniex.buy(d3d.trades.currencyPair, parseFloat(d3d.trades.buy2).toFixed(8), amount.toFixed(8), 0, 0, 0 , function (err, data2){
		console.log(data2);
		console.log(err);
		poloniex.sell(d3d.trades.currencyPair, parseFloat(d3d.trades.sell2).toFixed(8), (amount * .998).toFixed(8), 0, 0, 0 , function (err, data3){
			console.log(data3);
			console.log(err);
			

	});
	});
	 } else {
		 console.log('bought2 true, why buy?');
	 }
 }
 var godobuy = true;
function cancel(d3d, cc, balance){
	poloniex.cancelOrder(d3d.order1, function(data){
		poloniex.sell(d3d.trades.currencyPair, d3d.trades.lowestAsk, balance, 0, 0, 0 , function (data3){
		d3d.cancelled = true;
		cc.update({
				'trades.currencyPair': d3d.currencyPair
			}, {
				'trades': d3d
			},
			function(err, result) {

				if (err) console.log(err);
				////////////////console.log(result.result);
				if (result.result.nModified == 0) {

					cc.insertOne({
						'trades': d3d
					}, function(err, res) {
						if (err) console.log(err);
					  callback(res.result);
					});
				} else {
					callback(result.result);
				}
			});
	});
	});
 }
 function cancel2(d3d, cc, balance){
	 poloniex.cancelOrder(d3d.order2, function(data){
		poloniex.sell(d3d.trades.currencyPair, d3d.trades.lowestAsk, balance, 0, 0, 0 , function (data3){
		d3d.cancelled = true;
		cc.update({
				'trades.currencyPair': d3d.currencyPair
			}, {
				'trades': d3d
			},
			function(err, result) {

				if (err) console.log(err);
				////////////////console.log(result.result);
				if (result.result.nModified == 0) {

					cc.insertOne({
						'trades': d3d
					}, function(err, res) {
						if (err) console.log(err);
					  callback(res.result);
					});
				} else {
					callback(result.result);
				}
			});
	});
	});
 }
  function updaterenew(wp, collection, callback){
	collection.update({
		'trades.currencyPair': wp.currencyPair
	},{
                            $set: {
                                'trades.bought1': false,
								'trades.bought2': false
                            }
                        }, {multi: true},
	function(err, result) {

		if (err) console.log(err);
		////////////////console.log(result.result);
		if (result.result.nModified == 0) {

		} else {
			callback(result.result);
		}
	});
 }
function doCollections(collections, balances){
							
							
						//console.log('8'); 
    
			
				poloniex.returnOpenOrders('all', function(err, data) {
					var ts = Math.round(new Date().getTime() / 1000) - 1000;
					var tsHour = ts - (30 * 60) - 1000;
					console.log(tsHour);
						for (var d in data){
								if (data[d].length > 0){
									for (var a in data[d]){
										data[d][a].pair = d;
										//console.log(data[d][a].type);
										if (data[d][a].type == "buy"){
										data[d][a].currentBid = bestBid[data[d][a].pair];
										var date = new Date(data[d][a].date).getTime() / 1000;
											//console.log(date); 
										var date2 = startDate.getTime() / 1000;
										if (date <= tsHour && date >= date2){
											console.log(parseFloat(data[d][a].orderNumber));
											console.log('cancel cancel!');
											
											
											poloniex.cancelOrder(parseFloat(data[d][a].orderNumber), function(data){
												console.log('cancelled');
											});
											
											
										}
										
										}
									}
								}
							}
							
        if (err) {
            ////console.log(err.message);
			

                setTimeout(function() {
                    doCollections(collections);
                }, 7500);
        } else {
            //////console.log(balances.BTC);
			
			var count = 0;
							
            for (var c in collections) {
                var collection = collections[c];
                collectionDo(collection, data);



							}
        }
    });
}
function collectionDo(collection, data){
							var ds = []
	collection.find({

                }, {
                    $exists: true
                }).sort({
                    _id: -1

                }).toArray(function(err, doc3) {
                    for (var d in doc3) {
						if (doc3[d].trades){
							poloniex.returnBalances(function(err, balances) {
						
							var btc = parseFloat(balances.BTC) / 16;
							if (btc < 0.0001){
								btc = 0.0001;
							}
							if (balances[doc3[d].trades.currencyPair.substr(doc3[d].trades.currencyPair.indexOf('_') +1, doc3[d].trades.currencyPair.length)] != 0){
								if (balances[doc3[d].trades.currencyPair.substr(doc3[d].trades.currencyPair.indexOf('_') +1, doc3[d].trades.currencyPair.length)]  * bestAsk[doc3[d].trades.currencyPair] > 0.0001){
								poloniex.sell(doc3[d].trades.currencyPair, parseFloat(doc3[d].trades.sell1).toFixed(8), (balances[doc3[d].trades.currencyPair.substr(doc3[d].trades.currencyPair.indexOf('_') +1, doc3[d].trades.currencyPair.length)] * .998).toFixed(8), 0, 0, 0 , function (err, data3){
									console.log(data3);
									console.log(err);

								});
								}
								else {
									console.log('bal * bestAsk not high enough');
								}
							}
							
							for (var da in data){
								if (data[da].length > 0){
										ds.push(da);
										//trades.push(data[d][a]);
									
								}
							}
							//console.log('ds: ');
							//console.log(ds);
							if (doc3[d].trades.currencyPair){
								if (doc3[d].trades.buy2){
								if (doc3[d].trades.bought1 == true && doc3[d].trades.bought2 == true && !ds.includes(doc3[d].trades.currencyPair)){
									if (doc3[d].trades.bought1 == true){
									console.log('bought1 and bought2 true');
								}
								if (!ds.includes(doc3[d].trades.currencyPair)){
									console.log('ds no include ' + doc3[d].trades.currencyPair);
									console.log(ds);
								}
									doc3[d].trades.bought1 = false;
									doc3[d].trades.bought2 = false;
									collection.update({
									}, {
										$set: {
											"trades": doc3[d].trades
										}
									}, { multi: true },
									function(err, result) {
									   console.log(err);
										console.log(result.result);
									godobuy = true;
															

									});
								}
								} else if (doc3[d].trades.bought1 == true== true && !ds.includes(doc3[d].trades.currencyPair)){
									if (doc3[d].trades.bought1 == true){
									console.log('bought1 true');
								}
								if (!ds.includes(doc3[d].trades.currencyPair)){
									console.log('ds no include ' + doc3[d].trades.currencyPair);
									console.log(ds);
								}
									doc3[d].trades.bought1 = false;
									doc3[d].trades.bought2 = false;
									collection.update({
									}, {
										$set: {
											"trades": doc3[d].trades
										}
									}, { multi: true },
									function(err, result) {
									   console.log(err);
										console.log(result.result);
									godobuy = true;
															

									});
								}
							
						if (doc3[d].trades.currencyPair.substr(0, doc3[d].trades.currencyPair.indexOf('_')) == "BTC"){
						var amount = btc / parseFloat(doc3[d].trades.lowestAsk);
                         //console.log(amount);
						if (parseFloat(doc3[d].trades.lowestAsk) <= doc3[d].trades.sl && doc3[d].trades.bought1 == true && doc3[d].trades.cancelled == false){
							//cancel(doc3[d], collections[c], balances[doc3[d].trades.currencyPair.substr(doc3[d].trades.currencyPair.indexOf('_'), doc3[d].trades.currencyPair.length)]);
						}
						if (parseFloat(doc3[d].trades.lowestAsk) <= doc3[d].trades.sl && doc3[d].trades.bought2 == true && doc3[d].trades.cancelled == false){
							//cancel2(doc3[d], collections[c],  balances[doc3[d].trades.currencyPair.substr(doc3[d].trades.currencyPair.indexOf('_'), doc3[d].trades.currencyPair.length)]);
						}
						
						//console.log(doc3[d].trades.currencyPair);
						//console.log(doc3[d].trades);
						if (doc3[d].trades.bought1 == false){
                        if (parseFloat(doc3[d].trades.lowestAsk) <= doc3[d].trades.buy1 && parseFloat(doc3[d].trades.lowestAsk) > 0.00000200) {
                        var amount = btc / parseFloat(doc3[d].trades.lowestAsk);
                            //////console.log(doc3[d].trades.last);
							//////console.log(doc3[d].trades);
							doc3[d].trades.bought1 = true;
							if (godobuy == true){
								godobuy = false;

							console.log('dobuy: ' +  amount);
							console.log(doc3[d]);
							collection.update({
								}, {
									$set: {
										"trades": doc3[d].trades
									}
								}, { multi: true },
								function(err, result) {
								   console.log(err);
									console.log(result.result);
								godobuy = true;
														

								});
							dobuy(doc3[d], collection, amount);
							}
                        }
						}
                        if (doc3[d].trades.buy2) {
                            if (parseFloat(doc3[d].trades.lowestAsk) <= doc3[d].trades.buy2 && doc3[d].trades.bought2 == false && parseFloat(doc3[d].trades.lowestAsk) > 0.00000200) {
                        var amount = btc / parseFloat(doc3[d].trades.lowestAsk);
							//////console.log(doc3[d].trades.last);
							//////console.log(doc3[d].trades);
							doc3[d].trades.bought2 = true;
														if (godobuy == true){
godobuy = false;
								collection.update({
								}, {
									$set: {
										"trades": doc3[d].trades
									}
								}, { multi: true },
								function(err, result) {
								   console.log(err);
									console.log(result.result);
								godobuy = true;
														

								});
							console.log('dobuy2: ' +  amount);
							dobuy2(doc3[d], collection, amount);
                            }
							}
                        }
						}
						}
					})
                    }
					
					if (count + 1 <= collections.length - 1){
						count++;
						////////console.log(count);
					}else {
						////////console.log('settimeout');
               
					
					}}
                });
}
var dbo;
				MongoClient.connect(process.env.mongodb || mongodb, function(err, db) {
					console.log(err);
				dbo = db.db('polomonster138-jare')
				////console.log('dbo');
				
				});
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
		 
			 var collection = dbo.collection(channelName);
		 if (data[0].type =='orderBook'){
			 ////console.log(Object.keys(data[0].data.asks)[0]);
			 ////console.log(Object.keys(data[0].data.bids)[0]);
			 bestAsk[channelName] = Object.keys(data[0].data.asks)[0];
			 bestBid[channelName] = Object.keys(data[0].data.bids)[0];
		
			 update(Object.keys(data[0].data.asks)[0], Object.keys(data[0].data.bids)[0], channelName, collection)
		 //poloniex.unsubscribe(channelName);
		 }
		 for (var d in data){
		 if (data[d].type =='orderBookModify'){
			 if (data[d].data.rate <= bestAsk[channelName] && data[d].data.type == 'ask'){
				 bestAsk[channelName] = data[d].data.rate;
		
				 update(data[d].data.rate, data[d].data.rate, channelName, collection)
			 }if (data[d].data.rate >= bestAsk[channelName] && data[d].data.type == 'bid'){
				 bestBid[channelName] = data[d].data.rate;
		
			 }
		 }
		 else if (data[d].type =='orderBookRemove'){
			 if (data[d].data.rate <= bestAsk[channelName] && data[d].data.type == 'ask'){
				 bestAsk[channelName] = data[d].data.rate;
		
				 update(data[d].data.rate, data[d].data.rate, channelName, collection)
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