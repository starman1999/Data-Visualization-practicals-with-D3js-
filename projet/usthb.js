
//Width and height
var svgWidth = 900;
var svgHeight = 600;

margin = { "top": 25, "right": 25, "bottom": 50, "left": 50}
w =  svgWidth - margin.left - margin.right
h = svgHeight - margin.top - margin.bottom 

//Define map projection
var proj = d3.geo.mercator()
            .translate([0,0])
            .scale([1]);

//Define path generator
var path = d3.geo.path()
        .projection(proj);
        


var zoom_stroke = 2;


//4 promises to collect all the necessary data. (usthb geojson data and the files of all semesters)

let promise1 = new Promise ((resolve, reject) =>{ 

    d3.json('usthbBrut2.geojson', usthbData => {
        if(usthbData != null){ resolve(usthbData) }else{ reject(usthbData) }
    })
});


let promise2 = new Promise ((resolve, reject) =>{  //read the schedule data of m2 s1
    d3.json('M1.json', data => {
        if(data != null){ resolve(data) }else{ reject(data) }
    });

    
});


let promise3 = new Promise ((resolve, reject) =>{ 
    d3.json('M2.json', data => {
        if(data != null){ resolve(data) }else{ reject(data) }
    })
});




Promise.all([promise1, promise2, promise3]).then(function(data){
    json = data[0]
    //m1
    m1 = data[1]
    m2 = data[2]


    
    console.log(m2[1]);


    var zoom = d3.zoom()
    .scaleExtent([0.8, 70]).on("zoom", function () {

        svg.attr("transform", d3.event.transform)
        zoom_stroke = d3.event.transform.k; //for the stroke width to be proportional with the zoom level
    });




    var svg = d3.select("#svg")
        .attr("width",  w)
        .attr("height",  h)
        .style("background-color", "lavender")
        .call(zoom)
        .append("g");
    
    svg.append("text")
    .text("current place name")
    .attr("x", 80)
    .attr("y", 80)
    .attr("class", "svgText")

        //reset the zoom when choosing another schedule/ pressing the button
        d3.select("#resetButton").on("click", function(){ 

            svg.transition()
            .duration(750)
            .call(zoom.transform, d3.zoomIdentity);
           
        })
    


    var b = path.bounds(json);
    console.log(b);
    s = .99 / Math.max( (b[1][0] - b[0][0]) / w , (b[1][1] - b[0][1]) / h ); 
    t = [ (w - s * (b[1][0] +b[0][0])) / 2 , (h - s * (b[1][1]+b[0][1])) / 2 ];
    //sconsole.log(s,t);
    proj.translate(t).scale(s);



    var z = d3.behavior.zoom() 

    svg.selectAll("path")
    .data(json.features)  //usthb geojson DATA          
    .enter()
    .append("path")
    .attr("d", path)
    .attr('transform', 'translate(250,-210)rotate(35)')
    .attr("fill" ,d =>{

        if(d['properties'].name == "ground"){
        return "#3E768C"
        }else
        {
        return "#B3E0F2"
        }

    })
    .on("mouseover", function(d){
        
        let myScale = d3.scaleLinear()
                .domain([0, 71])
                .range([0, 2]);

        console.log(2 - myScale(zoom_stroke))
        if(d['properties'].name != "ground"){ //skip the ground feature
            console.log(d['properties'].name)
            d3.select(this)
            .attr("fill", "#79BED9")
            .attr("stroke", "yellow")
            .style('stroke-width', ( 2 - myScale(zoom_stroke))); //keep the stroke width proportional with the zoom level


            if(d['properties'].name != ""){
                svg.select("text") //print the place name on the screen when hovering
                .text(d['properties'].name);
            }else{
                svg.select("text") //print the place name on the screen when hovering
                .text(d['properties'].osm_way_id);
            }
        
        }
        
    })
    .on("mouseout", function(d){

            if(d['properties'].name != "ground"){
            d3.select(this)
            .attr("fill", "#B3E0F1")
            .style('stroke-width', '0px');
            }
            
        
    })
    .append('title').text(d => d['properties'].name)



});




