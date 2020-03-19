var json_str = $('#json_dump_heatmap').text();
json_str = json_str.replace(/\'/g, '"');
var json_heatmap = JSON.parse(json_str);
chart_heatmap(json_heatmap, '#chart1');

var json_str = $('#json_dump_pie').text();
json_str = json_str.replace(/\'/g, '"');
var json_pie = JSON.parse(json_str);
chart_pie(json_pie, '#chart2');

var json_str = $('#json_dump_stream').text();
json_str = json_str.replace(/\'/g, '"');
var json_stream = JSON.parse(json_str);
chart_stream(json_stream, '#chart3');

var json_str = $('#json_dump_wkday').text();
json_str = json_str.replace(/\'/g, '"');
var json_wkday = JSON.parse(json_str);
chart_wkday(json_wkday, '#chart4');

var json_str = $('#json_dump_wordcloud').text();
json_str = json_str.replace(/\'/g, '"');
var json_wordcloud = JSON.parse(json_str);
chart_wordcloud(json_wordcloud, '#chart5');

var json_str = $('#json_dump_packing').text();
json_str = json_str.replace(/\'/g, '"');
var json_circular_packing = JSON.parse(json_str);
chart_circular_packing(json_circular_packing, '#chart6');

var json_str = $('#json_dump_pie').text();
json_str = json_str.replace(/\'/g, '"');
var json_bar = JSON.parse(json_str);
chart_bar(json_bar, '#chart7');
