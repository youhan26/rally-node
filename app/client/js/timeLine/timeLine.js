***REMOVED***
 * Created by YouHan on 2016/8/2.
***REMOVED***

var width = $(window).width() / 2-200,
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
$.ajax({
    url: '/timeLine/chart/tree',
    dataType: 'json',
    success: function (res) {
        if (res && res.success) {
            loadChart(res.data);
        } else {
            console.error(res);
        }
    },
    error: function (error) {
        console.error(error);
    }
***REMOVED***

function loadChart(root) {
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
}

var curSelect;
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
        curSelect = d.id;
        loadData();
    }
}

function loadData() {
    console.log(curSelect);
    $.ajax({
        method: 'GET',
        url: '/timeLine/event/chart/' + curSelect,
        dataType: 'json',
        success: function (res) {
            if (res && res.success) {
                renderProgress(res.data);
            } else {
                alert('error when load event data');
            }
        }
    })
}

function renderProgress(data) {
    if (data && data.length > 0) {
        var el = $('#list');
        el.empty();
        var demo = $('#demo').clone();
        for (var i in data) {
            demo.find('.content').text(data[i].name);
            var date = new Date(data[i].create_time);
            demo.find('.date').text((date.getYear() + 1900) + '年' + date.getMonth() + '月 第' + getMonthWeek(date) + '周');
            el.append(demo);
            demo.show();
        }
    }
}


function getMonthWeek(date) {
    return Math.ceil((date.getDate() + 6 - date.getDay()) / 7)
}


d3.select(self.frameElement).style("height", height + "px");

document.getElementById('sub-event-button').onclick = addSub;

function addSub() {
    var sub = $('[name="subEvent"]').val();
    if (sub && sub.trim()) {
        if (curSelect) {
            $.ajax({
                method: 'post',
                url: '/timeLine/chart/' + curSelect.id,
                datatype: 'json',
                data: JSON.stringify({
                    pid: curSelect,
                    name: sub
                }),
                success: function (res) {
                    debugger;
                },
                error: function (error) {
                    alert(error);
                }
            ***REMOVED***
        }
    }
}

function addProgress() {
    var progress = $('[name="progress"]');
    if (progress && progress.trim()) {

    }
}
