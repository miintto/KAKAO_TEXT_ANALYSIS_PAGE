//////////////////////////////////////////////////
//
//  차트 페이지 진입시 ajax를 이용하여 그래프 생성
//
//////////////////////////////////////////////////


function charts_by_date(start_date, end_date){
    ajax_heatmap_monthly(csrf_token, '#chart1', start_date, end_date);
    ajax_pie_total(csrf_token, '#chart2', start_date, end_date);
    ajax_stream_monthly(csrf_token, '#chart3', start_date, end_date);
    ajax_heatmap_time(csrf_token, '#chart4', start_date, end_date);
    ajax_wordcloud(csrf_token, '#chart5', start_date, end_date);
    ajax_circularpacking(csrf_token, '#chart6', start_date, end_date);
    ajax_bar_word(csrf_token, '#chart7', start_date, end_date, "삭제된 메시지입니다.");
    ajax_bar_word(csrf_token, '#chart8', start_date, end_date, "이모티콘");
}

function show_popup(tag_id) {
    $('div#popup-classify').text(tag_id);
    $('div.popup-word-background').show();
    $('div.popup-word-search').show();
}

function close_popup() {
    $('div.popup-word-background').hide();
    $('div.popup-word-search').hide();
}

function show_date_popup() {
    var start_date = $('p#startdate').text();
    var end_date = $('p#enddate').text();
    $("#search-start_date").val(start_date);
    $("#search-end_date").val(end_date);

    $('div.popup-date-background').show();
    $('div.popup-date-range').show();
}

function close_date_popup() {
    $('div.popup-date-background').hide();
    $('div.popup-date-range').hide();
}

function submit_word() {
    var tag_id = $('#popup-classify').text();
    var word = $("#search-word").val();
    var start_date = $('p#startdate').text();
    var end_date = $('p#enddate').text();

    close_popup();

    ajax_bar_word(csrf_token, tag_id, start_date, end_date, word);
}

function submit_date_range() {
    var start_date = $("#search-start_date").val();
    var end_date = $("#search-end_date").val();

    var date_format = /[0-9]{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/;
    if (date_format.test(start_date) & date_format.test(end_date)) {
        close_date_popup();

        $('p#startdate').text(start_date);
        $('p#enddate').text(end_date);
        charts_by_date(start_date, end_date);
    } else {
        alert('올바른 날짜를 입력해주세요.');
    }
}


var csrf_token = $('[name=csrfmiddlewaretoken]').val();

start_date = '';
console.log(start_date);
end_date = '';
console.log(end_date);

ajax_title(csrf_token);
ajax_date_range(csrf_token);
charts_by_date(start_date, end_date);
