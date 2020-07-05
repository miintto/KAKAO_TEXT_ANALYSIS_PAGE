from api.models import UserCountChatModelForQuery, UserCountChatMonthlyModelForQuery


def get_user_count(uid, start_date, end_date):
    """
    [Sample Query]:
        SELECT name, COUNT(*) AS chat
        FROM kakao_front.user_chat
        WHERE 1=1
            AND uid = '2020-06-20 16:49:54.471956'
            AND date BETWEEN '2019-06-30' AND '2020-06-30'
        GROUP BY name
        ORDER BY chat DESC
    """
    query = \
        """
        SELECT name, COUNT(*) AS chat
        FROM kakao_front.user_chat
        WHERE 1=1
            AND uid = %s
            AND date BETWEEN %s AND %s
        GROUP BY name
        ORDER BY chat DESC
        """
    queryset = UserCountChatModelForQuery.objects.raw(query, [uid, start_date, end_date])
    return queryset


def get_user_count_monthly(uid, start_date, end_date):
    query = \
    """
        SELECT SUBSTR(date, 3, 5) AS month, name, COUNT(*) AS chat
        FROM kakao_front.user_chat
        WHERE 1=1
            AND uid = %s
            AND date BETWEEN %s AND %s
        GROUP BY month, name
    """
    queryset = UserCountChatMonthlyModelForQuery.objects.raw(query, [uid, start_date, end_date])
    return queryset


def get_user_count_word(uid, start_date, end_date, word):
    like_word = '%'+word+'%'
    query = \
    """
        SELECT name, COUNT(*) AS chat
        FROM kakao_front.user_chat
        WHERE 1=1
            AND uid = %s
            AND date BETWEEN %s AND %s
            AND chat LIKE %s
        GROUP BY name
        ORDER BY chat DESC
    """
    queryset = UserCountChatModelForQuery.objects.raw(query, [uid, start_date, end_date, like_word])
    return queryset
