import pandas as pd
import datetime as dt
from static.analysis import sample
import json


def make_json(df):
    result_json = {}
    df['month'] = [i[2:7] for i in df.date]
    df['hour'] = [i[:2] for i in df.time]
    df['wkday'] = [to_weekday(d) for d in df.date]
    result_json.update({'start_date': df.date.values[0]})
    result_json.update({'end_date': df.date.values[-1]})

    g = df.groupby('name').size().sort_values(ascending=False)
    name_sorted = g[:10].keys()
    json_pie = [{'name': k, 'chat': v} for k, v in g[:10].items()]
    result_json.update({'json_pie': json.dumps(json_pie)})

    g = df.pivot_table(index='name', columns='month', aggfunc="size", fill_value=0).reindex(name_sorted)
    json_heatmap = [{'month': month, 'name': k, 'chat': v} for month, gp in g.items() for k, v in gp.items()]
    json_stream = [dict({'month': month}, **{k: v for k, v in gp.items()}) for month, gp in g.items()]
    result_json.update({'json_heatmap': json.dumps(json_heatmap)})
    result_json.update({'json_stream': json.dumps(json_stream)})

    g = df.pivot_table(index='wkday', columns='hour', aggfunc="size", fill_value=0)
    json_wkday = [{'hour': month, 'wkday': k, 'chat': v} for month, gp in g.items() for k, v in gp.items()]
    result_json.update({'json_wkday': json.dumps(json_wkday)})

    result_json.update({'json_wordcloud': [{'word': '개발중... ', 'count': 400}]})
    return result_json


def to_weekday(date):
    return dt.datetime.weekday(dt.datetime.strptime(date, '%Y-%m-%d'))


def make_sample():
    result_json = {}
    json_heatmap = sample.json_heatmap
    json_stream = sample.json_stream
    json_pie = sample.json_pie
    json_wkday = sample.json_wkday
    json_wordcloud = sample.json_wordcloud

    result_json.update({'start_date': '2019-01-01'})
    result_json.update({'end_date': '2019-12-31'})
    result_json.update({'title': 'SAMPLE DATASET'})
    result_json.update({'json_heatmap': json.dumps(json_heatmap)})
    result_json.update({'json_stream': json.dumps(json_stream)})
    result_json.update({'json_pie': json.dumps(json_pie)})
    result_json.update({'json_wkday': json.dumps(json_wkday)})
    result_json.update({'json_wordcloud': json.dumps(json_wordcloud)})
    return result_json
