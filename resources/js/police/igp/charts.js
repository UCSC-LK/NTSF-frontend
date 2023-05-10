//Scatter graphs - myChart1

const xValues1 = ["June", "July", "August", "September", "October", "November", "December", "January", "Febru"  ,"April" ,"May"];
const yValues1 = [70000,84000,65000,99000,57000,82000,100000,35000,47000,78000,83000, 65000, 28000];

new Chart("myChart1", {
  type: "line",
  data: {
    labels: xValues1,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues1
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 0, max:120000}}],
    }
  }
});


//doughnut graph - myChart2
var xValues = ["Driver", "Vehicle", "Pedestrian"];
var yValues = [35000, 10000, 25000];
var barColors = [
  "#b91d47",
  "#00aba9",
  "#2b5797",
];

new Chart("myChart2", {
  type: "doughnut",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    title: {
      display: true,
      text: "Offence Types"
    }
  }
});


//Bar Graph - myChart3
var xValues = ["Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"];
var yValues = [55000, 49000, 44000, 240000, 350000, 55000, 49000, 44000, 240000, 350000, 55000, 49000, 44000, 240000, 350000, 55000, 49000, 44000, 240000, 350000, 55000, 49000, 44000, 240000, 350000, 55000, 49000, 44000, 240000, 350000];
var barColors =  ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#800000", "#008000", "#000080", "#808000", "#800080", "#008080", "#C0C0C0", "#FFA500", "#FFC0CB", "#FF7F50", "#FF00FF", "#FF1493", "#00FF7F", "#2E8B57", "#DC143C", "#FFD700", "#1E90FF", "#BA55D3", "#ADFF2F"];

new Chart("myChart3", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "Fine Amounts By Districts"
    }
  }
});