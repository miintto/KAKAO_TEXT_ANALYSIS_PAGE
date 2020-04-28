//////////////////////////////////////////////////
//
//  D3 차트 생성
//
//////////////////////////////////////////////////


function chart_heatmap(dataset, chart_idx) {
//	Input Format:
//		dataset : [
//			{"month": "19-01", "name": "name1", "chat": 90},
//			{"month": "19-01", "name": "name2", "chat": 45},
//			{"month": "19-01", "name": "name3", "chat": 15},
//			...
//		]

	var myColor = d3.scaleLinear()
		.domain([0, d3.max(dataset, function(d){ return d.chat**0.5;})]).range(["#FFFFFF", "#175C85"])


	var margin = {top: 10, right: 10, bottom: 30, left: 80};

	var width  = 560 - margin.right-margin.left;	// width = 560-30 = 530
	var height = 300 - margin.top-margin.bottom;	// height = 300-20 = 280


	var svg = d3.select(chart_idx)
				.append('svg').attr('class', 'chart-d3').attr('width', 600).attr('height', 300)
				.append('g').attr('transform', "translate("+margin.left+","+margin.top+")");

	var xScale = d3.scaleBand()		/// 고정된 문자열일때
		.domain(dataset.map(function(d) { return d.month;} ))
		.range([0, width]).padding(0.01);
	svg.append("g")
		.attr("transform", "translate(0,"+height+")")	/// (0, 280)에 axis 그리기
		.call(d3.axisBottom(xScale));

	var yScale = d3.scaleBand()
		.domain(dataset.map(function(d){ return d.name; }))
		.range([0, height]).padding(0.02)
	svg.append("g")
		.call(d3.axisLeft(yScale).ticks(5));

	svg.selectAll()
		.data(dataset)
		.enter().append('rect')
			.attr('class', 'cell')
			.attr('fill', function(d, i) {return myColor(d.chat**0.5)})
			.attr('height', yScale.bandwidth())
			.attr('width', xScale.bandwidth())					/// xScale 로 bar너비를 자동으로 조정하여 배열
			.attr('x', function(d, i) {return xScale(d.month)})		/// xScale 로 간격을 자동으로 조정하여 배열
			.attr('y', function(d, i) {return yScale(d.name)})
			.style('opacity', 0.8)
		.on('mouseover', function() {
			tooltip.style("display", null);
			d3.select(this)
				.style('stroke', 'black')
				.style('stroke-width', 3)
				.style('opacity', 1)
			})
		.on('mouseout', function() {
			tooltip.style("display", "none");
			d3.select(this)
				.style('stroke', 'none')
				.style('opacity', 0.8)
			})
		.on('mousemove', function(d) {
			tooltip.style("left", (d3.event.pageX + 10) + "px")
				.style("top", (d3.event.pageY - 10) + "px")
				.html('20'+d.month+' '+d.name+'<br>채팅 <b>'+d.chat+'</b> 건')
			});

	var tooltip = d3.select('body').append('div')
					.attr('class', 'tooltip')
					.style('display', 'none')
}



function chart_pie(dataset, chart_idx) {
//	Input Format:
//		dataset : [
//			{"name": "name1", "chat": 90},
//			{"name": "name2", "chat": 45},
//			{"name": "name3", "chat": 15},
//			...
//		]

	var color = ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]

	var margin = 25
	var width  = 600
	var height = 300
	var radius = height/2

	var svg = d3.select(chart_idx)
				.append('svg').attr('class', 'chart-d3').attr('width', width).attr('height', height)
				.append('g').attr('transform', "translate("+width/2+","+height/2+")")

	var pie = d3.pie()
				.value(function(d) {return d.chat})
	var data_arcs = pie(dataset)

	var sum = d3.sum(dataset, function(d) {return d.chat})

	var arc = d3.arc()
		.innerRadius(radius*0.3)
		.outerRadius(radius*0.8)

	var outerArc = d3.arc()
		.innerRadius(radius*0.9)
		.outerRadius(radius*0.9)

	svg.selectAll()
		.data(data_arcs)
		.enter().append('path')
		.attr('d', arc)
		.attr('class', 'cell')
		.attr('fill', function(d, i) {return color[i]})
		.style("opacity", 0.9)
		.on('mouseover', function() { 
			tooltip.style("display", null);
			d3.select(this)
				.style('stroke', 'black')
				.style('stroke-width', 3)
				.style('opacity', 1) 
			})
		.on('mouseout',	function() { 
			tooltip.style("display", "none");
			d3.select(this)
				.style('stroke', 'none')
				.style('opacity', 0.9) 
			})
		.on('mousemove', function(d) {
			tooltip.style("left", (d3.event.pageX + 10) + "px")
				.style("top", (d3.event.pageY - 10) + "px")
				.html(d.data.name+'<br>채팅 <b>'+d.value+'</b> 건  ( '+(d.value/sum*100).toFixed(1)+'% )')
			});

	svg.selectAll()
		.data(data_arcs)
		.enter().append('polyline')
		.attr("stroke", "black")
		.style("fill", "none")
		.attr("stroke-width", 1)
		.attr('points', function(d) {
			var posA = arc.centroid(d)
			var posB = outerArc.centroid(d)
			var posC = outerArc.centroid(d)
			var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
			posC[0] = radius * 1.05 * (midangle < Math.PI ? 1 : -1)
			return [posA, posB, posC]
		})
	svg.selectAll()
		.data(data_arcs)
		.enter().append('text')
		.text( function(d) { return d.data.name } )
		.attr('transform', function(d) {
			var pos = outerArc.centroid(d);
			var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
			pos[0] = radius * 1.07 * (midangle < Math.PI ? 1 : -1);
			return 'translate(' + pos + ')';
		})
		.style('text-anchor', function(d) {
			var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
			return (midangle < Math.PI ? 'start' : 'end')
		 })
		.style('font-size', '10px')

	svg.selectAll()
		.data(data_arcs)
		.enter().append('text')
		.text( function(d) { return (d.data.chat/sum*100).toFixed(1)+'%' } )
		.attr('transform', function(d) {
			return 'translate(' + arc.centroid(d) + ')';
		})
		.style('text-anchor', function(d) {
			var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
			return (midangle < Math.PI ? 'start' : 'end')
		 })
		.style('font-size', '10px')

	var tooltip = d3.select('body').append('div')
					.attr('class', 'tooltip')
					.style('display', 'none')
}



function chart_area(dataset, chart_idx) {
	var color = ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]

	var margin = {top: 10, right: 10, bottom: 30, left: 60};

	var width  = 600 - margin.right-margin.left;	// width = 500-30 = 470
	var height = 300 - margin.top-margin.bottom;	// height = 300-20 = 280

	var svg = d3.select(chart_idx)
				.append('svg').attr('class', 'chart-d3').attr('width', 600).attr('height', 300)
				.append('g').attr('transform', "translate("+margin.left+","+margin.top+")");

	var sumstat = d3.nest()
		.key(function(d) {return d.month;})
		.entries(dataset)

	var mygroups = ['가레기', '박민재', '저녕구', '타다요시', '박병규', '정승원', '이종하', '박지성', '김정민']
	var mygroup = [1, 2, 3, 4, 5, 6, 7, 8, 9].reverse()
	var stacked_data = d3.stack()
		.keys(mygroup)
		.value(function(d, key){
			return d.values[key].chat
		})
		(sumstat)

	var xScale = d3.scaleBand()		/// 고정된 문자열일때
		.domain(dataset.map(function(d) { return d.month;} ))
		.range([0, width]).padding(0.01);
	svg.append("g")
		.attr("transform", "translate(0,"+height+")")	/// (0, 280)에 axis 그리기
		.call(d3.axisBottom(xScale));

	var yScale = d3.scaleLinear()	/// 연속된 숫자일때
		.domain([0, d3.max(dataset, function(d) { return d.chat*2;})])
		.range([height, 0]);
	svg.append("g")
		.call(d3.axisLeft(yScale));

	var colormap = d3.scaleOrdinal()
		.domain(mygroups)
		.range(color)

	svg.selectAll('area')
		.data(stacked_data)
		.enter()
		.append('path')
			.style('fill', function(d) { name = mygroups[d.key-1]; return colormap(name); })
			.attr('d', d3.area()
						.curve(d3.curveMonotoneX)
						.x(function(d, i) { return xScale(d.data.key); })
						.y0(function(d) { return yScale(d[0]); })
						.y1(function(d) { return yScale(d[1]); })
				)
		.on('mouseover', function() {
			tooltip.style("display", null);
			d3.select(this)
				.style('stroke', 'black')
				.style('stroke-width', 3)
				.style('opacity', 1)
			})
		.on('mouseout', function() {
			tooltip.style("display", "none");
			d3.select(this)
				.style('stroke', 'none')
				.style('opacity', 0.9)
			})
		.on('mousemove', function(d) {
			tooltip.style("left", (d3.event.pageX + 10) + "px")
				.style("top", (d3.event.pageY - 10) + "px")
				.html('<br>채팅 <b>'+d+'</b> 건')
			})``

	var tooltip = d3.select('body').append('div')
					.attr('class', 'tooltip')
					.style('display', 'none')
}



function chart_stream(dataset, chart_idx) {
//	Input Format:
//		dataset : [
//			{"month": "19-01", "name1": 18, "name2": 12, "name3": 8},
//			{"month": "19-01", "name1": 13, "name2": 11, "name3": 7},
//			{"month": "19-01", "name1": 10, "name2": 9, "name3": 5},
//			...
//		]

	var color = ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]

	var margin = {top: 10, right: 10, bottom: 30, left: 60};

	var width  = 560 - margin.right-margin.left;	// width = 500-30 = 470
	var height = 300 - margin.top-margin.bottom;	// height = 300-20 = 280

	var svg = d3.select(chart_idx)
				.append('svg').attr('class', 'chart-d3').attr('width', 600).attr('height', 300)
				.append('g').attr('transform', "translate("+margin.left+","+margin.top+")");

	var keys = Object.getOwnPropertyNames(dataset[0]).slice(1)

	var stacked_data = d3.stack()
		.offset(d3.stackOffsetSilhouette)
		.keys(keys.reverse())
		(dataset)

	var limit = d3.max(stacked_data[0], function(d) {return -d[0]})   // y축 상한선

	var parseTime  = d3.timeParse("%y-%m");
	var xScale = d3.scaleTime()
		.domain(d3.extent(dataset, function(d) { month=parseTime(d.month); return month; }))
		.range([0, width]);
	svg.append("g")
		.attr("transform", "translate(0,"+height+")")	/// (0, 280)에 axis 그리기
		.call(d3.axisBottom(xScale)
			.ticks(d3.timeMonth)
			.tickFormat(d3.timeFormat("%y-%m"))
		);

	var yScale = d3.scaleLinear()
		.domain([-limit, limit])
		.range([height, 0]);
	svg.append("g")
		.call(d3.axisLeft(yScale));

	var colormap = d3.scaleOrdinal()
		.domain(keys.reverse())
		.range(color)

	svg.selectAll('area')
		.data(stacked_data)
		.enter()
		.append('path')
			.style('fill', function(d) { return colormap(d.key); })
			.attr('d', d3.area()
						.curve(d3.curveMonotoneX)
						.x(function(d, i) { month=parseTime(d.data.month); return xScale(month); })
						.y0(function(d) { return yScale(d[0]); })
						.y1(function(d) { return yScale(d[1]); })
				)
			.on('mouseover', function() {
				tooltip.style("display", null);
				d3.select(this)
					.style('stroke', 'black')
					.style('stroke-width', 3)
					.style('opacity', 1)
				})
			.on('mouseout', function() {
				tooltip.style("display", "none");
				d3.select(this)
					.style('stroke', 'none')
					.style('opacity', 0.9)
				})
			.on('mousemove', function(d) {
				tooltip.style("left", (d3.event.pageX + 10) + "px")
					.style("top", (d3.event.pageY - 10) + "px")
					.html('<b>'+d.key+'</b>')
				})

	var tooltip = d3.select('body').append('div')
					.attr('class', 'tooltip')
					.style('display', 'none')
}



function chart_bar(dataset, chart_idx) {
//	Input Format:
//		dataset : [
//			{"name": "name1", "chat": 90},
//			{"name": "name2", "chat": 45},
//			{"name": "name3", "chat": 15},
//			...
//		]

	var myColor = d3.scaleLinear()
		.domain([0, d3.max(dataset, function(d){ return d.chat**0.5;})]).range(["#FFFFFF", "#175C85"])

	var margin = {top: 10, right: 10, bottom: 30, left: 60};

	var width  = 560 - margin.right-margin.left;	// width = 500-30 = 470
	var height = 300 - margin.top-margin.bottom;	// height = 300-20 = 280

	var svg = d3.select(chart_idx)
				.append('svg').attr('class', 'chart-d3').attr('width', 600).attr('height', 300)
				.append('g').attr('transform', "translate("+margin.left+","+margin.top+")");

	var xScale = d3.scaleBand()		/// 고정된 문자열일때
		.domain(dataset.map(function(d) { return d.name;} ))
		.range([0, width])
		.padding(0.2);
	svg.append("g")
		.attr("transform", "translate(0,"+height+")")	/// (0, 280)에 axis 그리기
		.call(d3.axisBottom(xScale));

	var yScale = d3.scaleLinear()	/// 연속된 숫자일때
		.domain([0, d3.max(dataset, function(d){ return d.chat;})])
		.range([height, 0]);
	svg.append("g")
		.call(d3.axisLeft(yScale).ticks(5));

	svg.selectAll('bar')
		.data(dataset)
		.enter().append('rect')
			.attr('class', 'cell')
			.attr('fill', function(d, i) {return myColor(d.chat**0.5)})
			.attr('height', function(d, i) {return height-yScale(d.chat)})
			.attr('width', xScale.bandwidth())					/// xScale 로 bar너비를 자동으로 조정하여 배열
			.attr('x', function(d, i) {return xScale(d.name)})		/// xScale 로 간격을 자동으로 조정하여 배열
			.attr('y', function(d, i) {return yScale(d.chat)})
			.style('opacity', 0.9)
		.on('mouseover', function() { 
			tooltip.style("display", null);
			d3.select(this)
				.style('stroke', 'black')
				.style('stroke-width', 3)
				.style('opacity', 1) 
			})
		.on('mouseout', function() {
			tooltip.style("display", "none");
			d3.select(this)
				.style('stroke', 'none')
				.style('opacity', 0.9) 
			})
		.on('mousemove', function(d) {
			tooltip.style("left", (d3.event.pageX + 10) + "px")
				.style("top", (d3.event.pageY - 10) + "px")
				.html(d.name+'<br>채팅 <b>'+d.chat+'</b> 건')
			})

	var tooltip = d3.select('body').append('div')
					.attr('class', 'tooltip')
					.style('display', 'none')
}



function chart_wkday(dataset, chart_idx) {
//	Input Format:
//		dataset : [
//			{"hour": "00", "wkday": 0, "chat": 3},
//			{"hour": "00", "wkday": 1, "chat": 13},
//			{"hour": "00", "wkday": 2, "chat": 11},
//			...
//		]

	var myColor = d3.scaleLinear()
		.domain([0, d3.max(dataset, function(d){ return d.chat**0.5;})]).range(["#FFFFFF", "#175C85"])

	var weekDays = {0:'월', 1:'화', 2:'수', 3:'목', 4:'금', 5:'토', 6:'일'}

	var margin = {top: 10, right: 10, bottom: 30, left: 40};

	var width  = 575 - margin.right-margin.left;	// width = 500-30 = 470
	var height = 300 - margin.top-margin.bottom;	// height = 300-20 = 280


	var svg = d3.select(chart_idx)
				.append('svg').attr('class', 'chart-d3').attr('width', 600).attr('height', 300)
				.append('g').attr('transform', "translate("+margin.left+","+margin.top+")");

	var xScale = d3.scaleBand()		/// 고정된 문자열일때
		.domain(dataset.map(function(d) { return d.hour;} ))
		.range([0, width])
		.padding(0.05);
	svg.append("g")
		.attr("transform", "translate(0,"+height+")")	/// (0, 280)에 axis 그리기
		.call(d3.axisBottom(xScale));

	var yScale = d3.scaleBand()
		.domain(dataset.map(function(d){ return weekDays[d.wkday]; }))
		.range([0, height])
		.padding(0.02)
	svg.append("g")
		.call(d3.axisLeft(yScale).ticks(5));

	svg.selectAll()
		.data(dataset)
		.enter().append('rect')
			.attr('class', 'cell')
			.attr('fill', function(d, i) {return myColor(d.chat**0.5)})
			.attr('height', yScale.bandwidth())
			.attr('width', xScale.bandwidth())					/// xScale 로 bar너비를 자동으로 조정하여 배열
			.attr('x', function(d, i) {return xScale(d.hour)})		/// xScale 로 간격을 자동으로 조정하여 배열
			.attr('y', function(d, i) {return yScale(weekDays[d.wkday])})
			.style('opacity', 0.8)
		.on('mouseover', function() { 
			tooltip.style("display", null);
			d3.select(this)
				.style('stroke', 'black')
				.style('stroke-width', 3)
				.style('opacity', 1) 
			})
		.on('mouseout', function() {
			tooltip.style("display", "none");
			d3.select(this)
				.style('stroke', 'none')
				.style('opacity', 0.8) 
			})
		.on('mousemove', function(d) {
			tooltip.style("left", (d3.event.pageX + 10) + "px")
				.style("top", (d3.event.pageY - 10) + "px")
				.html(weekDays[d.wkday]+'요일  '+d.hour+'시<br>채팅 <b>'+d.chat+'</b> 건')
			});

	var tooltip = d3.select('body').append('div')
					.attr('class', 'tooltip')
					.style('display', 'none')
}



function chart_wordcloud(dataset, chart_idx) {
//	Input Format:
//		dataset : [
//			{"word": "word1", "count": 45},
//			{"word": "word1", "count": 37},
//			{"word": "word1", "count": 19},
//			...
//		]

	var color = ['#1A4357', '#315669', '#486878', '#5F7B8A', '#768D99', '#8CA1AB', '#A3B4BC', '#BAC7CD', '#D3DADE', '#E8ECEE']

	var margin = {top: 10, right: 10, bottom: 10, left: 10}
	var height = 300 - margin.top - margin.bottom
	var width = 600 - margin.right - margin.right

	var svg = d3.select(chart_idx)
				.append('svg').attr('class', 'chart-d3').attr('width', 600).attr('height', 300)
				.append('g').attr('transform', "translate("+margin.left+","+margin.top+")")


	var layout = d3.layout.cloud()
						.size([width, height])
						.words(dataset.map(function(d) {return {text:d.word, size:d.count}}))
						.padding(3)
						.rotate(0)
						.fontSize(function(d) {return (d.size**0.5)*2})
						.on('end', draw)
	layout.start()

	function draw(words) {
		svg.append('g')
				.attr('transform', 'translate('+layout.size()[0]/2+','+layout.size()[1]/2+')')
			.selectAll()
			.data(words)
			.enter().append('text')
				.style('font-size', function(d) {return d.size})
				.style('fill', '#69b3a2')
				.attr('text-anchor', 'middle')
				.attr('transform', function(d) {return 'translate('+[d.x,d.y]+')rotate('+d.rotate+')'})
				.text(function(d) {return d.text})
// TODO : wordcloud 에 tool넣기
//				.on('mouseover', handleMouseOver)
//				.on('mouseout', handleMouseOut);
//	}
//
//	function handleMouseOver(d) {
//	var group = svg.append('g')
//					 .attr('id', 'story-titles');
//	 var base = d.y - d.size;
//
//	group.selectAll('text')
//		 .data(data['sample_title'][d.key])
//		 .enter().append('text')
//		 .attr('x', d.x)
//		 .attr('y', function(title, i) {
//		   return (base - i*14);
//		 })
//		 .attr('text-anchor', 'middle')
//		 .text(function(title) { return title; });
//
//	var bbox = group.node().getBBox();
//	var bboxPadding = 5;
//
//	// place a white background to see text more clearly
//	var rect = group.insert('rect', ':first-child')
//				  .attr('x', bbox.x)
//				  .attr('y', bbox.y)
//				  .attr('width', bbox.width + bboxPadding)
//				  .attr('height', bbox.height + bboxPadding)
//				  .attr('rx', 10)
//				  .attr('ry', 10)
//				  .attr('class', 'label-background-strong');
//	}
//
//	function handleMouseOut(d) {
//	d3.select('#story-titles').remove();
  }
}



function chart_circular_packing(dataset, chart_idx) {
//	Input Format:
//		dataset : [
//			{"name": "name1", "chat": 90, "area": 6000},
//			{"name": "name2", "chat": 45, "area": 3000},
//			{"name": "name3", "chat": 15, "area": 1000},
//			...
//		]

	var color = ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]

	var margin = 25
	var width	= 600
	var height = 300

	var svg = d3.select(chart_idx)
				.append('svg').attr('class', 'chart-d3').attr('width', width).attr('height', height)

	var node = svg.append('g')
				.selectAll()
				.data(dataset)
				.enter().append('circle')
					.attr('class', 'cell')
					.attr('r', function(d) {return d.area**0.5})
					.attr("cx", width / 2)
					.attr("cy", height / 2)
					.style("fill", function(d, i){return color[i]})
					.style("fill-opacity", 0.8)
					.on('mouseover', function() { 
						tooltip.style("display", null);
						d3.select(this)
							.style('stroke', 'black')
							.style('stroke-width', 3)
							.style('opacity', 1) 
						})
					.on('mouseout', function() {
						tooltip.style("display", "none");
						d3.select(this)
							.style('stroke', 'none')
							.style('opacity', 0.8) 
						})
					.on('mousemove', function(d) {
						tooltip.style("left", (d3.event.pageX + 10) + "px")
							.style("top", (d3.event.pageY - 10) + "px")
							.html(d.name+'<br>채팅 <b>'+d.chat+'</b> 건')
						})
					.call(d3.drag()
						.on("start", dragstarted)
						.on("drag", dragged)
						.on("end", dragended)
						)

	var simulation = d3.forceSimulation()
		.force("forceX", d3.forceX().strength(.05).x(width * .5))  // 가운데로 몰리도록 x축
		.force("forceY", d3.forceY().strength(.05).y(height * .5))  // 가운데로 몰리도록 y축
		.force("center", d3.forceCenter().x(width / 2).y(height / 2))
		.force("charge", d3.forceManyBody().strength(.1))
		.force("collide", d3.forceCollide().strength(.5).radius(function(d){return d.area**0.5}).iterations(1)) // node끼리 밀어내는 힘

	simulation.nodes(dataset)
			.on("tick", function(d){
				node.attr("cx", function(d){ return d.x; })
					.attr("cy", function(d){ return d.y; })
			});

	function dragstarted(d) {
		if (!d3.event.active) simulation.alphaTarget(.03).restart();
			d.fx = d.x;
			d.fy = d.y;
	}
	function dragged(d) {
		d.fx = d3.event.x;
		d.fy = d3.event.y;
	}
	function dragended(d) {
		if (!d3.event.active) simulation.alphaTarget(.03);
			d.fx = null;
			d.fy = null;
	}
	var tooltip = d3.select('body').append('div')
					.attr('class', 'tooltip')
					.style('display', 'none')
}