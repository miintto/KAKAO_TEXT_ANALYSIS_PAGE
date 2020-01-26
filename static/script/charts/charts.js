function heatmap(dataset) {
	var myColor = d3.scaleSequential(d3.interpolateBlues)
		.domain([0, d3.max(dataset, function(d){ return d.chat**0.5;})])


	var margin = {top: 10, right: 10, bottom: 30, left: 50};

	var width  = 500 - margin.right-margin.left;	// width = 500-30 = 470
	var height = 300 - margin.top-margin.bottom;	// height = 300-20 = 280


	var svg = d3.select('#chart1')
				.append('svg').attr('width', 500).attr('height', 300)
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
		.on('mouseout',  function() { 
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



function pie_chart(dataset) {
	var color = ['#DB992C', '#FDC7C7', '#7390AF', '#AB8144', '#FFFFFF', '#308E42', '#FFD200', '#443513',
				'#CB4225', '#969696']

	var margin = 25
	var width	= 500
	var height = 300
	var radius = height/2

	var svg = d3.select('#chart2')
	            .append('svg').attr('class', 'background').attr('width', width).attr('height', height)
				.append('g').attr('transform', "translate("+width/2+","+height/2+")")

	var pie = d3.pie()
				.value(function(d) {return d.chat})
	var data_arcs = pie(dataset)


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
				.html('이름 : '+d.data.name+'<br>채팅량 : '+d.value)
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
		.text( function(d) { return d.data.chat } )
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



function barchart(dataset) {
	var color = ['#DB992C', '#FDC7C7', '#7390AF', '#AB8144', '#FFFFFF', '#308E42', '#FFD200', '#443513', 
				'#CB4225', '#969696']

	var margin = {top: 10, right: 10, bottom: 30, left: 40};

	var width  = 500 - margin.right-margin.left;	// width = 500-30 = 470
	var height = 300 - margin.top-margin.bottom;	// height = 300-20 = 280

	var svg = d3.select('#chart3')
				.append('svg').attr('class', 'background').attr('width', 500).attr('height', 300)
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
			.attr('fill', function(d, i) {return color[i]})
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
		.on('mouseout',  function() { 
			tooltip.style("display", "none");
			d3.select(this)
				.style('stroke', 'none')
				.style('opacity', 0.9) 
			})
		.on('mousemove', function(d) {
			tooltip.style("left", (d3.event.pageX + 10) + "px")
				.style("top", (d3.event.pageY - 10) + "px")
				.html('이름 : '+d.name+'<br>채팅량 : '+d.chat)
			})

	var tooltip = d3.select('body').append('div')
					.attr('class', 'tooltip')
					.style('display', 'none')
}



function heatmap2(dataset) {
	var myColor = d3.scaleSequential(d3.interpolateBlues)
		.domain([0, d3.max(dataset, function(d){ return d.chat**0.5;})])


	var weekDays = {0:'월', 1:'화', 2:'수', 3:'목', 4:'금', 5:'토', 6:'일'}

	var margin = {top: 10, right: 10, bottom: 30, left: 20};

	var width  = 500 - margin.right-margin.left;	// width = 500-30 = 470
	var height = 300 - margin.top-margin.bottom;	// height = 300-20 = 280


	var svg = d3.select('#chart4')
				.append('svg').attr('width', 500).attr('height', 300)
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
		.on('mouseout',  function() {
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



function wordcloud(dataset) {
	var color = ['#DB992C', '#FDC7C7', '#7390AF', '#AB8144', '#FFFFFF', '#308E42', '#FFD200', '#443513', 
				'#CB4225', '#969696']

	var margin = {top: 10, right: 10, bottom: 10, left: 10}
	var height = 300 - margin.top - margin.bottom
	var width = 500 - margin.right - margin.right

	var svg = d3.select('#chart5')
				.append('svg').attr('width', 600).attr('height', 300)
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
	}
}



function circular_packing(dataset) {
	var color = ['#DB992C', '#FDC7C7', '#7390AF', '#AB8144', '#FFFFFF', '#308E42', '#FFD200', '#443513', 
				'#CB4225', '#969696']

	var margin = 25
	var width	= 500
	var height = 300

	var svg = d3.select('#chart6')
				.append('svg').attr('class', 'background').attr('width', width).attr('height', height)

	var node = svg.append('g')
				.selectAll()
				.data(dataset)
				.enter().append('circle')
					.attr('class', 'cell')
					.attr('r', function(d) {return d.chat**0.5})
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
					.on('mouseout',  function() { 
						tooltip.style("display", "none");
						d3.select(this)
							.style('stroke', 'none')
							.style('opacity', 0.8) 
						})
					.on('mousemove', function(d) {
						tooltip.style("left", (d3.event.pageX + 10) + "px")
							.style("top", (d3.event.pageY - 10) + "px")
							.html('이름 : '+d.name+'<br>채팅량 : '+d.chat)
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
		.force("collide", d3.forceCollide().strength(.5).radius(function(d){return d.chat**0.5}).iterations(1)) // node끼리 밀어내는 힘

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