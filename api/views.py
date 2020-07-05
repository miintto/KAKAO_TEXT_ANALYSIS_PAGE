from django.http import JsonResponse
from django.views.generic.edit import View
from django.db.models import Min, Max
from common.models import UserChat
from . import queries
import json
import pandas as pd
from datetime import datetime

import logging
logger = logging.getLogger(__name__)


class Title(View):
    def post(self, request):
        """
        카카오톡 채팅의 타이틀명

        JsonResponse:
            title <str> : 제목
        """
        title = request.session['file_title']
        json_res = {'title': title}
        return JsonResponse(json_res)


class DateInterval(View):
    def post(self, request):
        """
        시작날짜와 종료날짜

        JsonResponse:
            start_date <str> : 시작 날짜
            end_date <str> : 종료 날짜
        """
        uid = request.session['user_chat_uid']
        start_date = UserChat.objects.filter(uid=uid).aggregate(date=Min('date'))
        end_date = UserChat.objects.filter(uid=uid).aggregate(date=Max('date'))

        json_res = {'start_date': start_date['date'], 'end_date': end_date['date']}
        return JsonResponse(json_res)


class UserCount(View):
    """
    Params:
        uid        <str>
        start_date <str>
        end_date   <str>
        user_limit <int>

    JsonResponse:
    """
    def post(self, request):
        uid = request.session['user_chat_uid']
        start_date = request.POST.get('start_date')
        end_date = request.POST.get('end_date')
        user_limit = request.POST.get('user_limit')
        logger.debug(f'[API] UserCount uid : {uid}')
        logger.debug(f'[API] UserCount start_date : {start_date}')
        logger.debug(f'[API] UserCount end_date : {end_date}')
        logger.debug(f'[API] UserCount user_limit : {user_limit}')

        queryset = queries.get_user_count(uid=uid, start_date=start_date, end_date=end_date)

        count_list = list()
        for q in queryset[:int(user_limit)]:
            count_list.append({'name': q.name, 'chat': q.chat})
        json_res = {'data': count_list}
        logger.debug(f'[API] UserCount json_res : {json_res}')
        return JsonResponse(json_res)


class UserCountScore(View):
    """
    Params:
        uid        <str>
        start_date <str>
        end_date   <str>
        user_limit <int>

    JsonResponse:
    """
    def post(self, request):
        uid = request.session['user_chat_uid']
        start_date = request.POST.get('start_date')
        end_date = request.POST.get('end_date')
        user_limit = request.POST.get('user_limit')
        logger.debug(f'[API] UserCountScore uid : {uid}')
        logger.debug(f'[API] UserCountScore start_date : {start_date}')
        logger.debug(f'[API] UserCountScore end_date : {end_date}')
        logger.debug(f'[API] UserCountScore user_limit : {user_limit}')

        queryset = queries.get_user_count(uid=uid, start_date=start_date, end_date=end_date)

        df = pd.DataFrame.from_records([item.__dict__ for item in queryset[:int(user_limit)]])
        total_chat = sum(df['chat'].values)
        weight = 20000
        df['score'] = df['chat'].values/total_chat*weight
        count_list = df.loc[:, ['name', 'chat', 'score']].to_dict('records')
        json_res = {'data': count_list}
        logger.debug(f'[API] UserCountScore json_res : {json_res}')
        return JsonResponse(json_res)


class UserCountMonthly(View):
    """
    Params:
        uid        <str>
        start_date <str>
        end_date   <str>
        user_limit <int>

    JsonResponse:
    """
    def post(self, request):
        uid = request.session['user_chat_uid']
        start_date = request.POST.get('start_date')
        end_date = request.POST.get('end_date')
        user_limit = request.POST.get('user_limit')
        logger.debug(f'[API] UserCountMonthly uid : {uid}')
        logger.debug(f'[API] UserCountMonthly start_date : {start_date}')
        logger.debug(f'[API] UserCountMonthly end_date : {end_date}')
        logger.debug(f'[API] UserCountMonthly user_limit : {user_limit}')

        queryset = queries.get_user_count_monthly(uid=uid, start_date=start_date, end_date=end_date)

        df = pd.DataFrame.from_records([item.__dict__ for item in queryset])
        name_sorted = df.groupby('name').sum() \
                        .sort_values(by='chat', ascending=False).index[:int(user_limit)]
        df_pivot = df.pivot_table(index='name', columns='month', values='chat', aggfunc=sum, fill_value=0) \
                     .reindex(name_sorted) \
                     .reset_index()
        df_unpivot = df_pivot.melt(id_vars='name', var_name='month', value_name='chat')
        count_list = df_unpivot.to_dict('records')
        json_res = {'data': count_list}
        logger.debug(f'[API] UserCountMonthly json_res : {json_res}')
        return JsonResponse(json_res)


class UserCountMonthlyNames(View):
    """
    Params:
        uid        <str>
        start_date <str>
        end_date   <str>
        user_limit <int>

    JsonResponse:
    """
    def post(self, request):
        uid = request.session['user_chat_uid']
        start_date = request.POST.get('start_date')
        end_date = request.POST.get('end_date')
        user_limit = request.POST.get('user_limit')
        logger.debug(f'[API] UserCountMonthlyNames uid : {uid}')
        logger.debug(f'[API] UserCountMonthlyNames start_date : {start_date}')
        logger.debug(f'[API] UserCountMonthlyNames end_date : {end_date}')
        logger.debug(f'[API] UserCountMonthlyNames user_limit : {user_limit}')

        queryset = queries.get_user_count_monthly(uid=uid, start_date=start_date, end_date=end_date)

        df = pd.DataFrame.from_records([item.__dict__ for item in queryset])
        name_sorted = df.groupby('name').sum() \
                        .sort_values(by='chat', ascending=False).index[:int(user_limit)]
        df_pivot = df.pivot_table(index='name', columns='month', values='chat', aggfunc=sum, fill_value=0) \
                     .reindex(name_sorted)
        count_list = df_pivot.T.reset_index().to_dict('records')
        json_res = {'data': count_list}
        logger.debug(f'[API] UserCountMonthlyNames json_res : {json_res}')
        return JsonResponse(json_res)


class GroupHourWeekdays(View):
    """
    Params:
        uid        <str>
        start_date <str>
        end_date   <str>

    JsonResponse:
    """
    def post(self, request):
        uid = request.session['user_chat_uid']
        start_date = request.POST.get('start_date')
        end_date = request.POST.get('end_date')
        logger.debug(f'[API] GroupHourWeekdays uid : {uid}')
        logger.debug(f'[API] GroupHourWeekdays start_date : {start_date}')
        logger.debug(f'[API] GroupHourWeekdays end_date : {end_date}')

        queryset = UserChat.objects.filter(uid=uid, date__range=(start_date, end_date))

        df = pd.DataFrame.from_records([item.__dict__ for item in queryset])
        df['hour'] = [i.hour for i in df['time'].values]
        df_pivot = df.pivot_table(index='wkday', columns='hour', aggfunc="size") \
                     .reindex(index=range(7), columns=range(24)) \
                     .fillna(0) \
                     .reset_index()
        df_unpivot = df_pivot.melt(id_vars='wkday', var_name='hour', value_name='chat')
        group_list = df_unpivot.to_dict('records')
        json_res = {'data': group_list}
        logger.debug(f'[API] GroupHourWeekdays json_res : {json_res}')
        return JsonResponse(json_res)


class WordCloud(View):
    def post(self, request):

        json_wordcloud = [{'word': '개발중... ', 'count': 400}]
        json_res = {'data': json_wordcloud}
        return JsonResponse(json_res)


class UserCountWord(View):
    """
    Params:
        uid        <str>
        start_date <str>
        end_date   <str>
        user_limit <int>
        word       <str>

    JsonResponse:
    """
    def post(self, request):
        uid = request.session['user_chat_uid']
        start_date = request.POST.get('start_date')
        end_date = request.POST.get('end_date')
        user_limit = request.POST.get('user_limit')
        word = request.POST.get('word')
        logger.debug(f'[API] UserCountWord uid : {uid}')
        logger.debug(f'[API] UserCountWord start_date : {start_date}')
        logger.debug(f'[API] UserCountWord end_date : {end_date}')
        logger.debug(f'[API] UserCountWord user_limit : {user_limit}')
        logger.debug(f'[API] UserCountWord word : {word}')

        queryset = queries.get_user_count_word(uid=uid, start_date=start_date, end_date=end_date, word=word)

        count_list = list()
        for q in queryset[:int(user_limit)]:
            count_list.append({'name': q.name, 'chat': q.chat})
        json_res = {'data': count_list, 'word': word}
        logger.debug(f'[API] UserCountWord json_res : {json_res}')
        return JsonResponse(json_res)
