var dataset_4 = [{'word':'어위', 'count':400},
				{'word':'과정현군', 'count':400},
				{'word':'프랑스는', 'count':400},
				{'word':'차로가자구', 'count':400},
				{'word':'이미', 'count':254},
				{'word':'삭제된', 'count':254},
				{'word':'메시지입니다', 'count':254},
				{'word':'씨발', 'count':208},
				{'word':'야', 'count':168},
				{'word':'ㅇㅇ', 'count':158},
				{'word':'헐', 'count':151},
				{'word':'왜', 'count':108},
				{'word':'ㅇㅋ', 'count':100},
				{'word':'질문받는다', 'count':95},
				{'word':'병신', 'count':92},
				{'word':'시러', 'count':87},
				{'word':'사랑해', 'count':84},
				{'word':'주민규씨발련', 'count':80},
				{'word':'시발', 'count':78},
				{'word':'시바', 'count':75},
				{'word':'ㅅㅂ', 'count':74},
				{'word':'음', 'count':70},
				{'word':'굿모닝', 'count':69},
				{'word':'면접', 'count':67},
				{'word':'아이돌', 'count':67},
				{'word':'사나', 'count':65},
				{'word':'ㄱㅅㄲ', 'count':60},
				{'word':'ㅅㅅ', 'count':56},
				{'word':'어디냐', 'count':54},
				{'word':'뭐지', 'count':52},
				{'word':'와', 'count':50},
				{'word':'강남', 'count':49},
				{'word':'ㅈㄴ', 'count':47},
				{'word':'삭제', 'count':45},
				{'word':'요새', 'count':45},
				{'word':'클럽', 'count':45},
				{'word':'빅데이터', 'count':44},
				{'word':'자소서', 'count':43},
				{'word':'옼돜', 'count':42},
				{'word':'솔직히', 'count':40},
				{'word':'옵치', 'count':36},
				{'word':'ㄲㅈ', 'count':35},
				{'word':'귀찮아', 'count':35},
				{'word':'지금', 'count':34},
				{'word':'출근', 'count':33},
				{'word':'피곤', 'count':33},
				{'word':'따릉이', 'count':32},
				{'word':'헠헠', 'count':32},
				{'word':'승리', 'count':30},
				{'word':'트둥이', 'count':30},
				{'word':'유튜브', 'count':30},
				{'word':'인턴', 'count':30},
				{'word':'ㄷㄷ', 'count':30},
				{'word':'춥다', 'count':30},
				{'word':'아니야', 'count':30},
				{'word':'누가', 'count':30},
				{'word':'글쎄', 'count':30},
				{'word':'인스타', 'count':30},
				{'word':'인턴죽는다', 'count':30},
				{'word':'살려줘', 'count':30}];

var json_data = $('#json_dump_heatmap').text();
json_data = json_data.replace(/\'/g, '"');
var dataset_1 = JSON.parse(json_data);

var json_data = $('#json_dump_pie').text();
json_data = json_data.replace(/\'/g, '"')
var dataset_2 = JSON.parse(json_data);

var json_data = $('#json_dump_wkday').text();
json_data = json_data.replace(/\'/g, '"')
var dataset_3 = JSON.parse(json_data);

var json_data = $('#json_dump_wordcloud').text();
json_data = json_data.replace(/\'/g, '"')
var dataset_4 = JSON.parse(json_data);

heatmap(dataset_1);
pie_chart(dataset_2);
barchart(dataset_2);
heatmap2(dataset_3);
wordcloud(dataset_4);
circular_packing(dataset_2);