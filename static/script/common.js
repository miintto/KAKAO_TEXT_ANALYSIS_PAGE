function load_main() {
    location.href="/analysis/main";
}

function load_charts() {
    location.href="/analysis/charts";
}

function LoadFile() {
    var button = document.getElementById("next-check");
    button.click();

    $('input#upload').attr('disabled', true);
    $('label#upload-space').text("Loding...");
}