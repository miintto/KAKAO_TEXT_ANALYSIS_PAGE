from django.http import JsonResponse
from django.views.generic.edit import View
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
        file = request.session['filename']
        df = pd.read_csv(file, encoding='utf-8-sig')

        start_date = df['date'].values[0]
        end_date = df['date'].values[-1]
        json_res = {'start_date': start_date, 'end_date': end_date}
        return JsonResponse(json_res)


class HeatmapMonthly(View):
    def post(self, request):
        """
        Params:
            start_date <str> : 시작 날짜
            end_date <str> : 종료 날짜

        JsonResponse:
            data <list> : 각 월의 이용자별 말풍선 수 count

        Examples:
            data : [
                {"month": "19-01", "name": "name1", "chat": 90},
                {"month": "19-01", "name": "name2", "chat": 45},
                {"month": "19-01", "name": "name3", "chat": 15}
            ]
        """
        file = request.session['filename']
        df = pd.read_csv(file, encoding='utf-8-sig')
        start_date = self.request.POST.get('start_date')
        end_date = self.request.POST.get('end_date')
        logger.debug(f'[API] start_date : {start_date}')
        logger.debug(f'[API] end_date : {end_date}')
        try:
            datetime.strptime(start_date, '%Y-%m-%d')
            datetime.strptime(end_date, '%Y-%m-%d')
            df = df[(start_date <= df['date']) & (df['date'] <= end_date)].reset_index()
        except Exception as e:
            print(e)

        g = df.groupby('name').size().sort_values(ascending=False)
        name_sorted = g[:10].keys()

        df['month'] = [i[2:7] for i in df.date]
        g = df.pivot_table(index='name', columns='month', aggfunc="size", fill_value=0).reindex(name_sorted)
        json_heatmap = [{'month': month, 'name': k, 'chat': v} for month, gp in g.items() for k, v in gp.items()]
        json_res = {'data': json_heatmap}
        return JsonResponse(json_res)


class Pie(View):
    def post(self, request):
        """
        Params:
            start_date <str> : 시작 날짜
            end_date <str> : 종료 날짜

        JsonResponse:
            data <list> : 이용자별 말풍선 수 count

        Examples:
            data : [
                {"name": "name1", "chat": 90},
                {"name": "name2", "chat": 45},
                {"name": "name3", "chat": 15}
            ]
        """
        file = request.session['filename']
        df = pd.read_csv(file, encoding='utf-8-sig')
        start_date = self.request.POST.get('start_date')
        end_date = self.request.POST.get('end_date')
        logger.debug(f'[API] start_date : {start_date}')
        logger.debug(f'[API] end_date : {end_date}')
        try:
            datetime.strptime(start_date, '%Y-%m-%d')
            datetime.strptime(end_date, '%Y-%m-%d')
            df = df[(start_date <= df['date']) & (df['date'] <= end_date)].reset_index()
        except Exception as e:
            print(e)

        g = df.groupby('name').size().sort_values(ascending=False)
        json_pie = [{'name': k, 'chat': v} for k, v in g[:10].items()]
        json_res = {'data': json_pie}
        return JsonResponse(json_res)


class StreamMonthly(View):
    def post(self, request):
        """
        Params:
            start_date <str> : 시작 날짜
            end_date <str> : 종료 날짜

        JsonResponse:
            data <list> : 월별 이용자들의 말풍선 수 count

        Examples:
            data : [
                {"month": "19-01", "name1": 18, "name2": 12, "name3": 8},
                {"month": "19-01", "name1": 13, "name2": 11, "name3": 7},
                {"month": "19-01", "name1": 10, "name2": 9, "name3": 5}
            ]
        """
        file = request.session['filename']
        df = pd.read_csv(file, encoding='utf-8-sig')
        start_date = self.request.POST.get('start_date')
        end_date = self.request.POST.get('end_date')
        logger.debug(f'[API] start_date : {start_date}')
        logger.debug(f'[API] end_date : {end_date}')
        try:
            datetime.strptime(start_date, '%Y-%m-%d')
            datetime.strptime(end_date, '%Y-%m-%d')
            df = df[(start_date <= df['date']) & (df['date'] <= end_date)].reset_index()
        except Exception as e:
            print(e)

        g = df.groupby('name').size().sort_values(ascending=False)
        name_sorted = g[:10].keys()

        df['month'] = [i[2:7] for i in df.date]
        g = df.pivot_table(index='name', columns='month', aggfunc="size", fill_value=0).reindex(name_sorted)
        json_stream = [dict({'month': month}, **{k: v for k, v in gp.items()}) for month, gp in g.items()]
        json_res = {'data': json_stream}
        return JsonResponse(json_res)


class HeatmapTime(View):
    def post(self, request):
        """
        Params:
            start_date <str> : 시작 날짜
            end_date <str> : 종료 날짜

        JsonResponse:
            data <list> : 각 시간대 x 요일별 총 말풍선 수 count

        Examples:
            data : [
                {"hour": "00", "wkday": 0, "chat": 3},
                {"hour": "00", "wkday": 1, "chat": 13},
                {"hour": "00", "wkday": 2, "chat": 11}
        ]
        """
        file = request.session['filename']
        df = pd.read_csv(file, encoding='utf-8-sig')
        start_date = self.request.POST.get('start_date')
        end_date = self.request.POST.get('end_date')
        logger.debug(f'[API] start_date : {start_date}')
        logger.debug(f'[API] end_date : {end_date}')
        try:
            datetime.strptime(start_date, '%Y-%m-%d')
            datetime.strptime(end_date, '%Y-%m-%d')
            df = df[(start_date <= df['date']) & (df['date'] <= end_date)].reset_index()
        except Exception as e:
            print(e)

        df['hour'] = [i[:2] for i in df.time]

        g = df.pivot_table(index='wkday', columns='hour', aggfunc="size", fill_value=0)
        g = g.reindex(index=range(7), columns=[str(i).zfill(2) for i in range(24)]).fillna(0)
        json_wkday = [{'hour': month, 'wkday': k, 'chat': v} for month, gp in g.items() for k, v in gp.items()]
        json_res = {'data': json_wkday}
        return JsonResponse(json_res)


class WordCloud(View):
    def post(self, request):

        json_wordcloud = [{'word': '개발중... ', 'count': 400}]
        json_res = {'data': json_wordcloud}
        return JsonResponse(json_res)


class CircularPacking(View):
    def post(self, request):
        """
        Params:
            start_date <str> : 시작 날짜
            end_date <str> : 종료 날짜

        JsonResponse:
            data <list> : 이용자별 말풍선 수 및 상대면적 크기

        Examples:
            data : [
                {"name": "name1", "chat": 90, "area": 6000},
                {"name": "name2", "chat": 45, "area": 3000},
                {"name": "name3", "chat": 15, "area": 1000}
        ]
        """
        file = request.session['filename']
        df = pd.read_csv(file, encoding='utf-8-sig')
        start_date = self.request.POST.get('start_date')
        end_date = self.request.POST.get('end_date')
        logger.debug(f'[API] start_date : {start_date}')
        logger.debug(f'[API] end_date : {end_date}')
        try:
            datetime.strptime(start_date, '%Y-%m-%d')
            datetime.strptime(end_date, '%Y-%m-%d')
            df = df[(start_date <= df['date']) & (df['date'] <= end_date)].reset_index()
        except Exception as e:
            print(e)

        g = df.groupby('name').size().sort_values(ascending=False)
        total_chat = sum(g)
        json_pie = [{'name': k, 'chat': v} for k, v in g[:10].items()]
        json_packing = [{'name': user.get('name'), 'chat': user.get('chat'), 'area': user.get('chat')/total_chat*15000} for user in json_pie]
        json_res = {'data': json_packing}
        return JsonResponse(json_res)


class BarByUser(View):
    def post(self, request):
        file = request.session['filename']
        df = pd.read_csv(file, encoding='utf-8-sig')
        start_date = self.request.POST.get('start_date')
        end_date = self.request.POST.get('end_date')
        logger.debug(f'[API] start_date : {start_date}')
        logger.debug(f'[API] end_date : {end_date}')
        try:
            datetime.strptime(start_date, '%Y-%m-%d')
            datetime.strptime(end_date, '%Y-%m-%d')
            df = df[(start_date <= df['date']) & (df['date'] <= end_date)].reset_index()
        except Exception as e:
            print(e)

        g = df.groupby('name').size().sort_values(ascending=False)
        json_user = [{'name': k, 'chat': v} for k, v in g[:10].items()]
        json_res = {'data': json_user}
        return JsonResponse(json_res)


class WordByUser(View):
    def post(self, request):
        """
        Params:
            word <str> : 집계할 단어
            start_date <str> : 시작 날짜
            end_date <str> : 종료 날짜

        JsonResponse:
            data <list> : 이용자별 말풍선 수 count

        Examples:
            data : [
                {"name": "name1", "chat": 90},
                {"name": "name2", "chat": 45},
                {"name": "name3", "chat": 15}
            ]
        """
        file = request.session['filename']
        df = pd.read_csv(file, encoding='utf-8-sig')
        word = self.request.POST.get('word')
        start_date = self.request.POST.get('start_date')
        end_date = self.request.POST.get('end_date')
        logger.debug(f'[API] start_date : {start_date}')
        logger.debug(f'[API] end_date : {end_date}')
        logger.debug(f'[API] word : {word}')
        try:
            datetime.strptime(start_date, '%Y-%m-%d')
            datetime.strptime(end_date, '%Y-%m-%d')
            df = df[(start_date <= df['date']) & (df['date'] <= end_date)].reset_index()
        except Exception as e:
            print(e)

        df['word_count'] = df['chat'].map(lambda x: word in x).astype(int)
        g = df.loc[:, ['name', 'word_count']].groupby(by='name').sum().sort_values(by='word_count', ascending=False)
        json_user = [{'name': k, 'chat': v} for k, v in g[:10].itertuples()]
        json_res = {'data': json_user, 'word': word}
        return JsonResponse(json_res)
