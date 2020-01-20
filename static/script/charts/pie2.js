var dataset5 = [{'name':'가레기', 'chat':678}, {'name':'박민재', 'chat':398}, {'name':'저녕구', 'chat':309}, {'name':'타다요시', 'chat':409}, {'name':'박병규', 'chat':322}, {'name':'정승원', 'chat':73}, {'name':'이종하', 'chat':56}, {'name':'박지성', 'chat':17}, {'name':'김정민', 'chat':19}, {'name':'한기석', 'chat':1}]
var dataset6 = [{'name':'가레기', 'chat':453}, {'name':'박민재', 'chat':257}, {'name':'저녕구', 'chat':133}, {'name':'타다요시', 'chat':234}, {'name':'박병규', 'chat':216}, {'name':'정승원', 'chat':79}, {'name':'이종하', 'chat':35}, {'name':'박지성', 'chat':29}, {'name':'김정민', 'chat':32}, {'name':'한기석', 'chat':0}]
var dataset7 = [{'name':'가레기', 'chat':600}, {'name':'박민재', 'chat':382}, {'name':'저녕구', 'chat':250}, {'name':'타다요시', 'chat':123}, {'name':'박병규', 'chat':243}, {'name':'정승원', 'chat':299}, {'name':'이종하', 'chat':182}, {'name':'박지성', 'chat':25}, {'name':'김정민', 'chat':62}, {'name':'한기석', 'chat':0}]
var dataset8 = [{'name':'가레기', 'chat':450}, {'name':'박민재', 'chat':320}, {'name':'저녕구', 'chat':291}, {'name':'타다요시', 'chat':76}, {'name':'박병규', 'chat':128}, {'name':'정승원', 'chat':116}, {'name':'이종하', 'chat':42}, {'name':'박지성', 'chat':29}, {'name':'김정민', 'chat':29}, {'name':'한기석', 'chat':0}]
var dataset9 = [{'name':'가레기', 'chat':920}, {'name':'박민재', 'chat':702}, {'name':'저녕구', 'chat':292}, {'name':'타다요시', 'chat':235}, {'name':'박병규', 'chat':247}, {'name':'정승원', 'chat':173}, {'name':'이종하', 'chat':79}, {'name':'박지성', 'chat':50}, {'name':'김정민', 'chat':7}, {'name':'한기석', 'chat':1}]
var dataset10 = [{'name':'가레기', 'chat':496}, {'name':'박민재', 'chat':375}, {'name':'저녕구', 'chat':186}, {'name':'타다요시', 'chat':204}, {'name':'박병규', 'chat':71}, {'name':'정승원', 'chat':38}, {'name':'이종하', 'chat':16}, {'name':'박지성', 'chat':21}, {'name':'김정민', 'chat':14}, {'name':'한기석', 'chat':0}]





var color = ['#DB992C', '#FDC7C7', '#7390AF', '#AB8144', '#FFFFFF', '#308E42', '#FFD200', '#443513', 
			'#CB4225', '#969696']

var margin = 25
var width	= 500
var height = 300
var radius = 150

var svg = d3.select('#chart7')
			.append('svg')
				.attr('class', 'background')
				.attr('width', width)
				.attr('height', height)
			.append('g')
				.attr('transform', "translate("+width/2+","+height/2+")")

function update(data) {
	
	var pie = d3.pie()
				.value(function(d) {return d.chat})
				.sort(function(a, b) { console.log(a) ; return d3.ascending(a.key, b.key);} )
	var data_arcs = pie(data)


	var arc = d3.arc()
		.innerRadius(radius*0.3)
		.outerRadius(radius*0.8)

	var outerArc = d3.arc()
		.innerRadius(radius*0.9)
		.outerRadius(radius*0.9)


	var u = svg.selectAll('path')
		.data(data_arcs)
		// .on('mouseover', function() { 
		// 	tooltip.style("display", null);
		// 	d3.select(this)
		// 		.style('stroke', 'black')
		// 		.style('stroke-width', 3)
		// 		.style('opacity', 1) 
		// 	})
		// .on('mouseout',	function() { 
		// 	tooltip.style("display", "none");
		// 	d3.select(this)
		// 		.style('stroke', 'none')
		// 		.style('opacity', 0.9) 
		// 	})
		// .on('mousemove', function(d) {
		// 	tooltip.style("left", (d3.event.pageX + 10) + "px")
		// 		.style("top", (d3.event.pageY - 10) + "px")
		// 		.html('이름 : '+d.data.name+'<br>채팅량 : '+d.value)
		// 	});

	u.enter().append('path')
		.merge(u)
		.transition()
		.duration(1000)
		.attr('d', arc)
		.attr('class', 'cell')
		.attr('fill', function(d, i) {return color[i]})
		.style("opacity", 0.9)


	var v = svg.selectAll('polyline')
		.data(data_arcs)

		v.enter().append('polyline')
		.merge(v)
		.transition()
		.duration(1000)
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

	var t = svg.selectAll('text')
		.data(data_arcs)

	t.enter().append('text')
		.merge(t)
		.transition()
		.duration(1000)
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

	var tooltip = d3.select('body').append('div')
				.attr('class', 'tooltip')
				.style('display', 'none')
	u.exit()
	.remove()
	v.exit()
	.remove()
	t.exit()
	.remove()
}

update(dataset10)