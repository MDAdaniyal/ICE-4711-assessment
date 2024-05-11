// New dataset representing environmental data across different time slots and locations
var dataset = [
  { time: '5:30 AM', location: 'Location 1', PM25: 12, CO2: 500, NOx: 300, O3: 28, Humidity: 80, Temp: 22 },
  { time: '6:30 AM', location: 'Location 1', PM25: 15, CO2: 515, NOx: 320, O3: 30, Humidity: 78, Temp: 23 },
  { time: '7:30 AM', location: 'Location 1', PM25: 18, CO2: 530, NOx: 350, O3: 32, Humidity: 75, Temp: 24 },
  { time: '8:30 AM', location: 'Location 1', PM25: 20, CO2: 545, NOx: 370, O3: 35, Humidity: 73, Temp: 25 },
  { time: '9:30 AM', location: 'Location 1', PM25: 22, CO2: 560, NOx: 390, O3: 38, Humidity: 70, Temp: 26 },
  { time: '5:30 AM', location: 'Location 2', PM25: 10, CO2: 480, NOx: 290, O3: 25, Humidity: 83, Temp: 21 },
  { time: '6:30 AM', location: 'Location 2', PM25: 13, CO2: 495, NOx: 310, O3: 27, Humidity: 80, Temp: 22 },
  { time: '7:30 AM', location: 'Location 2', PM25: 17, CO2: 510, NOx: 340, O3: 29, Humidity: 78, Temp: 23 },
  { time: '8:30 AM', location: 'Location 2', PM25: 19, CO2: 525, NOx: 360, O3: 31, Humidity: 76, Temp: 24 },
  { time: '9:30 AM', location: 'Location 2', PM25: 21, CO2: 540, NOx: 380, O3: 33, Humidity: 74, Temp: 25 },
  { time: '5:30 AM', location: 'Location 3', PM25: 11, CO2: 490, NOx: 295, O3: 26, Humidity: 81, Temp: 21 },
  { time: '6:30 AM', location: 'Location 3', PM25: 14, CO2: 505, NOx: 315, O3: 28, Humidity: 79, Temp: 22 },
  { time: '7:30 AM', location: 'Location 3', PM25: 16, CO2: 520, NOx: 335, O3: 30, Humidity: 77, Temp: 23 },
  { time: '8:30 AM', location: 'Location 3', PM25: 18, CO2: 535, NOx: 355, O3: 32, Humidity: 74, Temp: 24 },
  { time: '9:30 AM', location: 'Location 3', PM25: 20, CO2: 550, NOx: 375, O3: 34, Humidity: 71, Temp: 25 },
  { time: '5:30 AM', location: 'Location 4', PM25: 13, CO2: 485, NOx: 305, O3: 24, Humidity: 84, Temp: 20 },
  { time: '6:30 AM', location: 'Location 4', PM25: 16, CO2: 500, NOx: 325, O3: 26, Humidity: 82, Temp: 21 },
  { time: '7:30 AM', location: 'Location 4', PM25: 19, CO2: 515, NOx: 345, O3: 28, Humidity: 79, Temp: 22 },
  { time: '8:30 AM', location: 'Location 4', PM25: 21, CO2: 530, NOx: 365, O3: 30, Humidity: 76, Temp: 23 },
  { time: '9:30 AM', location: 'Location 4', PM25: 23, CO2: 545, NOx: 385, O3: 32, Humidity: 73, Temp: 24 },
  { time: '5:30 AM', location: 'Location 5', PM25: 14, CO2: 495, NOx: 315, O3: 27, Humidity: 82, Temp: 21 },
  { time: '6:30 AM', location: 'Location 5', PM25: 17, CO2: 510, NOx: 335, O3: 29, Humidity: 79, Temp: 22 },
  { time: '7:30 AM', location: 'Location 5', PM25: 20, CO2: 525, NOx: 355, O3: 31, Humidity: 77, Temp: 23 },
  { time: '8:30 AM', location: 'Location 5', PM25: 22, CO2: 540, NOx: 375, O3: 33, Humidity: 74, Temp: 24 },
  { time: '9:30 AM', location: 'Location 5', PM25: 24, CO2: 555, NOx: 395, O3: 35, Humidity: 72, Temp: 25 }
];

// Calculate the grid size
var gridMax = Math.sqrt(dataset.length);
var chartWidth = gridMax * 1.1; // Spacing for better visibility
var chartHeight = Math.max(...dataset.map(d => d.PM25)) / 2;
var chartDepth = Math.ceil(dataset.length / gridMax) * 1.1;

// Select the 3D container to append the bars
var content = d3.select("#helloworld");

// Enter/update/exit pattern to draw and bind the DOM elements
var myBars = content.selectAll("a-box.bar")
  .data(dataset)
  .enter()
  .append("a-box")
  .classed("bar", true);

// Position and configure each bar
myBars.attr({
  position: function(d, i) {
    var x = i % gridMax;
    var z = Math.floor(i / gridMax);
    var y = d.PM25 / 4 - chartHeight / 2;
    var posX = x * 1.1 - chartWidth / 2 + 0.5;
    var posZ = -z * 1.1 + chartDepth / 2 - 0.5;
    return posX + " " + y + " " + posZ;
  },
  height: function(d) { return d.PM25 / 2; }, // PM2.5 determines bar height
  width: 0.9,
  depth: 0.9,
  color: function(d) {
    // Generate a random color for each bar
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
});

// Add X-axis
content.append("a-box")
  .attr("width", chartWidth)
  .attr("height", 0.05)
  .attr("depth", 0.05)
  .attr("position", "0 " + (-chartHeight / 2 - 0.025) + " " + (chartDepth / 2 + 0.025))
  .attr("color", "white");

// Add Y-axis
content.append("a-box")
  .attr("width", 0.05)
  .attr("height", chartHeight)
  .attr("depth", 0.05)
  .attr("position", (-chartWidth / 2 - 0.025) + " 0 " + (chartDepth / 2 + 0.025))
  .attr("color", "white");

// Add Z-axis
content.append("a-box")
  .attr("width", 0.05)
  .attr("height", 0.05)
  .attr("depth", chartDepth)
  .attr("position", (chartWidth / 2 + 0.025) + " -" + (chartHeight / 2 + 0.025) + " 0")
  .attr("color", "white");

// Add labels to the axes
content.append("a-text")
  .attr("value", "X Axis")
  .attr("position", "0 " + (-chartHeight / 2 - 0.15) + " " + (chartDepth / 2 + 0.15))
  .attr("rotation", "0 0 0")
  .attr("align", "center")
  .attr("width", "10")
  .attr("color", "white");

content.append("a-text")
  .attr("value", "Y Axis")
  .attr("position", (-chartWidth / 2 - 0.15) + " 0 " + (chartDepth / 2 + 0.15))
  .attr("rotation", "0 0 -90")
  .attr("align", "center")
  .attr("width", "10")
  .attr("color", "white");

content.append("a-text")
  .attr("value", "Z Axis")
  .attr("position", (chartWidth / 2 + 0.15) + " -" + (chartHeight / 2 + 0.15) + " 0")
  .attr("rotation", "0 90 0")
  .attr("align", "center")
  .attr("width", "10")
  .attr("color", "white");

// Add tick marks and labels on X, Y, and Z axes
function addAxisTicks(axis, ticks, scale, chartDim, chartPos, rotation, color = "gray") {
  ticks.forEach((tick, i) => {
    var tickPos = scale(tick) - chartDim / 2;
    content.append("a-box")
      .attr("width", 0.05)
      .attr("height", 0.05)
      .attr("depth", 0.05)
      .attr("position", tickPos + " " + chartPos)
      .attr("color", color);

    content.append("a-text")
      .attr("value", tick)
      .attr("position", tickPos + " " + chartPos)
      .attr("rotation", rotation)
      .attr("align", "center")
      .attr("width", "12")
      .attr("color", color);
  });
}

// Add X-axis tick marks
var xScale = d3.scale.linear().domain([0, gridMax - 1]).range([0, chartWidth]).nice();
var xTicks = d3.range(gridMax);
addAxisTicks("x", xTicks, xScale, chartWidth, (-chartHeight / 2 - 0.075) + " " + (chartDepth / 2 + 0.05), "0 0 90");

// Add Y-axis tick marks
var yScale = d3.scale.linear().domain([0, Math.max(...dataset.map(d => d.PM25))]).range([0, chartHeight]).nice();
var yTicks = yScale.ticks();
addAxisTicks("y", yTicks, yScale, chartHeight, (-chartWidth / 2 - 0.075) + " 0 " + (chartDepth / 2 + 0.025), "0 0 0");

// Add Z-axis tick marks
var zScale = d3.scale.linear().domain([0, Math.ceil(dataset.length / gridMax) - 1]).range([0, chartDepth]).nice();
var zTicks = d3.range(Math.ceil(dataset.length / gridMax));
addAxisTicks("z", zTicks, zScale, chartDepth, (chartWidth / 2 + 0.05) + " " + (-chartHeight / 2 - 0.075) + " 0", "0 90 0");

