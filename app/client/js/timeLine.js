***REMOVED***
 * Created by YouHan on 2016/8/2.
***REMOVED***
var width = 960,
    height = 700,
    radius = Math.min(width, height) / 2;

var x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

var y = d3.scale.sqrt()
    .range([0, radius]);

var color = d3.scale.category20c();
var formatNumber = d3.format(",d");

var svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

var partition = d3.layout.partition()
    .sort(null)
    .value(function (d) {
        return 1;
    ***REMOVED***

var arc = d3.svg.arc()
    .startAngle(function (d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x)));
    })
    .endAngle(function (d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));
    })
    .innerRadius(function (d) {
        return Math.max(0, y(d.y));
    })
    .outerRadius(function (d) {
        return Math.max(0, y(d.y + d.dy));
    ***REMOVED***

d3.json("../data/data.json", function (error, root) {
    svg.selectAll("path")
        .data(partition.nodes(root))
        .enter()
        .append("path")
        .attr("d", arc)
        .style("fill", function (d) {
            return color((d.children ? d : d.parent).name);
        })
        .on("click", click)
        .append("title")
        .text(function (d) {
            var data = d.name + "\n" + formatNumber(d.value);
            return data;
        ***REMOVED***
    svg.selectAll('text')
        .data(partition.nodes(root))
        .enter()
        .append("text")
        .attr('transform', function (d) {
            return 'translate(' + arc.centroid(d) + ')';
        })
        .attr('text-anchor', 'middle')
        .text(function (d) {
            return d.name;
        ***REMOVED***
***REMOVED***

function click(d) {
    svg.transition()
        .duration(750)
        .tween("scale", function () {
            var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
                yd = d3.interpolate(y.domain(), [d.y, 1]),
                yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
            return function (t) {
                x.domain(xd(t));
                y.domain(yd(t)).range(yr(t));
            };
        })
        .selectAll("text")
        .attrTween("transform", function (d) {
            return function () {
                return 'translate(' + arc.centroid(d) + ')';
            };
        ***REMOVED***
    svg.transition()
        .duration(750)
        .tween("scale", function () {
            var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
                yd = d3.interpolate(y.domain(), [d.y, 1]),
                yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
            return function (t) {
                x.domain(xd(t));
                y.domain(yd(t)).range(yr(t));
            };
        })
        .selectAll("path")
        .attrTween("d", function (d) {
            return function () {
                return arc(d);
            };
        ***REMOVED***
    $('#select').text(d.name);
    if (d.id) {
        loadData(d.id);
    }
}

function loadData(id) {

}


d3.select(self.frameElement).style("height", height + "px");