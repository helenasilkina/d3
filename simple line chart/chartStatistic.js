/*
* import d3.js
* Create beautiful line chat for any devices
*
* @author Helena Silkina
*/

﻿d3.json("/Analytics/GetStatistics", function(error, data) {
	var statistic = data;
	$('#statisticView').text(statistic.DailyViewsCount);
	$('#statisticSubscribers').text(statistic.DailySubscriberCount);
	if (statistic.DailyViewsPercent > 0) {
		$('#viewPercentage').text('+' + statistic.DailyViewsPercent).parent().append('<span class="wgtv-arrow-up">&bsp;</span>');
	} else {
		$('#viewPercentage').text(statistic.DailyViewsPercent).parent().append('<span class="wgtv-arrow-down">&bsp;</span>');
	}
	if (statistic.DailySubscriberPercent > 0) {
		$('#subscribersPercentage').text('+' + statistic.DailySubscriberPercent).parent().append('<span class="wgtv-arrow-up">&bsp;</span>');
	} else {
		$('#subscribersPercentage').text(statistic.DailySubscriberPercent).parent().append('<span class="wgtv-arrow-down">&bsp;</span>');
	}
	var dataView = statistic.ViewsChartData;
	var margin = {top: 20, right: 40, bottom: 30, left: 90},
		width = 998 - margin.left - margin.right,
		height = 298 - margin.top - margin.bottom;

	var parseDate = d3.time.format("%Y-%m-%d").parse;

	var x = d3.time.scale()
		.range([0, width]);

	var y = d3.scale.linear()
		.range([height, 0]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	var line = d3.svg.line()
		.x(function(d) { return x(d.Date); })
		.y(function(d) { return y(d.Value); });

	var svgViews = d3.select("#chartViews").append("svg:svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")"); 

	dataView.forEach(function(d) {
		d.Date = parseDate(d.Date);
		d.Value = +d.Value;
	});

	x.domain(d3.extent(dataView, function(d) { return d.Date; }));
	y.domain(d3.extent(dataView, function(d) { return d.Value; }));

	svgViews.selectAll(".grid")
		.data(dataView.slice(1))
		.enter().append("line")
		.attr("class", "grid")
		.attr("x1", 20)
		.attr("x2", 870)
		.attr("y1", function(d) { return y(d.Value); })
		.attr("y2", function(d) { return y(d.Value); })

	svgViews.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	svgViews.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)

	svgViews.append("path")
		.datum(dataView)
		.attr("class", "line")
		.attr("d", line);

	svgViews.selectAll(".dot")
      .data(dataView.slice(1))
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 4)
      .attr("cx", function(d) { return x(d.Date); })
      .attr("cy", function(d) { return y(d.Value); });


	// Subscribers Chart
	var dataSubscribers = statistic.SubscribersChartData;
	var svgSubscribers = d3.select("#chartSubscribers").append("svg:svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	dataSubscribers.forEach(function(d) {
		d.Date = parseDate(d.Date);
		d.Value = +d.Value;
	});
	x.domain(d3.extent(dataSubscribers, function(d) { return d.Date; }));
	y.domain(d3.extent(dataSubscribers, function(d) { return d.Value; }));
	svgSubscribers.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	svgSubscribers.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6);

	svgSubscribers.selectAll(".grid")
		.data(dataSubscribers.slice(1))
		.enter().append("line")
		.attr("class", "grid")
		.attr("x1", 20)
		.attr("x2", 870)
		.attr("y1", function(d) { return y(d.Value); })
		.attr("y2", function(d) { return y(d.Value); })

	svgSubscribers.append("path")
		.datum(dataSubscribers)
		.attr("class", "line")
		.attr("d", line);

	svgSubscribers.selectAll(".dot")
		.data(dataSubscribers.slice(1))
		.enter().append("circle")
		.attr("class", "dot")
		.attr("r", 4)
		.attr("cx", function(d) { return x(d.Date); })
		.attr("cy", function(d) { return y(d.Value); });
	
});
