// things i noticed, I can only use the first edit of the solution from my stack exchange post
// the second edit doesnt work...

// SOME EXTRA IDEAS FROM FRIENDS:
// -include chart(s) that compare the r value from different geographical locations
// -find changes in infection/death rates after significant policy changes in certain locations
// -a chart that contains the three: positive cases vs hospitalized vs icu
// -a chart that contains the three: positive vs recovered vs death

let dates = [],
	deaths = [],
	hospitalizations = [],
	negatives = [],
	positives = [],
	recoveries = [],
	onVentilatorCurrently_list = [],
	dailyDeaths = [],
	dailyPositives = [];

const covid_url = "https://covidtracking.com/api/us/daily";

let cumulativeChart;
let dailyChart;

function getData(url) {
	// console.log("About to fetch the data");
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			dates.length = 0;
			deaths.length = 0;
			positives.length = 0;
			recoveries.length = 0;
			dailyDeaths.length = 0;
			dailyPositives.length = 0;
			for (let row of data) {
				let {
					date,
					death,
					positive,
					recovered,
					deathIncrease,
					positiveIncrease
				} = row;
				date = date.toString();
				date = date.slice(4, date.length);
				date = date.substring(0, 2) + "/" + date.substring(2);
				dates.splice(0, 0, date);
				deaths.splice(0, 0, death);
				positives.splice(0, 0, positive);
				recoveries.splice(0, 0, recovered);
				dailyDeaths.splice(0, 0, deathIncrease);
				dailyPositives.splice(0, 0, positiveIncrease);
				// hospitalizations.splice(0, 0, hospitalized);
				// negatives.splice(0, 0, negative);
				// onVentilatorCurrently_list.splice(0, 0, onVentilatorCurrently);
				// positives.splice(0, 0, positive);
				// recoveries.splice(0, 0, recovered);
			}
			// console.log("Finished fetching the data");
			let cumulative_ctx = document
				.getElementById("cumulativeChart")
				.getContext("2d");

			let daily_ctx = document
				.getElementById("dailyChart")
				.getContext("2d")

			if (cumulativeChart) {
				cumulativeChart.destroy();
			}
			cumulativeChart = new Chart(cumulative_ctx, cumulative_config);

			if (dailyChart) {
				dailyChart.destroy();
			}
			dailyChart = new Chart(daily_ctx, daily_config);
			// chart.update();
		})
		.catch( (error) => {console.log(error)});
}

getData(covid_url);

let cumulative_config = {
	type: "line",
	data: {
		labels: dates,
		datasets: [
			{
				label: "Deaths from Covid-19",
				data: deaths,
				fill: true,
				borderColor: "rgba(255, 99, 132, 1)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
				borderWidth: 1,
			},
			{
				label: "Confirmed Covid-19 Cases",
				data: positives,
				fill: true,
				borderColor: "rgba(99, 132, 255, 1)",
				backgroundColor: "rgba(99, 132, 255, 0.5)",
				borderWidth: 1,
			},
			{
				label: "Recovered Covid-19 cases",
				data: recoveries,
				fill: true,
				borderColor: "rgba(159, 43, 222, 1)",
				backgroundColor: "rgba(159, 43, 222, 0.5)",
				borderWidth: 1,
			},
		],
	},
	options: {
		tooltips: {
			mode: "index",
			intersect: false,
		},
		responsive: true,
		maintainAspectRatio: false,
		title: {
			display: true,
			text: "Cumulative",
			position: "top",
			fontSize: 20,
			fontColor: "#000000",
			fontStyle: "normal" 
		}
	},
};

let daily_config = {
	type: "line",
	data: {
		labels: dates,
		datasets: [
			{
				label: "Deaths from Covid-19",
				data: dailyDeaths,
				fill: true,
				borderColor: "rgba(255, 99, 132, 1)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
				borderWidth: 1,
			},
			{
				label: "Confirmed Covid-19 Cases",
				data: dailyPositives,
				fill: true,
				borderColor: "rgba(99, 132, 255, 1)",
				backgroundColor: "rgba(99, 132, 255, 0.5)",
				borderWidth: 1,
			},
		],
	},
	options: {
		tooltips: {
			mode: "index",
			intersect: false,
		},
		responsive: true,
		maintainAspectRatio: false,
		title: {
			display: true,
			text: "Daily",
			position: "top",
			fontSize: 20,
			fontColor: "#000000",
			fontStyle: "normal" 
		}
	},
};

// let death_ctx = document.getElementById("deathChart").getContext("2d");
// let deathChart = new Chart(death_ctx, death_config);

// getData(covid_url, deathChart);

var app = new Vue({
	el: "#vue-target",
	data: {
		regions: [
			"US",
			"AK",
			"AL",
			"AR",
			"AZ",
			"CA",
			"CO",
			"CT",
			"DE",
			"FL",
			"GA",
			"HI",
			"IA",
			"ID",
			"IL",
			"IN",
			"KS",
			"KY",
			"LA",
			"MA",
			"MD",
			"ME",
			"MI",
			"MN",
			"MO",
			"MS",
			"MT",
			"NC",
			"ND",
			"NE",
			"NH",
			"NJ",
			"NM",
			"NV",
			"NY",
			"OH",
			"OK",
			"OR",
			"PA",
			"RI",
			"SC",
			"SD",
			"TN",
			"TX",
			"UT",
			"VA",
			"VT",
			"WA",
			"WI",
			"WV",
			"WY",
		],
		showDropdown: false,
		region_model: "US",
	},
	methods: {
		toggleMenu: function () {
			this.showDropdown = !this.showDropdown;
		},
		update_chart: function (chosen_region) {
			chosen_region = chosen_region.toLowerCase();
			end_bit = "";
			if (chosen_region === "") {
				chosen_region = "us";
			} else if (chosen_region !== "us") {
				chosen_region = "v1/states/" + chosen_region;
				end_bit = ".json";
			}
			base_url = `https://covidtracking.com/api/${chosen_region}/daily${end_bit}`;
			console.log(base_url);
			getData(base_url);
		},
	},
});
