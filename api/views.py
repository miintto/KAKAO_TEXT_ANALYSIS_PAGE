from django.http import JsonResponse
from django.views.generic.edit import View
import json
import pandas as pd
import datetime as dt

import logging
logger = logging.getLogger(__name__)


class Title(View):
    def post(self, request):
        title = request.session['file_title']
        json_res = {'title': title}
        return JsonResponse(json_res)


class DateInterval(View):
    def post(self, request):
        file = request.session['filename']
        df = pd.read_csv(file, encoding='utf-8-sig')

        start_date = df['date'].values[0]
        end_date = df['date'].values[-1]
        json_res = {'start_date': start_date, 'end_date': end_date}
        return JsonResponse(json_res)


class HeatmapMonthly(View):
    def post(self, request):
        file = request.session['filename']
        df = pd.read_csv(file, encoding='utf-8-sig')

        g = df.groupby('name').size().sort_values(ascending=False)
        name_sorted = g[:10].keys()

        df['month'] = [i[2:7] for i in df.date]
        g = df.pivot_table(index='name', columns='month', aggfunc="size", fill_value=0).reindex(name_sorted)
        json_heatmap = [{'month': month, 'name': k, 'chat': v} for month, gp in g.items() for k, v in gp.items()]
        json_res = {'data': json_heatmap}
        return JsonResponse(json_res)


class Pie(View):
    def post(self, request):
        file = request.session['filename']
        df = pd.read_csv(file, encoding='utf-8-sig')

        g = df.groupby('name').size().sort_values(ascending=False)
        json_pie = [{'name': k, 'chat': v} for k, v in g[:10].items()]
        json_res = {'data': json_pie}
        return JsonResponse(json_res)


class StreamMonthly(View):
    def post(self, request):
        file = request.session['filename']
        df = pd.read_csv(file, encoding='utf-8-sig')

        g = df.groupby('name').size().sort_values(ascending=False)
        name_sorted = g[:10].keys()

        df['month'] = [i[2:7] for i in df.date]
        g = df.pivot_table(index='name', columns='month', aggfunc="size", fill_value=0).reindex(name_sorted)
        json_stream = [dict({'month': month}, **{k: v for k, v in gp.items()}) for month, gp in g.items()]
        json_res = {'data': json_stream}
        return JsonResponse(json_res)


class HeatmapTime(View):
    def post(self, request):
        file = request.session['filename']
        df = pd.read_csv(file, encoding='utf-8-sig')

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
        file = request.session['filename']
        df = pd.read_csv(file, encoding='utf-8-sig')

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

        g = df.groupby('name').size().sort_values(ascending=False)
        json_user = [{'name': k, 'chat': v} for k, v in g[:10].items()]
        json_res = {'data': json_user}
        return JsonResponse(json_res)


class TextByUser(View):
    def post(self, request):
        file = request.session['filename']
        df = pd.read_csv(file, encoding='utf-8-sig')
        text = self.request.POST.get('text')

        df['word_count'] = df['chat'].map(lambda x: text in x).astype(int)
        g = df.loc[:, ['name', 'word_count']].groupby(by='name').sum().sort_values(by='word_count', ascending=False)
        json_user = [{'name': k, 'chat': v} for k, v in g[:10].itertuples()]
        json_res = {'data': json_user, 'text': text}
        return JsonResponse(json_res)
