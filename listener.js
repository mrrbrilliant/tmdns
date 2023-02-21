const dnssd = require("dnssd");

function getService() {
	return new Promise((resolve, reject) => {
		let data = "";
		let ready = false;
		let result = dnssd
			.Browser(dnssd.tcp("http"))
			.on("serviceUp", (service) => {
				if (service.name === "api.onelab.org") {
					data = service;
					ready = true;
				}
			})
			.on("serviceDown", (service) => console.log("Device down: ", service))
			.start();
		const isReady = setInterval(() => {
			if (ready) {
				result.stop();
				resolve(data);
				clearInterval(isReady);
			}
		}, 100);
	});
}

getService().then((dat) => {
	console.log(dat);
	let adderss = `http://${dat.addresses[0]}:${dat.port}`;
	fetch(adderss)

		.then(async (response) => {
			console.log(await response.text());
		})
		.catch(function (err) {
			console.log("Unable to fetch -", err);
		});
});
