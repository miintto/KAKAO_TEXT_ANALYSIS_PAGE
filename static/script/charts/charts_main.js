//////////////////////////////////////////////////
//
//  차트 페이지 진입시 ajax를 이용하여 그래프 생성
//
//////////////////////////////////////////////////


var csrf_token = $('[name=csrfmiddlewaretoken]').val();

$.ajax({
    url: '/api/title',
    type: 'POST',
    dataType: "JSON",
    beforeSend: function () {
        $('div.title').html("<h2>-</h2>")
    },
    data: {
        'csrfmiddlewaretoken': csrf_token
    },
    success: function (data) {
        console.log(data)
        title = data['title']
        $('div#title').html("<center><h2>"+title+"</h2></center>")
    },
    fail: function (err) {
        console.log(err);
    }
})


$.ajax({
    url: '/api/date/interval',
    type: 'POST',
    dataType: "JSON",
    beforeSend: function () {
        $('p#startdate').text('Loading..')
        $('p#enddate').text('Loading..')
    },
    data: {
        'csrfmiddlewaretoken': csrf_token
    },
    success: function (data) {
        start_date = data['start_date']
        end_date = data['end_date']
        $('p#startdate').text(start_date)
        $('p#enddate').text(end_date)
    },
    fail: function (err) {
        console.log(err);
    }
})


$.ajax({
    url: '/api/heatmap/monthly',
    type: 'POST',
    dataType: "JSON",
    beforeSend: function () {
//        console.log('ajax beforeSend - Loading chart')
        img = '<center><img src="/static/img/chart_loading.svg" height="100%"></center>'
        $('div#chart1-loading').html(img)
    },
    data: {
        'csrfmiddlewaretoken': csrf_token
    },
    success: function (data) {
        $('div#chart1-loading').hide()
        chart_heatmap(data['data'], '#chart1');
    },
    fail: function (err) {
        console.log(err);
    }
})


$.ajax({
    url: '/api/pie/total',
    type: 'POST',
    dataType: "JSON",
    beforeSend: function () {
        console.log('ajax beforeSend - Loading chart')
        img = '<center><img src="/static/img/chart_loading.svg" height="100%"></center>'
        $('div#chart2-loading').html(img)
    },
    data: {
        'csrfmiddlewaretoken': csrf_token
    },
    success: function (data) {
        $('div#chart2-loading').hide()
        chart_pie(data['data'], '#chart2');
    },
    fail: function (err) {
        console.log(err);
    }
})


$.ajax({
    url: '/api/stream/monthly',
    type: 'POST',
    dataType: "JSON",
    beforeSend: function () {
        console.log('ajax beforeSend - Loading chart')
        img = '<center><img src="/static/img/chart_loading.svg" height="100%"></center>'
        $('div#chart3-loading').html(img)
    },
    data: {
        'csrfmiddlewaretoken': csrf_token
    },
    success: function (data) {
        $('div#chart3-loading').hide()
        chart_stream(data['data'], '#chart3');
    },
    fail: function (err) {
        console.log(err);
    }
})


$.ajax({
    url: '/api/heatmap/time',
    type: 'POST',
    dataType: "JSON",
    beforeSend: function () {
        console.log('ajax beforeSend - Loading chart')
        img = '<center><img src="/static/img/chart_loading.svg" height="100%"></center>'
        $('div#chart4-loading').html(img)
    },
    data: {
        'csrfmiddlewaretoken': csrf_token
    },
    success: function (data) {
        $('div#chart4-loading').hide()
        chart_wkday(data['data'], '#chart4');
    },
    fail: function (err) {
        console.log(err);
    }
})


$.ajax({
    url: '/api/wordcloud',
    type: 'POST',
    dataType: "JSON",
    beforeSend: function () {
        console.log('ajax beforeSend - Loading chart')
        img = '<center><img src="/static/img/chart_loading.svg" height="100%"></center>'
        $('div#chart5-loading').html(img)
    },
    data: {
        'csrfmiddlewaretoken': csrf_token
    },
    success: function (data) {
        $('div#chart5-loading').hide()
        chart_wordcloud(data['data'], '#chart5');
    },
    fail: function (err) {
        console.log(err);
    }
})


$.ajax({
    url: '/api/circularpacking',
    type: 'POST',
    dataType: "JSON",
    beforeSend: function () {
        console.log('ajax beforeSend - Loading chart')
        img = '<center><img src="/static/img/chart_loading.svg" height="100%"></center>'
        $('div#chart6-loading').html(img)
    },
    data: {
        'csrfmiddlewaretoken': csrf_token
    },
    success: function (data) {
        $('div#chart6-loading').hide()
        chart_circular_packing(data['data'], '#chart6');
    },
    fail: function (err) {
        console.log(err);
    }
})


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


$.ajax({
    url: '/api/bar/text',
    type: 'POST',
    dataType: "JSON",
    beforeSend: function () {
        console.log('ajax beforeSend - Loading chart')
        img = '<center><img src="/static/img/chart_loading.svg" height="100%"></center>'
        $('div#chart7-loading').html(img)
    },
    data: {
        'csrfmiddlewaretoken': csrf_token,
        'text': "삭제된 메시지입니다."
    },
    success: function (data) {
        title = '<div class="chartbox-title"><h2># 텍스트 "'+data['text']+'" 언급 횟수</h2></div>'
        $('div#chart7').html(title)
        $('div#chart7-loading').hide()
        chart_bar(data['data'], '#chart7');
    },
    fail: function (err) {
        console.log(err);
    }
})


$.ajax({
    url: '/api/bar/text',
    type: 'POST',
    dataType: "JSON",
    beforeSend: function () {
        console.log('ajax beforeSend - Loading chart')
        img = '<center><img src="/static/img/chart_loading.svg" height="100%"></center>'
        $('div#chart8-loading').html(img)
    },
    data: {
        'csrfmiddlewaretoken': csrf_token,
        'text': "이모티콘"
    },
    success: function (data) {
        title = '<div class="chartbox-title"><h2># 텍스트 "'+data['text']+'" 언급 횟수</h2></div>'
        $('div#chart8').html(title)
        $('div#chart8-loading').hide()
        chart_bar(data['data'], '#chart8');
    },
    fail: function (err) {
        console.log(err);
    }
})

