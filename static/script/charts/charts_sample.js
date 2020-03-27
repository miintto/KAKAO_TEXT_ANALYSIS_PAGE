$('div#title').html("<h2>SAMPLE</h2>")
$('p#startdate').text("2019-01-01")
$('p#enddate').text("2019-12-31")

chart_heatmap(json_count_by_month, '#chart1');
chart_pie(json_user, '#chart2');
chart_stream(json_user_by_month, '#chart3');
chart_wkday(json_hour_by_wkday, '#chart4');
chart_wordcloud(json_word_count, '#chart5');
chart_circular_packing(json_user_area, '#chart6');
chart_bar(json_user, '#chart7');
