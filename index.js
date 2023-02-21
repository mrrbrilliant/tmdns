const express = require("express");
const cors = require("cors");
const dnssd = require("dnssd");

const app = express();
app.use(
	cors({
		origin: "*",
	}),
);

app.get("*", (req, res) => {
	res.send("Hello");
});

var listener = app.listen(4321, function () {
	var port = listener.address().port;
	const ad = new dnssd.Advertisement(dnssd.tcp("http"), port, {
		name: "onelab",
		host: "teacher",
		interface: "wlp4s0",
	});
	ad.start();
	console.log("Listening on port", port);
});
