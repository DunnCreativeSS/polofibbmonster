const Poloniex = require('poloniex-api-node');
const tw = require('./trendyways.js');
let poloniex
var bestAsk = []
var MongoClient = require('mongodb').MongoClient;

var bestBid = []
poloniex = new Poloniex('574V5VXQ-52IB5ZD5-QXTGDVNR-4Y0C6OT1', process.env.apikey2, {
    socketTimeout: 130000,
    nonce: () => new Date().getTime() * 1000 + 5000
});
const express = require('express');
var startDate = new Date('2018/06/28 19:20')
var favicon = require('serve-favicon')
var path = require('path')
var startBtc = 0.007759151314717699;
var app = express()
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

function sortFunction3(a, b) {
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

function sortFunction2(a, b) {
    var dateA = (a.percent);
    var dateB = (b.percent);
    return dateA < dateB ? 1 : -1;
};

function sortFunction(a, b) {
    var dateA = (a.percent);
    var dateB = (b.percent);
    return dateA > dateB ? 1 : -1;
};
var dbo;

MongoClient.connect(process.env.mongodb, function(err, db) {
    console.log(err);
    dbo = db.db('orders2')
});

function doget(req, res) {
    stoplimits = []
    orders = []
    count = 0;
	var totals = []
	var trades = []
    dbs = []
							var ts = Math.round(new Date().getTime() / 1000) - 1000;
							var tsYesterday = ts - (24 * 3600) - 1000;
    poloniex.returnMyTradeHistory('all', tsYesterday, ts, 5000, function(err, data2) {
		var totals = []
							var btcbal = 0;
							var orders = []
							poloniex.returnBalances(function(err, balances) {
						if (err) {
							////console.log(err.message);
							res.send('temporary error, retry ' + err.message);
						} else {
							poloniex.returnOpenOrders('all', function(err, data) {
							for (var d in data){
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
							btcbal += parseFloat(balances.BTC)
        console.log('3 ' + err);
        //console.log(data);
        var ccc = 0;
		var buyOrders2 = []
		var sellOrders2 = []
        for (var d in data2) {
			
            totals.push({
                'pair': d,
                'total': 0
            });
            if (data2[d].length > 0) {
                for (var a in data2[d]) {
                    data2[d][a].pair = d;
                    if (data2[d][a].type == 'sell') {
                        totals[ccc].total += parseFloat(data2[d][a].total);
                    } else {
                        totals[ccc].total = totals[ccc].total - parseFloat(data2[d][a].total);
                    }
                    trades.push(data2[d][a]);

                }
            }
		}
        var percent = (100 * (-1 * (1 - (btcbal / startBtc)))).toFixed(4);
        var diff2 = Math.abs(new Date() - startDate);
        var minutes = Math.floor((diff2 / 1000) / 60);
        var hours = ((diff2 / 1000) / 60 / 60).toFixed(8);
        var percentHr = (percent / hours).toFixed(4);
        //////console.log(balances.BTC);
        trades.sort(sortFunction3);
        res.send('<head><link rel="icon" href="https://polofibbmonster.herokuapp.com/favicon.ico?v=2" /><meta http-equiv="refresh" content="36"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script></head><h1>Don\'t Panic! If the data seems off, wait a minute or so.</h1>' +
            'current time: ' + new Date() +
            '<br>BTC Balance (including open orders if sold at current bid): ' + btcbal + '<br>' +
            'minutes: ' + minutes + '<br>' +
            'hours: ' + hours + '<br>' +
            'percent: ' + percent + '%<br>' +
            '<h1>percent/hr: ' + percentHr + '%</h1><br>' +
            '<div style="display:none;" id="trades">' + JSON.stringify(trades) + '</div>' +
            '<div style="display:none;" id="totals">' + JSON.stringify(totals) + '</div>' +
            'Actual closed totals 24hrs:' +
            '<div id="showData4"></div><br>' +
            '<div id="showData"></div><br>' + 
            '<div id="showData2"></div><br>closed orders 24hrs: (' + trades.length + ')' +
            '<div id="showData3"></div>' +
            '<script>for(var col=[],i=0;i<JSON.parse($("#totals").text()).length;i++)for(var key in JSON.parse($("#totals").text())[i])-1===col.indexOf(key)&&col.push(key);var table6=document.createElement("table");for(tr=table6.insertRow(-1),i=0;i<col.length;i++){var th=document.createElement("th");th.innerHTML=col[i],tr.appendChild(th)}for(i=0;i<JSON.parse($("#totals").text()).length;i++){tr=table6.insertRow(-1);for(var j=0;j<col.length;j++){var tabCell=tr.insertCell(-1);tabCell.innerHTML=JSON.parse($("#totals").text())[i][col[j]]}}var divContainer5=document.getElementById("showData4");divContainer5.innerHTML="",divContainer5.appendChild(table6);for(var col=[],i=0;i<JSON.parse($("#buyOrders").text()).length;i++)for(var key in JSON.parse($("#buyOrders").text())[i])-1===col.indexOf(key)&&col.push(key);var table2=document.createElement("table");for(tr=table2.insertRow(-1),i=0;i<col.length;i++){var th=document.createElement("th");th.innerHTML=col[i],tr.appendChild(th)}for(i=0;i<JSON.parse($("#buyOrders").text()).length;i++){tr=table2.insertRow(-1);for(var j=0;j<col.length;j++){var tabCell=tr.insertCell(-1);tabCell.innerHTML=JSON.parse($("#buyOrders").text())[i][col[j]]}}var divContainer2=document.getElementById("showData");divContainer2.innerHTML="",divContainer2.appendChild(table2);for(var col=[],i=0;i<JSON.parse($("#sellOrders").text()).length;i++)for(var key in JSON.parse($("#sellOrders").text())[i])-1===col.indexOf(key)&&col.push(key);var table3=document.createElement("table");for(tr=table3.insertRow(-1),i=0;i<col.length;i++){(th=document.createElement("th")).innerHTML=col[i],tr.appendChild(th)}for(i=0;i<JSON.parse($("#sellOrders").text()).length;i++){tr=table3.insertRow(-1);for(var j=0;j<col.length;j++){(tabCell=tr.insertCell(-1)).innerHTML=JSON.parse($("#sellOrders").text())[i][col[j]]}}var divContainer3=document.getElementById("showData2");divContainer3.innerHTML="",divContainer3.appendChild(table3);for(col=[],i=0;i<JSON.parse($("#trades").text()).length;i++)for(var key in JSON.parse($("#trades").text())[i])-1===col.indexOf(key)&&col.push(key);var table4=document.createElement("table");for(tr=table4.insertRow(-1),i=0;i<col.length;i++){var th;(th=document.createElement("th")).innerHTML=col[i],tr.appendChild(th)}for(i=0;i<JSON.parse($("#trades").text()).length;i++){tr=table4.insertRow(-1);for(j=0;j<col.length;j++){var tabCell;(tabCell=tr.insertCell(-1)).innerHTML=JSON.parse($("#trades").text())[i][col[j]]}}var divContainer4=document.getElementById("showData3");divContainer4.innerHTML="",divContainer4.appendChild(table4);</script>');
		
	}); } });
});
				}
				

app.get('/', function(req, res) {
    try {
        doget(req, res);
    } catch (err) {
        console.log(err);
        setTimeout(function() {
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

function doVol() {

    var bases = [];
    for (var pair in pairs) {
        var base = pairs[pair].substr(0, pairs[pair].indexOf('_'));
        if (!bases.includes(base)) {
            bases.push(base);
        }
    }
    ////////console.log(bases);
    for (var base in bases) {
        basePairs[bases[base]] = []
    }
    for (var obj in vols) {
        var base = vols[obj].currencyPair.substr(0, vols[obj].currencyPair.indexOf('_'));

        basePairs[base].push(vols[obj]);

    }
    var volTot = 0;
    var count = 0;
    // //////console.logbasePairs);
    for (var p in basePairs) {
        for (var a in basePairs[p]) {
            if (p == 'USDT') {
                volTot += parseFloat(basePairs[p][a].baseVolume / btcusdt);
            } else if (p == 'ETH') {
                volTot += parseFloat(basePairs[p][a].baseVolume * btceth);
            } else if (p == 'XMR') {
                volTot += parseFloat(basePairs[p][a].baseVolume * btcxmr);

            } else {
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
    for (var p in basePairs) {
        for (var a in basePairs[p]) {
            if (p == 'USDT') {
                if (parseFloat(basePairs[p][a].baseVolume / btcusdt) > (avg / 1.75)) {
                    winners.push(basePairs[p][a]);
                }
            } else if (p == 'ETH') {
                if (parseFloat(basePairs[p][a].baseVolume * btceth) > (avg / 1.75)) {
                    winners.push(basePairs[p][a]);
                }
            } else if (p == 'XMR') {
                if (parseFloat(basePairs[p][a].baseVolume * btcxmr) > (avg / 1.75)) {
                    winners.push(basePairs[p][a]);
                }

            } else {
                if (parseFloat(basePairs[p][a].baseVolume) > (avg / 1.75)) {
                    winners.push(basePairs[p][a]);
                }
            }
        }

    }
    ////////console.log(winners);
    ////////console.log(winners.length);
    for (var p in winners) {
        var collection = dbo.collection(winners[p].currencyPair);
        collection.find({

        }, {
            $exists: true
        }).sort({
            _id: -1

        }).toArray(function(err, doc3) {
            for (var d in doc3) {
				
                if (doc3[d].order.type == 'sell') {
                    sellOrders.push(parseFloat(doc3[d].order.orderNumber));
           // console.log(sellOrders);
                } else {
                    buyOrders.push(parseFloat(doc3[d].order.orderNumber));
          //  console.log(buyOrders);
                }
            }
        });

        subs(winners[p].currencyPair);
    }
}
subsPairs = []

function subs(currencyPair) {
    if (!subsPairs.includes(currencyPair)) {
        subsPairs.push(currencyPair);
        setTimeout(function() {
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
var buyOrders = []
var sellOrders = []

function dobuy(currencyPair, price, amount) {
    poloniex.buy(currencyPair, parseFloat(price).toFixed(8), amount.toFixed(8), 0, 0, 0, function(err, data2) {
        console.log('4 ' + err)
        console.log(data2);
		if (!err){
		if (data2.orderNumber != undefined){
        buyOrders.push(parseFloat(data2.orderNumber));
        var collection = dbo.collection(currencyPair);

        collection.insertOne({
            'order': data2
        }, function(err, res) {
            if (err) console.log(err);

            ////console.log(res.result);
        });
		}
		}
    });
}

function dosell(currencyPair, price, amount) {
    poloniex.sell(currencyPair, parseFloat(price).toFixed(8), amount.toFixed(8), 0, 0, 0, function(err, data3) {
        console.log(data3);
        console.log('5 ' + err);
		if (!err){
		if (data3.orderNumber != undefined){
        sellOrders.push(parseFloat(data3.orderNumber));
        var collection = dbo.collection(currencyPair);

        collection.insertOne({
            'order': data3
        }, function(err, res) {
            if (err) console.log(err);

            ////console.log(res.result);
        });
		}
		}

    });
}

setInterval(function() {


    poloniex.returnBalances(function(err, balances) {
        if (err) {
            console.log('6 ' + err.message);

        } else {
            //console.log(balances.BTC);

            var btc = parseFloat(balances.BTC) / 16;
            if (btc < 0.0001) {
                btc = 0.0001;
            }
            var count = 0;
            var sells = []
            var buys = []
            var sellsP = []
            var buysP = []
            var sellsO = []
            var buysO = []
            var sellsA = []
            var buysA = []
            poloniex.returnOpenOrders('all', function(err, data) {
                console.log('7 ' + err);

                for (var da in data) {
                    if (data[da].length > 0) {
                        for (var a in data[da]) {
                            if (data[da][a].type == "sell") {
                                    console.log(da);
                                    sells.push(da);
                                    sellsP.push(data[da][a].rate);
                                    sellsO.push(data[da][a].orderNumber);
                                    sellsA.push(data[da][a].amount);
                            } else {
                                    console.log(da);
                                    buys.push(da);
                                    buysP.push(data[da][a].rate);
                                    buysO.push(data[da][a].orderNumber);
                                    buysA.push(data[da][a].amount);
                            }
                        }
                    }
                }

                console.log(buys);
                for (var ask in bestAsk) {
                    if (!sells.includes(ask)) {
                        console.log('sell? ' + ask.substr(ask.indexOf('_') + 1, ask.length));
                        if (balances[ask.substr(ask.indexOf('_') + 1, ask.length)] != 0) {
                            if (ask.substr(ask.indexOf('_') + 1, ask.length) != "BTC" && ask.substr(ask.indexOf('_') + 1, ask.length) != "USDT" && ask.substr(ask.indexOf('_') + 1, ask.length) != "ETH" && ask.substr(ask.indexOf('_') + 1, ask.length) != "XMR") {
                                console.log(parseFloat(balances[ask.substr(ask.indexOf('_') + 1)]));
                                var spread = 100 * (-1 * (1 - bestAsk[ask] / bestBid[ask]))
                                var bidrate = (1 + spread / 100 / 3.15);
                                var askrate = (1 - spread / 100 / 3.15);
                                var amt = parseFloat(balances[ask.substr(ask.indexOf('_') + 1, ask.length)])
                                var dosellt = true;
								if (ask.substr(0, ask.indexOf('_')) == 'BTC') {

									btc = parseFloat(balances.BTC) / 16;
									if (btc < 0.0001) {
										btc = 0.0001;
										if (balances.BTC < 0.0001) {
											dosellt = false;
										}
									}
								} 
else                                 if (ask.substr(0, ask.indexOf('_')) == 'USDT') {

                                    if (amt < 1) {
                                        dosellt = false;
                                    }
                                } else if (ask.substr(0, ask.indexOf('_')) == 'XMR') {

                                    if (amt < 0.0001) {
                                        dosellt = false;
                                    }
                                } else if (ask.substr(0, ask.indexOf('_')) == 'ETH') {

                                    if (amt < 0.0001) {
                                        dosellt = false;
                                    }
                                }
                                if (dosellt) {
                                    setTimeout(function() {
                                        dosell(ask, bestAsk[ask] * askrate, amt);
                                        console.log('sell sell! ' + ask + ' ' + amt);
                                    }, Math.random() * 5000);
                                }
                            }
                        }
                    }
                    for (var sell in sells) {
                        if (sells[sell] == ask) {
                            if (bestAsk[ask] != sellsP[sell]) {
                                var spread = 100 * (-1 * (1 - bestAsk[ask] / bestBid[ask]))
                                var bidrate = (1 + spread / 100 / 3.15);
                                var askrate = (1 - spread / 100 / 3.15);
                                setTimeout(function() {

                                    poloniex.moveOrder(parseFloat(sellsO[sell]), bestAsk[ask] * askrate, sellsA[sell], 0, 0, function(err, data) {
                                        console.log('1 ' + err);
                                        console.log(data);
                                    });
                                }, Math.random() * 5000);
                            }
                        }
                    }
                }
                for (var bid in bestBid) {
                    if (!buys.includes(bid)) {
                        var spread = 100 * (-1 * (1 - bestAsk[bid] / bestBid[bid]))
                        var bidrate = (1 + spread / 100 / 3.15);
                        var askrate = (1 - spread / 100 / 3.15);
                        var dobuyt = true;
						if (bid.substr(0, bid.indexOf('_')) == 'BTC') {

                            btc = parseFloat(balances.BTC) / 16;
							if (btc < 0.0001) {
								btc = 0.0001;
                                if (balances.BTC < 0.0001) {
                                    dobuyt = false;
                                }
                            }
                        } 
                       else if (bid.substr(0, bid.indexOf('_')) == 'USDT') {

                            btc = parseFloat(balances.USDT) / 16;
                            if (btc < 1) {
                                btc = 1;
                                if (balances.USDT < 1) {
                                    dobuyt = false;
                                }
                            }
                        } else if (bid.substr(0, bid.indexOf('_')) == 'XMR') {

                            btc = parseFloat(balances.XMR) / 16;
                            if (btc < 0.0001) {
                                btc = 0.0001;
                                if (balances.XMR < 0.0001) {
                                    dobuyt = false;
                                }
                            }
                        } else if (bid.substr(0, bid.indexOf('_')) == 'ETH') {

                            btc = parseFloat(balances.ETH) / 16;
                            if (btc < 0.0001) {
                                btc = 0.0001;
                                if (balances.ETH < 0.0001) {
                                    dobuyt = false;
                                }
                            }
                        }
                        if (dobuyt == true) {
                            setTimeout(function() {
											
                                dobuy(bid, bestBid[bid] * bidrate, btc / bestBid[bid]);
                                console.log('buy buy! ' + bid + ' ' + btc);
                            }, Math.random() * 5000);
                        }
                    }

                    for (var buy in buys) {
                        if (buys[buy] == bid) {
                            if (bestBid[bid] != buysP[buy]) {
                                var spread = 100 * (-1 * (1 - bestAsk[bid] / bestBid[bid]))
                                var bidrate = (1 + spread / 100 / 3.15);
                                var askrate = (1 - spread / 100 / 3.15);
                                setTimeout(function() {

                                    poloniex.moveOrder(parseFloat(buysO[buy]), bestBid[bid] * bidrate, buysA[buy], 0, 0, function(err, data) {
                                        console.log('2 ' + err);
                                        console.log(data);
                                    });
                                }, Math.random() * 5000);
                            }
                        }
                    }
                }
            });
        }
    });
}, 30000);
poloniex.on('message', (channelName, data, seq) => {
    if (channelName === 'ticker') {
        msgcount++;


        var obj = JSON.parse(JSON.stringify(data));
        ////////console.log(obj);
        if (obj.currencyPair == "BTC_ETH") {
            btceth = obj.last;
            ////////console.log('eth: ' + btceth);
        } else if (obj.currencyPair == "BTC_XMR") {
            btcxmr = obj.last;
            ////////console.log('xmr: ' + btcxmr);
        } else if (obj.currencyPair == "USDT_BTC") {
            btcusdt = obj.last;
            ////////console.log('usdt: ' + btcusdt);
        }
        if (!pairs.includes(obj.currencyPair)) {
            vols.push(obj);
            pairs.push(obj.currencyPair);
        }
        /*
        	
        		*/
        ////////console.log(vols.length);
        if (vols.length > 20 && msgcount > 30) { // prod 50
            msgcount = 0;
            doVols = true;
            doVol();
        }
    } else {
        // if (JSON.parse(JSON.stringify(data)).type == "orderBookModify"){
        data = JSON.parse(JSON.stringify(data));

        if (data[0].type == 'orderBook') {
            ////console.log(Object.keys(data[0].data.asks)[0]);
            ////console.log(Object.keys(data[0].data.bids)[0]);
            bestAsk[channelName] = Object.keys(data[0].data.asks)[0];
            bestBid[channelName] = Object.keys(data[0].data.bids)[0];

            //poloniex.unsubscribe(channelName);
        }
        for (var d in data) {
            if (data[d].type == 'orderBookModify') {
                if (data[d].data.rate <= bestAsk[channelName] && data[d].data.type == 'ask') {
                    bestAsk[channelName] = data[d].data.rate;

                }
                if (data[d].data.rate >= bestAsk[channelName] && data[d].data.type == 'bid') {
                    bestBid[channelName] = data[d].data.rate;

                }
            } else if (data[d].type == 'orderBookRemove') {
                if (data[d].data.rate <= bestAsk[channelName] && data[d].data.type == 'ask') {
                    bestAsk[channelName] = data[d].data.rate;

                }
                if (data[d].data.rate >= bestBid[channelName] && data[d].data.type == 'bid') {
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

setTimeout(function() {

    poloniex.openWebSocket({
        version: 2
    });
}, 2000);