var csrf_token = $('[name=csrfmiddlewaretoken]').val();

$.ajax({
    url: '/api/heatmap/monthly',
    type: 'POST',
    dataType: "JSON",
    beforeSend: function () {
        console.log('beforeSend')
    },
    data: {
        'csrfmiddlewaretoken': csrf_token
    },
    success: function (data) {
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
        console.log('beforeSend')
    },
    data: {
        'csrfmiddlewaretoken': csrf_token
    },
    success: function (data) {
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
        console.log('beforeSend')
    },
    data: {
        'csrfmiddlewaretoken': csrf_token
    },
    success: function (data) {
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
        console.log('beforeSend')
    },
    data: {
        'csrfmiddlewaretoken': csrf_token
    },
    success: function (data) {
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
        console.log('beforeSend')
    },
    data: {
        'csrfmiddlewaretoken': csrf_token
    },
    success: function (data) {
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
        console.log('beforeSend')
    },
    data: {
        'csrfmiddlewaretoken': csrf_token
    },
    success: function (data) {
        chart_circular_packing(data['data'], '#chart6');
    },
    fail: function (err) {
        console.log(err);
    }
})


$.ajax({
    url: '/api/bar/user',
    type: 'POST',
    dataType: "JSON",
    beforeSend: function () {
        console.log('beforeSend')
    },
    data: {
        'csrfmiddlewaretoken': csrf_token
    },
    success: function (data) {
        chart_bar(data['data'], '#chart7');
    },
    fail: function (err) {
        console.log(err);
    }
})
