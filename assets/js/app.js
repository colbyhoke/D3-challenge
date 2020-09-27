// Colby Alexander Hoke
// UNC Data Analytics Bootcamp
// September, 2020

// Set width and height of SVG plot
var svgWidth = 960;
var svgHeight = 500;

// Set margins
var margin = {
  top: 20,
  bottom: 60,
  left: 100,
  right: 40
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Make SVG scatter plot
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import the CSV file
d3.csv("assets/data/data.csv").then(function(demoData) {
console.log(demoData);
    
    // Pull in data
    demoData.forEach(function(data) {
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
      });
  
      // xScale
      var xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(demoData, d => d.poverty)])
        .range([0, width]);
      
      // yScale
      var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(demoData, d => d.healthcare)])
        .range([height, 0]);
  
      // Build axis
      var bottomAxis = d3.axisBottom(xLinearScale);
      var leftAxis = d3.axisLeft(yLinearScale);
  
      // 
      chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
  
      chartGroup.append("g")
        .call(leftAxis);
  
      // Make the circles for each state
      var circlesGroup = chartGroup.selectAll("circle")
      .data(demoData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.poverty)) // Postion x
      .attr("cy", d => yLinearScale(d.healthcare)) // Position y
      .attr("r", "14") // Size
      .attr("fill", "blue") // Color
      .attr("opacity", ".5");
  
      // Add identifying text to circles
      var circletextGroup = chartGroup.selectAll()
        .data(demoData)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .style("font-size", "15px")
        .style("text-anchor", "middle")
        .style('fill', 'black')
        .text(d => (d.abbr));

      // Create y axes label
      chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 1.5))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare(%)");
  
      // Create x axes label
      chartGroup.append("text")
        .attr("transform", `translate(${width / 2.5}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");
        
}).catch(function(error) {
  console.log(error);
  });
  