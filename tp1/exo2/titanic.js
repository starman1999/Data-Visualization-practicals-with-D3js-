//Width and height
var w = 600;
var h = 500;
var barPadding = 90;
var males = [0,0,0];
var females = [0,0,0];


//Create SVG element
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .style('background', "lightblue");

var svg2 = d3.select("body")
.append("svg")
.attr("width", w)
.attr("height", h)
.style('background', "lightblue");
d3.csv("../../data/titanic-data.csv", function(data) {

doThings(data);



svg.selectAll("rect")
   .data(males)
   .enter()
   .append("rect")
   .attr("x", function(d, i) { console.log("text");
           return i * (w / males.length);
   })
   .attr("y", function(d) {
           return h- d;
   })
   .attr("width", w*0.8 / males.length - barPadding)
   .attr("height", function(d) {
           return d;
   })
   .attr("fill", function(d) {
        return "rgb(0, 0, " + (d * 5) + ")";
   });


   
svg2.selectAll("rect")
.data(females)
.enter()
.append("rect")
.attr("x", function(d, i) { console.log("text");
        return (i) * (w / females.length);
})
.attr("y", function(d) {
        return h- d*2;
})
.attr("width", w*0.8 / females.length - barPadding)
.attr("height", function(d) {
        return d*2;
})
.attr("fill", function(d) {
     return "rgb(" + (d * 10) + ", 0, 0)";
});


 


   svg.selectAll("text")
   .append("text")
   .enter()
   .text("class 01");
   


svg.selectAll("text")
   .data(males)
   .enter()
   .append("text")
   .text(function(d) {
           return d;
   })
   .attr("text-anchor", "middle")
   .attr("x", function(d, i) {
           return i * (w / males.length) + (w / males.length - barPadding) / 2;
   })
   .attr("y", function(d) {
           return h - (d ) + 14;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "15px")
   .attr("fill", "white")

   svg2.selectAll("text")
   .data(females)
   .enter()
   .append("text")
   .text(function(d) {
           return d;
   })
   .attr("text-anchor", "middle")
   .attr("x", function(d, i) {
           return i * (w / males.length) + (w / males.length - barPadding) / 2;
   })
   .attr("y", function(d) {
           return h - (d ) + 14;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "15px")
   .attr("fill", "white")


   

}

);








function doThings(data){
//Set input domain for color scale
   minim=d3.min(data, function(d) { return d.value; }); 
   maxim=d3.max(data, function(d) { return d.value; });
   //console.log(minim,maxim);

for(i=0; i< data.length; i++)
   {
        var classValue = parseInt(data[i].Pclass);
        var surviveValue = parseInt(data[i].Survived);
        var sexValue = data[i].Sex;
        console.log("sex:",sexValue);


        
        if(surviveValue == 0){
                males[classValue-1] +=1;
                if(sexValue =="male"){
                        males[classValue-1] +=1;
                }else{
                        females[classValue -1] += 1;
                }
        }
        
       
    };
    console.log(males);
   };
   