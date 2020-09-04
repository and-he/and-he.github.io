// things i noticed, I can only use the first edit of the solution from my stack exchange post
// the second edit doesnt work...

// SOME EXTRA IDEAS FROM FRIENDS:
// -include chart(s) that compare the r value from different geographical locations
// -find changes in infection/death rates after significant policy changes in certain locations
// -a chart that contains the three: positive cases vs hospitalized vs icu
// -a chart that contains the three: positive vs recovered vs death

// LET'S IMPLEMENT AN OPTION FOR COMPARING TWO REGIONS AT A TIME
// SO WE WILL NEED ANOTHER COPY OF THE FOLLOWING:
// -dates, deaths, positives, recoveries, daily deaths, daily positives, cumulative chart, and daily chart
// populate those variables with default values from the covid_url constant
// for the html, we want to render a check button, where if it is checked, we want to display the new charts and options for that chart
// we will need to updateChart methods, one to update the primary/left chart and another that updates 

//SMALL THINGS TO FIX:
//-the ordering of the labels when you hover over the dataset should match the height of each line

// OTHER EXTRA IDEAS
// -lets have cards that display the total positives, total negatives, and total deaths, and below each value should be its delta

// the following are variables for the primary/left chart
let dates = [],
	deaths = [],
	positives = [],
	recoveries = [],
	dailyDeaths = [],
	dailyPositives = [];

// the following are variables for the secondary/right chart
let dates2 = [],
	deaths2 = [],
	positives2 = [],
	recoveries2 = [],
	dailyDeaths2 = [],
	dailyPositives2 = [];


const covid_url = "https://api.covidtracking.com/v1/us/daily.json";

//primary/left charts
let cumulativeChart,
	dailyChart;

//secondary/right charts
let cumulativeChart2,
	dailyChart2;

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
					positiveIncrease,
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
			// console.log(totalDeaths)
			// console.log("Finished fetching the data");
			let cumulative_ctx = document
				.getElementById("cumulativeChart")
				.getContext("2d");

			let daily_ctx = document
				.getElementById("dailyChart")
				.getContext("2d");

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
		.catch((error) => {
			console.log(error);
		});
}

function getData2(url) {
	// console.log("About to fetch the data");
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			dates2.length = 0;
			deaths2.length = 0;
			positives2.length = 0;
			recoveries2.length = 0;
			dailyDeaths2.length = 0;
			dailyPositives2.length = 0;
			console.log("1. cleared the lists")
			for (let row of data) {
				let {
					date,
					death,
					positive,
					recovered,
					deathIncrease,
					positiveIncrease,
				} = row;
				date = date.toString();
				date = date.slice(4, date.length);
				date = date.substring(0, 2) + "/" + date.substring(2);
				dates2.splice(0, 0, date);
				deaths2.splice(0, 0, death);
				positives2.splice(0, 0, positive);
				recoveries2.splice(0, 0, recovered);
				dailyDeaths2.splice(0, 0, deathIncrease);
				dailyPositives2.splice(0, 0, positiveIncrease);
			}
			// console.log(totalDeaths)
			console.log("2. Finished fetching the data");
			let cumulative_ctx = document
				.getElementById("cumulativeChart2")
				.getContext("2d");

			let daily_ctx = document
				.getElementById("dailyChart2")
				.getContext("2d");

			if (cumulativeChart2) {
				cumulativeChart2.destroy();
			}
			cumulativeChart2 = new Chart(cumulative_ctx, cumulative2_config);

			if (dailyChart2) {
				dailyChart2.destroy();
			}
			dailyChart2 = new Chart(daily_ctx, daily2_config);
			// chart.update();
		})
		.catch((error) => {
			console.log(error);
		});
}

getData(covid_url);
getData2(covid_url)

let cumulative_config = {
	type: "line",
	data: {
		labels: dates,
		datasets: [
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
			{
				label: "Deaths from Covid-19",
				data: deaths,
				fill: true,
				borderColor: "rgba(255, 99, 132, 1)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
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
			fontColor: "#ffffff",
			fontStyle: "normal",
		},
		scales: {
			yAxes: [{
				ticks: {
					callback: function(value, index, values){
						return value.toLocaleString()
					}
				}
			}]
		}
	},
};

let cumulative2_config = {
	type: "line",
	data: {
		labels: dates2,
		datasets: [
			{
				label: "Confirmed Covid-19 Cases",
				data: positives2,
				fill: true,
				borderColor: "rgba(99, 132, 255, 1)",
				backgroundColor: "rgba(99, 132, 255, 0.5)",
				borderWidth: 1,
			},
			{
				label: "Recovered Covid-19 cases",
				data: recoveries2,
				fill: true,
				borderColor: "rgba(159, 43, 222, 1)",
				backgroundColor: "rgba(159, 43, 222, 0.5)",
				borderWidth: 1,
			},
			{
				label: "Deaths from Covid-19",
				data: deaths2,
				fill: true,
				borderColor: "rgba(255, 99, 132, 1)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
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
			fontColor: "#ffffff",
			fontStyle: "normal",
		},
		scales: {
			yAxes: [{
				ticks: {
					callback: function(value, index, values){
						return value.toLocaleString()
					}
				}
			}]
		}
	},
};

let daily_config = {
	type: "line",
	data: {
		labels: dates,
		datasets: [
			{
				label: "Confirmed Covid-19 Cases",
				data: dailyPositives,
				fill: true,
				borderColor: "rgba(99, 132, 255, 1)",
				backgroundColor: "rgba(99, 132, 255, 0.5)",
				borderWidth: 1,
			},
			{
				label: "Deaths from Covid-19",
				data: dailyDeaths,
				fill: true,
				borderColor: "rgba(255, 99, 132, 1)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
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
			fontColor: "#ffffff",
			fontStyle: "normal",
		},
		scales: {
			yAxes: [{
				ticks: {
					callback: function(value, index, values){
						return value.toLocaleString()
					}
				}
			}]
		}
	},
};

let daily2_config = {
	type: "line",
	data: {
		labels: dates2,
		datasets: [
			{
				label: "Confirmed Covid-19 Cases",
				data: dailyPositives2,
				fill: true,
				borderColor: "rgba(99, 132, 255, 1)",
				backgroundColor: "rgba(99, 132, 255, 0.5)",
				borderWidth: 1,
			},
			{
				label: "Deaths from Covid-19",
				data: dailyDeaths2,
				fill: true,
				borderColor: "rgba(255, 99, 132, 1)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
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
			fontColor: "#ffffff",
			fontStyle: "normal",
		},
		scales: {
			yAxes: [{
				ticks: {
					callback: function(value, index, values){
						return value.toLocaleString()
					}
				}
			}]
		}
	},
};

// let death_ctx = document.getElementById("deathChart").getContext("2d");
// let deathChart = new Chart(death_ctx, death_config);

// getData(covid_url, deathChart);

//the regions dictionary will have the full name as a key and the abbreviation as a value
//we will display the values, and on the method calls, we will convert the value to the corresponding key
var app = new Vue({
	el: "#vue-target",
	data: {
		locations: {
			"United States": "US",
			Alabama: "AL",
			Alaska: "AK",
			Arizona: "AZ",
			Arkansas: "AR",
			California: "CA",
			Colorado: "CO",
			Connecticut: "CT",
			Delaware: "DE",
			Florida: "FL",
			Georgia: "GA",
			Hawaii: "HI",
			Idaho: "ID",
			Illinois: "IL",
			Indiana: "IN",
			Iowa: "IA",
			Kansas: "KS",
			Kentucky: "KY",
			Louisiana: "LA",
			Maine: "ME",
			Maryland: "MD",
			Massachusetts: "MA",
			Michigan: "MI",
			Minnesota: "MN",
			Mississippi: "MS",
			Missouri: "MO",
			Montana: "MT",
			Nebraska: "NE",
			Nevada: "NV",
			"New Hampshire": "NH",
			"New Jersey": "NJ",
			"New Mexico": "NM",
			"New York": "NY",
			"North Carolina": "NC",
			"North Dakota": "ND",
			Ohio: "OH",
			Oklahoma: "OK",
			Oregon: "OR",
			Pennsylvania: "PA",
			"Rhode Island": "RI",
			"South Carolina": "SC",
			"South Dakota": "SD",
			Tennessee: "TN",
			Texas: "TX",
			Utah: "UT",
			Vermont: "VT",
			Virginia: "VA",
			Washington: "WA",
			"West Virginia": "WV",
			Wisconsin: "WI",
			Wyoming: "WY",
		},
		showDropdown: false,
		region_model: "United States",
		region_model2: "United States",
	},
	methods: {
		toggleMenu: function () {
			this.showDropdown = !this.showDropdown;
		},
		update_chart: function (chosen_region) {
			// the region will be the full name, which is the key
			// so we need to first get the abbreviation, which is the associated value
			console.log(`The chosen region is ${chosen_region}`);
			chosen_region = this.locations[chosen_region];
			chosen_region = chosen_region.toLowerCase();
			end_bit = "";
			if (chosen_region === "") {
				chosen_region = "us";
			} else if (chosen_region !== "us") {
				chosen_region = "states/" + chosen_region;
				end_bit = ".json";
			}
			// base_url = `https://covidtracking.com/api/${chosen_region}/daily${end_bit}`;
			base_url = `https://api.covidtracking.com/v1/${chosen_region}/daily.json`;
			console.log(base_url);
			getData(base_url);
		},
		update_chart2: function (chosen_region) {
			console.log(`The chosen region is ${chosen_region}`);
			chosen_region = this.locations[chosen_region];
			chosen_region = chosen_region.toLowerCase();
			end_bit = "";
			if (chosen_region === "") {
				chosen_region = "us";
			} else if (chosen_region !== "us") {
				chosen_region = "states/" + chosen_region;
				end_bit = ".json";
			}
			// base_url = `https://covidtracking.com/api/${chosen_region}/daily${end_bit}`;
			base_url = `https://api.covidtracking.com/v1/${chosen_region}/daily.json`;
			console.log(base_url);
			getData2(base_url);
		}
	},
});
