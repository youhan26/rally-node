/**
 * Created by YouHan on 2016/8/2.
 */
var curSelect;
var width = $(window).width() - 100,
    height = 500,
    radius = Math.min(width, height - 50) / 2;
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
    .attr("transform", "translate(" + height / 2 + "," + (height / 2 + 10) + ")");
var partition = d3.layout.partition()
    .sort(null)
    .value(function (d) {
        return 1;
    });

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
    });

reloadChart();
d3.select(self.frameElement).style("height", height + "px");

$('#add-progress-btn').bind('click', addProgress);
$('#sub-event-button').bind('click', addSub);

function reloadChart() {
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
    });
}

function loadChart(root) {
    $('svg').find('g').empty();
    var data = partition.nodes(root);
    svg.selectAll("path")
        .data(data)
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
        });
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
        });
    data && data[0] && click(data[0]);
}

function click(d) {
    var temp = {
        x: d.x,
        y: d.y
    };
    svg.transition()
        .duration(750)
        .selectAll("text")
        .text(function (t) {
            if (t.x >= temp.x && t.y >= temp.y) {
                return t.name;
            } else {
                return '';
            }
        })
        .attrTween("transform", function (d) {
            return function () {
                var data = 'translate(' + arc.centroid(d) + ')';
                return data;
            };
        });

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
        });
    $('#select').text(d.name);
    if (d.id) {
        curSelect = d.id;
        loadProgressData();
    }
}

function addSub() {
    var el = $('[name="subEvent"]');
    var sub = el.val();
    if (sub && sub.trim()) {
        if (curSelect) {
            $.ajax({
                method: 'post',
                url: '/timeLine/chart/' + curSelect,
                datatype: 'json',
                contentType: 'application/json',
                data: JSON.stringify({
                    pid: curSelect,
                    name: sub
                }),
                success: function (res) {
                    if (res && res.success) {
                        el.val('');
                        curSelect = null;
                        reloadChart();
                    }
                },
                error: function (error) {
                    alert(error);
                }
            });
        }
    }
}

function addProgress() {
    var el = $('[name="progress"]');
    var progress = el.val();
    if (progress && progress.trim()) {
        if (curSelect) {
            $.ajax({
                method: 'post',
                url: '/timeLine/event/chart/' + curSelect,
                datatype: 'json',
                contentType: 'application/json',
                data: JSON.stringify({
                    name: progress
                }),
                success: function (res) {
                    if (res && res.success) {
                        el.val('');
                        loadProgressData();
                    }
                },
                error: function (error) {
                    alert(error);
                }
            });
        }
    }
}

function renderProgress(data) {
    if (data && data.length > 0) {
        var list = $('#list');
        list.empty();
        for (var i in data) {
            var demo = $('#demo').clone();
            demo.find('.content').text(data[i].name);
            demo.attr('id', '');
            var date = new Date(data[i].create_time);
            demo.find('.date').text((date.getYear() + 1900) + '年' + (date.getMonth() + 1) + '月 第' + getMonthWeek(date) + '周');
            demo.show();

            list.append(demo);
        }
    }
}

function getMonthWeek(date) {
    return Math.ceil((date.getDate() + 6 - date.getDay()) / 7)
}

function loadProgressData() {
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
    });
}