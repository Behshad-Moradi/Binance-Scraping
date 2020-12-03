const puppeteer = require('puppeteer');
const readline = require('readline');

console.log("1.BNB\n2.BTC\n3.ETH\n4.XRP\n5.BCH\n6.LTC");

const read_line = readline.createInterface({
	input: process.stdin,
    	output: process.stdout
});

var ans;

read_line.question("Which one? ", (answer) => {
	ans = answer;
	read_line.close();
});

function sleep(ms)
{
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

read_line.on("close", () => {
	(async() => {		
		if (ans < 6 && ans > 0)
		{
			console.log("Wait...");
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			
			var text;
			
			if (ans == 1){				
				text = "BNB";			
			}
			else if (ans == 2){					
				text = "BTC";			
			}
			else if (ans == 3){					
				text = "ETH";			
			}
			else if (ans == 4){				
				text = "XRP";				
			}
			else if (ans == 5){
				text = "BCH";				
			}
			else if (ans == 6){					
				text = "LTC";
			}
			var price;
			var first_price;
			var variable;
			var set = true;
			try
			{
				await page.goto("https://www.binance.com/", {
					waitUntil:"laod",
					waitUntil:"networkidle0"
				});
				while (true)
				{
					if (ans == 1) {
						price = await page.evaluate( ()=> 
					document.querySelector("#__APP > div.css-tq0shg > main > div > div.css-1tibs4k > div > a:nth-child(2) > div:nth-child(2) > div").innerHTML)
					}
					else if (ans == 2)
					{
						price = await page.evaluate( ()=> 
					document.querySelector("#__APP > div.css-tq0shg > main > div > div.css-1tibs4k > div > a:nth-child(3) > div:nth-child(2) > div").innerHTML)
					}
					else if (ans == 3)
					{
						price = await page.evaluate( ()=> 
					document.querySelector("#__APP > div.css-tq0shg > main > div > div.css-1tibs4k > div > a:nth-child(4) > div:nth-child(2) > div").innerHTML)
					}
					else if (ans == 4)
					{
						price = await page.evaluate( ()=> 
					document.querySelector("#__APP > div.css-tq0shg > main > div > div.css-1tibs4k > div > a:nth-child(5) > div:nth-child(2) > div").innerHTML)
					}
					else if (ans == 5)
					{
						price = await page.evaluate( ()=> 
					document.querySelector("#__APP > div.css-tq0shg > main > div > div.css-1tibs4k > div > a:nth-child(6) > div:nth-child(2) > div").innerHTML)
					}else if (ans == 6)
					{
						price = await page.evaluate( ()=> 
					document.querySelector("#__APP > div.css-tq0shg > main > div > div.css-1tibs4k > div > a:nth-child(7) > div:nth-child(2) > div").innerHTML)
					}
					if (set)
					{
						first_price = parseFloat(String(price.replace("$", "")).replace(",", ""));
						set = false;
					}
					variable = parseFloat(String(price.replace("$", "")).replace(",", ""));
					console.log("Last price " + text + ": " + price + "  |  " + "All change " + ": " + (variable-first_price).toFixed(2) + "  |  ");
					//console.log("Change " + text + ": " + (variable-first_price).toFixed(2));
					
					await sleep(500);
				}
			}
			catch(err)
			{
				console.log("Cannot connect to the binance.com");
			}
			await browser.close();
		}
		else
		{
			console.log("Wrong number...");
		}		
	})();
});
