const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

req = new XMLHttpRequest();
req.open('GET', url, true);
req.send();
req.onload = () => {
    req = JSON.parse(req.responseText);
    
const dataset = req;
    
const width = 800;
const height = 400;
const margin = 40;

const xScale = d3.scaleLinear()
                .domain([d3.min(dataset, (d) => d.Year -1), d3.max(dataset, (d) => d.Year + 1)])
                .range([margin, width-margin]);
    

  dataset.forEach(function(d) {
    const parsedTime = d.Time.split(':');
    d.Time = new Date(Date.UTC(1970, 0, 1, 0, parsedTime[0], parsedTime[1]));})
  
    
const  yScale = d3.scaleTime()
                    .domain(d3.extent(dataset, (d) => d.Time))
                    .range([8, height - margin]);

const xAxis = d3.axisBottom(xScale)
                .tickFormat(d3.format('d'));

const yAxis = d3.axisLeft(yScale)
                .tickFormat(d3.timeFormat('%M:%S'));
    
const svg = d3.select('body')
                .append('svg')
                .attr('id', 'chart')
                .attr('width', width)
                .attr('height', height);

//const legend = d3.select('#chart')
//                    .append('rect')
//                    .attr('id', 'legend')
//                    .attr('x', width - 3 * margin)
//                    .attr('y', margin)
//                    .style('width', '4rem')
//                    .style('height', '15')
//                    .style('fill', 'red')
                    
                    

svg.selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('cx', (d) => xScale(d.Year))
    .attr('cy', (d) => yScale(d.Time))
    .attr('r', 5)
    .attr('class', 'dot')
    .style('fill', (d) => {if (d.Doping.length > 1) { return 'yellow'}    
                           else {return 'blue'}
                            })
    .attr('data-xvalue', (d) => d.Year)
    .attr('data-yvalue', (d) => d.Time);

svg.append('g')
    .attr('transform', 'translate(0, ' + (height - margin) + ')')
    .attr('id', 'x-axis')
    .call(xAxis);
    
svg.append('g')
    .attr('transform', 'translate(40, 0)')
    .attr('id', 'y-axis')
    .attr('x', 0)
    .call(yAxis);
}