const bfx = require('./bfx.js')

const ws = bfx.ws(2, {
	apiKey: 'xyRdYPsJwUCTIszDLBz0P0lDjZfJNENzL024zLZu8NZ', apiSecret: 'hoXIqCtmG6lvCC31540S6AisUMiq0j4xEniIxumbccl',
  manageCandles: true, // enable candle dataset persistence/management
  transform: true // 
  })
const { Order } = require('./node_modules/bitfinex-api-node/lib/models')

const { MarginInfo } = require('./node_modules/bitfinex-api-node/lib/models')

var startDate = new Date();
const CANDLE_KEY = 'trade:1m:tBTCUSD'
const rest = bfx.rest(2, {
apiKey: 'xyRdYPsJwUCTIszDLBz0P0lDjZfJNENzL024zLZu8NZ', apiSecret: 'hoXIqCtmG6lvCC31540S6AisUMiq0j4xEniIxumbccl'});
var keys = []
ws.on('open', () => {
  ws.auth()
    console.log('open')

    rest.symbols().then(symbols => {
        for (var s in symbols) {
            // console.log('t' + symbols[s].toUpperCase());
			if ( symbols[s].toUpperCase().slice(-3) == "ETH" ||  symbols[s].toUpperCase().slice(-3) == "BTC" ||  symbols[s].toUpperCase().slice(-3) == "USD"){
            keys.push('trade:1m:t' + symbols[s].toUpperCase());
            ws.subscribeCandles('trade:1m:t' + symbols[s].toUpperCase()) //'trade:1m:' + 
			}
        }
        for (var k in keys) {
			
            //console.log(keys[k]);
			lpa[keys[k]] = null 
			lpb[keys[k]] = null 
			prevTS[keys[k]] = null
        }
		for (var k in keys) {
			candlecandle(keys[k]);
		}
	
    }).catch(err => {
        console.log(err);
    })
})
function candlecandle(k){
	
ws.onCandle({ key: k }, (candles) => {
	//console.log(k);
	if (prevTS[k] === null || candles[0].mts > prevTS[k]) {
    const c = candles[1] // report previous candle
	if (c){
		/*
	if (k == 'trade:1m:tEOSUSD'){
    console.log(`%s %s open: %f, high: %f, low: %f, close: %f, volume: %f`,
      k, new Date(c.mts).toLocaleTimeString(),
      c.open, c.high, c.low, c.close, c.volume
    )
	}*/

	  //console.log(ticker);
	  if (k == 'trade:1m:tBTCUSD'){
		  btcusd = c.open;
	  }
	  if (k == 'trade:1m:tETHUSD'){
		  ethusd = c.open;
	  }
					var diff2 = Math.abs(new Date() - startDate);
                    var minutes = Math.floor((diff2 / 1000) / 60);
                    var hours = ((diff2 / 1000) / 60 / 60).toFixed(18);
					if (k.slice(-3)== "USD"){
						var amt = btcusd;
					if (!volKs.includes(k) && ((c.volume * c.close) / amt)){	
					volKs.push(k);
						volTot += (c.volume * c.close) / amt;
					}
					}
					else if (k.slice(-3)== "ETH"){
						var amt = ethusd;
					if (!volKs.includes(k) && ((c.volume * c.close) / amt)){	
					volKs.push(k);
						volTot += (c.volume * c.close) / amt;
					}
					}
					else if (k.slice(-3)== "BTC"){
						var amt = 1;
					if (!volKs.includes(k) && ((c.volume * c.close) / amt)){	
					volKs.push(k);
						volTot += (c.volume * c.close) / amt;
					}
					}
					var avg = volTot / volKs.length;
					if ((c.volume * c.close) / amt > (avg * 1.75)){
		  // console.log(c.close / c.open);
		  if (c.close / c.open > 1.02 || c.close / c.open < .98){
		   console.log(c.close / c.open);
		   console.log(minutes);
		  }
  if ((c.close / c.open) > 1.026){ //1.051
	  console.log('sell sell !! ' + k + ' ' + (c.close / c.open) + ' minutes: ' + minutes);
	 buy(k, c.close);
  }else if ((c.close / c.open) < 0.974){ //0.949
	  console.log('buy buy !! ' + k + ' ' + (c.close / c.open) + ' minutes: ' + minutes);
	 sell(k, c.close)
  }
  lpa[k] = c.lastPrice
  lpb[k] = c.lastPrice
    prevTS[k] = candles[1].mts
	}}
					}
})
}
ws.once('auth', () => {

});
function buy(k, rate){
	if (!activeOrders.includes(k)){
	activeOrders.push(k);
	console.log(activeOrders);
	rest.marginInfo(k).then(margin => {
		if (k.slice(-3) == "USD"){
		var amt = margin[2][0] / 4;
		}
		else if (k.slice(-3) == "ETH"){
		var amt = margin[2][0] / 4 / ethusd;
		}
		else if (k.slice(-3) == "BTC"){
		var amt = margin[2][0] / 4 / btcusd;
		}
		console.log(amt);
	
  console.log('sell price: ' + (rate) + ' amount ' + (-1 * amt * (1 / rate)));
  const o = new Order({
    cid: Date.now(),
    symbol: k,
    price: rate,
    amount: -1 * amt * (1 / rate),
    type: Order.type.LIMIT
  }, ws)

  let closed = false

  // Enable automatic updates
  o.registerListeners()

  o.on('update', () => {
    console.log('order updated: %j', o.serialize())
  })

  o.on('close', () => {
    console.log('order closed: %s', o.status)
    closed = true
  })

  console.log('submitting order %d', o.cid)

  o.submit().then(() => {
    console.log('got submit confirmation for order %d [%d]', o.cid, o.id)
  });
  console.log('buy price: ' + (rate * 0.995) + ' amount ' + (amt * (1 / rate) *.995));
   const o2 = new Order({
    cid: Date.now(),
    symbol: k,
    price: (rate * 0.995),
    amount: (amt * (1 / rate) *.995),
    type: Order.type.LIMIT
  }, ws)

  let closed2 = false

  // Enable automatic updates
  o2.registerListeners()

  o2.on('update', () => {
    console.log('order updated: %j', o2.serialize())
  })

  o2.on('close', () => {
    console.log('order closed: %s', o2.status)
	activeOrders.splice( k, 1 );
	console.log(activeOrders);
    closed2 = true
  })

  console.log('submitting order %d', o2.cid)

  o2.submit().then(() => {
    console.log('got submit confirmation for order %d [%d]', o2.cid, o2.id)
  });
});
	}
}
function sell(k, rate){
	if (!activeOrders.includes(k)){
	activeOrders.push(k);
	console.log(activeOrders);
	
	rest.marginInfo(k).then(margin => {
	if (k.slice(-3) == "USD"){
		var amt = margin[2][0] / 4;
		}
		else if (k.slice(-3) == "ETH"){
		var amt = margin[2][0] / 4 / ethusd;
		}
		else if (k.slice(-3) == "BTC"){
		var amt = margin[2][0] / 4 / btcusd;
		}
		console.log(amt);
		    console.log('buy price: ' + ((rate)) + ' amount ' + (amt * (1 / rate)));

  const o = new Order({
    cid: Date.now(),
    symbol: k,
    price: rate,
    amount: amt * (1 / rate) ,
    type: Order.type.LIMIT
  }, ws)

  let closed = false

  // Enable automatic updates
  o.registerListeners()

  o.on('update', () => {
    console.log('order updated: %j', o.serialize())
  })

  o.on('close', () => {
    console.log('order closed: %s', o.status)
    closed = true
  })

  console.log('submitting order %d', o.cid)

  o.submit().then(() => {
    console.log('got submit confirmation for order %d [%d]', o.cid, o.id)
  });
    console.log('sell price: ' + ((rate * 1.005)) + ' amount ' + (-1 * amt * (1 / rate) * .995));

   const o2 = new Order({
    cid: Date.now(),
    symbol: k,
    price: (rate * 1.005),
    amount: (-1 * amt * (1 / rate) * .995),
    type: Order.type.LIMIT
  }, ws)

  let closed2 = false

  // Enable automatic updates
  o2.registerListeners()

  o2.on('update', () => {
    console.log('order updated: %j', o2.serialize())
  })

  o2.on('close', () => {
    console.log('order closed: %s', o2.status)
	activeOrders.splice( k, 1 );
	console.log(activeOrders);

    closed2 = true
  })

  console.log('submitting order %d', o2.cid)

  o2.submit().then(() => {
    console.log('got submit confirmation for order %d [%d]', o2.cid, o2.id)
  });
    });
	}
}
var usds = []
var ethusd = 0;
var btcusd = 0;
var btcs = []
var prevTS = []
var eths = []

        
					var volTot = 0;
					var volKs= [];
var activeOrders = []
var lpa = []
var lpb = []
// 'candles' here is an array

ws.on('error', (err) => {
  //console.log(err)
})
ws.open()