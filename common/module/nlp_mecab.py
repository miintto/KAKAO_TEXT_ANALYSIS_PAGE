from konlpy.tag import Mecab

mecab = Mecab()


def get_word_list(queryset):
    """
    Mecab으로 명사 추출
    """
    result_noun_list = list()
    for q in queryset:
        chat = q.get('chat', '')
        noun_lst = mecab.nouns(chat)
        result_noun_list += noun_lst
    return result_noun_list

