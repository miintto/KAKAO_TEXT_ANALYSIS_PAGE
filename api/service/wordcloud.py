from common.models import UserChat
from common.module.nlp import get_word_list
import pandas as pd

import logging
logger = logging.getLogger(__name__)


class Service:
    def __init__(self):
        self.uid = None
        self.start_date = None
        self.end_date = None
        self.word_limit = None
        self.weight = 50000
        self.word_count_list = list()

    def _get_params(self, params):
        self.uid = params.get('uid')
        self.start_date = params.get('start_date')
        self.end_date = params.get('end_date')
        self.word_limit = params.get('word_limit')
        logger.debug(f'[API] WordCloud uid : {self.uid}')
        logger.debug(f'[API] WordCloud start_date : {self.start_date}')
        logger.debug(f'[API] WordCloud end_date : {self.end_date}')
        logger.debug(f'[API] WordCloud word_limit : {self.word_limit}')

    def _make_word_count(self):
        queryset = UserChat.objects.filter(uid=self.uid, date__range=(self.start_date, self.end_date)).values('chat')
        word_list = get_word_list(queryset)
        df_word_list = pd.DataFrame({'word_list': word_list})

        sorted_list = df_word_list.groupby(by = 'word_list').size().sort_values(ascending=False)
        total = sum(sorted_list)
        sorted_list = sorted_list/total*self.weight

        for word, cnt in sorted_list[:int(self.word_limit)].items():
            self.word_count_list.append({'word': word, 'count': cnt})

    def run(self, params):
        try:
            self._get_params(params)
            self._make_word_count()
            # self.word_count_list = [{'word': '개발중... ', 'count': 400}]
            json_res = {'data': self.word_count_list}
            return json_res
        except Exception as e:
            return {'Error': e}
