
csv = d3.csv; 
select = d3.select;

const svg = select('svg');
height = +svg.attr('height'); // + sign will automatically convert to float
width = +svg.attr('width');
svg.style('background-color', "lime" )
.attr("fill", "teal")

const render = data => {


    const xValue  = d => d.population
    const yValue = d => d.country

    const margin = {
         top:40,
        right: 20, 
        bottom: 40, 
        left:70}

    //the margin convention
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom


    //using linear for numerical values
    const xScale = d3.scaleLinear()
    .domain([0, d3.max(data,xValue )])
    .range([0, innerWidth])

    
    //using scaleBand for ordinal values (countries)

    const yScale = d3.scaleBand() //yScale is a function
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.15)
    console.log(typeof(yScale))

    const yAxis = d3.axisLeft(yScale)
    const xAxis = d3.axisBottom(xScale)
   
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
    

    g.selectAll('rect')
        .data(data)
        .enter().append('rect')
        .attr('y', d => ( yScale(yValue(d)))) // rather than writing yScale(d.country), we make it flexible by writing yScale(yValue(d))
        .attr('width', d =>  xScale(xValue(d)))
        .attr('height', yScale.bandwidth())
        .on("mouseover", function() {
            select(this)
            .transition()
            .duration('50')
            .attr('fill', 'blue');
            })
        .on('mouseout', function(d, i) {
            select(this)
            .transition()
            .duration('100')
            .attr('fill', 'steelblue')
        })
        

    //it's better to group axis in its own group
    //for x axis we need to translate it down
    g.append('g')
    .attr('transform', `translate(0, ${innerHeight})`)
    .call(xAxis)  //xAxis is a function, so this instruction is identical to : xAxis(g.append('g'))

    //for y axis
    g.append('g').call(yAxis)  //this is same as: yAxis(g.append('g'))
}


let p = new Promise ((resolve, reject) =>{ //Promises are asynchronous, they are good to fetch data that takesl long time

    csv('../data/countries_population.csv', data => {
        if(data != null){
            data.forEach(d => {
                d.population = +d.population *1000;
            });
            resolve(data)
            console.log(d3.keys(data))
            
        }else{
            reject(data)
        }
    })
})


p.then( data => {
    //treat the data
    render(data)
}).catch(data => {
    console.log(data)
})


