from django.http import JsonResponse
from django.views.generic.edit import View
from django.db.models import Min, Max
from common.models import UserChat
from . import queries
import json
import pandas as pd
from datetime import datetime
from .service import (user_count, user_count_score, user_count_monthly, user_count_monthly_names,
                      groupby_hour_weekdays, user_count_word)

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
        logger.debug(f'[API] Title json_res : {json_res}')
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
        logger.debug(f'[API] DateInterval json_res : {json_res}')
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
        parmas = {
            'uid': uid,
            'start_date': start_date,
            'end_date': end_date,
            'user_limit': user_limit
        }

        service = user_count.Service()
        json_res = service.run(parmas)
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
        parmas = {
            'uid': uid,
            'start_date': start_date,
            'end_date': end_date,
            'user_limit': user_limit
        }

        service = user_count_score.Service()
        json_res = service.run(parmas)
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
        parmas = {
            'uid': uid,
            'start_date': start_date,
            'end_date': end_date,
            'user_limit': user_limit
        }

        service = user_count_monthly.Service()
        json_res = service.run(parmas)
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
        parmas = {
            'uid': uid,
            'start_date': start_date,
            'end_date': end_date,
            'user_limit': user_limit
        }

        service = user_count_monthly_names.Service()
        json_res = service.run(parmas)
        logger.debug(f'[API] UserCountMonthlyNames json_res : {json_res}')
        return JsonResponse(json_res)


class GroupbyHourWeekdays(View):
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
        parmas = {
            'uid': uid,
            'start_date': start_date,
            'end_date': end_date
        }

        service = groupby_hour_weekdays.Service()
        json_res = service.run(parmas)
        logger.debug(f'[API] GroupbyHourWeekdays json_res : {json_res}')
        return JsonResponse(json_res)


class WordCloud(View):
    def post(self, request):

        json_wordcloud = [{'word': '개발중... ', 'count': 400}]
        json_res = {'data': json_wordcloud}
        logger.debug(f'[API] WordCloud json_res : {json_res}')
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
        parmas = {
            'uid': uid,
            'start_date': start_date,
            'end_date': end_date,
            'user_limit': user_limit,
            'word': word
        }

        service = user_count_word.Service()
        json_res = service.run(parmas)
        logger.debug(f'[API] UserCountWord json_res : {json_res}')
        return JsonResponse(json_res)
