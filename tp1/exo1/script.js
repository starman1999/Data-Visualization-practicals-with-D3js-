//Width and height
var w = 1200;
var h = 500;
var barPadding = 35;

var dataset = [ ];
var populations = [];

//Create SVG element
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .style('background', "lightblue");

d3.csv("../../data/us-productivity.csv",  data => {

        
        d3.csv("../../data/us-cities-top-1k.csv",  data2 => {
                doThings(data, data2);

      



//doThings(data);



svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d, i) { console.log("text");
           return i * (w / dataset.length);
   })
   .attr("y", function(d) {
           return h- d*4-100;
   })
   .attr("width", d => w / dataset.length +d - barPadding)
   .attr("height", function(d) {
           return d * 4;
   })
   .attr("fill", function(d) {
        return "rgb(0, 0, " + (d * 10) + ")";
   });




svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
           return d;
   })
   .attr("text-anchor", "middle")
   .attr("x", function(d, i) {
           return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
   })
   .attr("y", function(d) {
           return h - (d * 4)-100 + 14;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "10px")
   .attr("fill", "white")

})

})


function doThings(data, data2){

       
        for(i=0; i< data.length; i++)
        {
                var sum_population = 0
                for(j=0; j<data2.length; j++){
                        var population_val = +data2[j].Population
                        if(data2[j].State == data[i].state){
                                sum_population += population_val
                        }
                }

                populations.push(sum_population)

        
        var dataValue = parseFloat(data[i].value);   //Grab data value, and convert from string to float
        //console.log(dataValue);
        dataset.push(parseInt(dataValue*20));
        };

       
        console.log(populations);
        return dataset;

       
   };
   