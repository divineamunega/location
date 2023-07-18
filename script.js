const apiKey = `6f2fdecefda741f89e6e1ebb954a5765`;
let lat;
let long;
const resultEl = document.querySelector(`.info`);
const submit = document.querySelector(`.submit`);
const inputName = document.querySelector(`.names`)


const fetchData = function (lat, long, name) {
	const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${apiKey}`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			const [results] = data.results;
			console.log(results);
			const locationText = results.formatted;
			resultEl.textContent = `${name} you are in ${locationText} according to the GPS.`
			return locationText;
		})
		.then((date) => console.log(date));
};

const getLocation = function (name) {
	let lat, long;
	if (!navigator.geolocation)
		return alert(
			`Please Enable Geolocation For this website or update your browser.`
		);
	navigator.geolocation.getCurrentPosition(
		(pos) => {
			lat = pos.coords.latitude;
			long = pos.coords.longitude;
			fetchData(lat,long,name)
		},
		(err) => {
			alert(
				`Could Not get your current positiion. Check your internet connection.`,err
			);
		}
	)
};



const submitForm = function (e) {
	e.preventDefault();
	let name = inputName.value;
	console.log(name);
	getLocation(name);
	resultEl.textContent = `${name} please wait your location is loading`;
};

submit.addEventListener(`submit`, submitForm);


// todo I am changing this file so it will become unstaged