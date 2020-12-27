/// 텍스트 파일 업로드시 로딩
function LoadFile() {
    var button = document.getElementById("next-check");
    button.click();
    loading = '<img src="/static/img/loading.svg" width="100%" height="100%">';
    $('div.loading').html(loading);
}


/// 메인 화면 가이드 버튼 클릭시 하단으로 이동
function show_guide() {
    var title = $("#guide-title").offset().top;
    $('html, body').animate({scrollTop: title}, 150);
}


/// 샘플 버튼 클릭 이벤트
function load_sample_charts() {
    location.href="/analysis/charts/sample";
}


/// 파일 업로드 실패시 메인 화면 이동 버튼
function load_main() {
    location.href="/analysis/main";
}


/// 메인화면 가이드 모바일 버전 설명 화면 슬라이드 넘어가도록
$(document).ready(function() {
    var img_position = 1;

    $('#slide_prev-mobile').click(function(){
        slide_prev();
    })
    $('#slide_next-mobile').click(function(){
        slide_next();
    })

    function slide_prev() {
        if (1<img_position) {
            var img = $('#slide-mobile');
            img.animate({left:'+=360px'}, 150);
            img_position--
            guide_info(img_position);
        }
    }

    function slide_next() {
        if (img_position<3) {
            var img = $('#slide-mobile');
            img.animate({left:'-=360px'}, 150);
            img_position++
            guide_info(img_position);
        }
    }

    function guide_info(img_position) {
        var info_box =  $('#guide-text-mobile')
        if (img_position==1) {
            text = '<center><p>1. 채팅창 메뉴에서 설정 버튼 클릭</p></center>'
            info_box.html(text);
        } else if (img_position==2) {
            text = '<center><p>2. 대화 내보내기 클릭</p></center>'
            info_box.html(text);
        } else if (img_position==3) {
            text = '<center><p>3. 둘 중 선택하여 카카오톡 대화 파일 저장</p></center>'
            info_box.html(text);
        }
    }
})


/// 메인화면 가이드 PC버전 설명 화면 슬라이드 넘어가도록
$(document).ready(function() {
    var img_position = 1;

    $('#slide_prev-pc').click(function(){
        slide_prev();
    })
    $('#slide_next-pc').click(function(){
        slide_next();
    })


    function slide_prev() {
        if (1<img_position) {
            var img = $('#slide-pc');
            img.animate({left:'+=360px'}, 150);
            img_position--
            guide_info(img_position);
        }
    }

    function slide_next() {
        if (img_position<3) {
            var img = $('#slide-pc');
            img.animate({left:'-=360px'}, 150);
            img_position++
            guide_info(img_position);
        }
    }

    function guide_info(img_position) {
        var info_box =  $('#guide-text-pc')
        if (img_position==1) {
            text = '<center><p>1. 채팅창 상단의 메뉴 버튼 클릭</p></center>'
            info_box.html(text);
        } else if (img_position==2) {
            text = '<center><p>2. 대화 내용 >> 대화 내보내기 클릭</p></center>'
            info_box.html(text);
        } else if (img_position==3) {
            text = '<center><p>3. 원하는 경로에 카카오톡 대화 파일 저장</p></center>'
            info_box.html(text);
        }
    }
})
