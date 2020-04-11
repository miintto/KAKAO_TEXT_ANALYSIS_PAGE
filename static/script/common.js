function load_main() {
    location.href="/analysis/main";
}

function load_charts() {
    location.href="/analysis/charts";
}

function load_sample_charts() {
    location.href="/analysis/charts/sample";
}

function LoadFile() {
    var button = document.getElementById("next-check");
    button.click();
//    $('input#upload').attr('disabled', true);
//    $('label#upload-space').text("Loding...");
    loading = '<img src="/static/img/loading.svg" width="100%" height="100%">';
    $('div.loading').html(loading);

}

function show_guide() {
//    document.getElementById("guide-title")
    var title = $("#guide-title").offset().top;
    $('html, body').animate({scrollTop: title}, 150);
}
