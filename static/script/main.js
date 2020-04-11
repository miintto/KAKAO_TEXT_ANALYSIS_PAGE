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
