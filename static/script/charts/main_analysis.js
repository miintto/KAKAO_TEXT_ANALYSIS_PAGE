var json_data = $('#json_dump_heatmap').text();
json_data = json_data.replace(/\'/g, '"');
var dataset_1 = JSON.parse(json_data);

var json_data = $('#json_dump_pie').text();
json_data = json_data.replace(/\'/g, '"');
var dataset_2 = JSON.parse(json_data);

var json_data = $('#json_dump_wkday').text();
json_data = json_data.replace(/\'/g, '"');
var dataset_3 = JSON.parse(json_data);

var json_data = $('#json_dump_wordcloud').text();
json_data = json_data.replace(/\'/g, '"');
var dataset_4 = JSON.parse(json_data);

var json_data = $('#json_dump_stream').text();
json_data = json_data.replace(/\'/g, '"');
var dataset_5 = JSON.parse(json_data);

heatmap(dataset_1);
pie_chart(dataset_2);
//area_chart(dataset_1);
stream_chart(dataset_5);
barchart(dataset_2);
heatmap2(dataset_3);
wordcloud(dataset_4);
circular_packing(dataset_2);