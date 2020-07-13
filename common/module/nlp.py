

def get_word_list(queryset):
    """
    띄어쓰기 단위로 분리
    """
    result_word_list = list()
    for q in queryset:
        word_lst = q.get('chat', '').split(' ')
        result_word_list += word_lst
    return result_word_list



if __name__=='__main__':
    test_chat_list = [{'chat': '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세'},
                      {'chat': '무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세'}]
    result = get_word_list(test_chat_list)
    print(result)