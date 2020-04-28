//////////////////////////////////////////////////
//
// AJAX로 데이터를 불러와서 영역별로 차트 입력
//
//////////////////////////////////////////////////


function ajax_title(csrf_token) {
    $.ajax({
        url: '/api/title',
        type: 'POST',
        dataType: "JSON",
        beforeSend: function () {
            $('div.title').html("<h2>-</h2>");
        },
        data: {
            'csrfmiddlewaretoken': csrf_token
        },
        success: function (data) {
            title = data['title'];
            $('div#title').html("<center><h2>"+title+"</h2></center>");
        },
        fail: function (err) {
            console.log(err);
        }
    })
}


function ajax_date_range(csrf_token) {
    $.ajax({
        url: '/api/date/interval',
        type: 'POST',
        dataType: "JSON",
        beforeSend: function () {
            $('p#startdate').text('Loading..');
            $('p#enddate').text('Loading..');
        },
        data: {
            'csrfmiddlewaretoken': csrf_token
        },
        success: function (data) {
            start_date = data['start_date'];
            end_date = data['end_date'];
            $('p#startdate').text(start_date);
            $('p#enddate').text(end_date);
        },
        fail: function (err) {
            console.log(err);
        }
    })
}


function ajax_heatmap_monthly(csrf_token, tag_id, start_date, end_date) {
    var chartbox = 'div'+tag_id;
    var loading = 'div'+tag_id+'-loading';

    $.ajax({
        url: '/api/heatmap/monthly',
        type: 'POST',
        dataType: "JSON",
        beforeSend: function () {
            $(chartbox).children('svg').remove();
            $(loading).show();
        },
        data: {
            'csrfmiddlewaretoken': csrf_token,
            'start_date': start_date,
            'end_date': end_date
        },
        success: function (data) {
            $(loading).hide();
            chart_heatmap(data['data'], tag_id);
        },
        fail: function (err) {
            console.log(err);
        }
    })
}


function ajax_pie_total(csrf_token, tag_id, start_date, end_date) {
    var chartbox = 'div'+tag_id;
    var loading = 'div'+tag_id+'-loading';

    $.ajax({
        url: '/api/pie/total',
        type: 'POST',
        dataType: "JSON",
        beforeSend: function () {
            $(chartbox).children('svg').remove();
            $(loading).show();
        },
        data: {
            'csrfmiddlewaretoken': csrf_token,
            'start_date': start_date,
            'end_date': end_date
        },
        success: function (data) {
            $(loading).hide();
            chart_pie(data['data'], tag_id);
        },
        fail: function (err) {
            console.log(err);
        }
    })
}


function ajax_stream_monthly(csrf_token, tag_id, start_date, end_date) {
    var chartbox = 'div'+tag_id;
    var loading = 'div'+tag_id+'-loading';

    $.ajax({
        url: '/api/stream/monthly',
        type: 'POST',
        dataType: "JSON",
        beforeSend: function () {
            $(chartbox).children('svg').remove();
            $(loading).show();
        },
        data: {
            'csrfmiddlewaretoken': csrf_token,
            'start_date': start_date,
            'end_date': end_date
        },
        success: function (data) {
            $(loading).hide();
            chart_stream(data['data'], tag_id);
        },
        fail: function (err) {
            console.log(err);
        }
    })
}


function ajax_heatmap_time(csrf_token, tag_id, start_date, end_date) {
    var chartbox = 'div'+tag_id;
    var loading = 'div'+tag_id+'-loading';

    $.ajax({
        url: '/api/heatmap/time',
        type: 'POST',
        dataType: "JSON",
        beforeSend: function () {
            $(chartbox).children('svg').remove();
            $(loading).show();
        },
        data: {
            'csrfmiddlewaretoken': csrf_token,
            'start_date': start_date,
            'end_date': end_date
        },
        success: function (data) {
            $(loading).hide();
            chart_wkday(data['data'], tag_id);
        },
        fail: function (err) {
            console.log(err);
        }
    })
}


function ajax_wordcloud(csrf_token, tag_id, start_date, end_date) {
    var chartbox = 'div'+tag_id;
    var loading = 'div'+tag_id+'-loading';

    $.ajax({
        url: '/api/wordcloud',
        type: 'POST',
        dataType: "JSON",
        beforeSend: function () {
            $(chartbox).children('svg').remove();
            $(loading).show();
        },
        data: {
            'csrfmiddlewaretoken': csrf_token,
            'start_date': start_date,
            'end_date': end_date
        },
        success: function (data) {
            $(loading).hide();
            chart_wordcloud(data['data'], tag_id);
        },
        fail: function (err) {
            console.log(err);
        }
    })
}


function ajax_circularpacking(csrf_token, tag_id, start_date, end_date) {
    var chartbox = 'div'+tag_id;
    var loading = 'div'+tag_id+'-loading';

    $.ajax({
        url: '/api/circularpacking',
        type: 'POST',
        dataType: "JSON",
        beforeSend: function () {
            $(chartbox).children('svg').remove();
            $(loading).show();
        },
        data: {
            'csrfmiddlewaretoken': csrf_token,
            'start_date': start_date,
            'end_date': end_date
        },
        success: function (data) {
            $(loading).hide();
            chart_circular_packing(data['data'], tag_id);
        },
        fail: function (err) {
            console.log(err);
        }
    })
}


function ajax_bar_word(csrf_token, tag_id, start_date, end_date, word) {
    var chartbox = 'div'+tag_id;
    var loading = 'div'+tag_id+'-loading';
    var title = 'div'+tag_id+'-title';

    $.ajax({
        url: '/api/bar/word',
        type: 'POST',
        dataType: "JSON",
        beforeSend: function () {
            $(chartbox).children('svg').remove();
            $(loading).show();
        },
        data: {
            'csrfmiddlewaretoken': csrf_token,
            'start_date': start_date,
            'end_date': end_date,
            'word': word
        },
        success: function (data) {
            $(title).html('<h1># 언급 횟수 : "'+data['word']+'"</h1>');
            $(loading).hide();
            chart_bar(data['data'], tag_id);
        },
        fail: function (err) {
            console.log(err);
        }
    })
}


//$.ajax({
//    url: '/api/bar/user',
//    type: 'POST',
//    dataType: "JSON",
//    beforeSend: function () {
//        console.log('ajax beforeSend - Loading chart')
//    },
//    data: {
//        'csrfmiddlewaretoken': csrf_token
//    },
//    success: function (data) {
//        chart_bar(data['data'], '#chart7');
//    },
//    fail: function (err) {
//        console.log(err);
//    }
//})
