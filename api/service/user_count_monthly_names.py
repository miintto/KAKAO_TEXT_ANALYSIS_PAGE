import api.queries as db
import pandas as pd

import logging
logger = logging.getLogger(__name__)


class Service:
    def __init__(self):
        self.uid = None
        self.start_date = None
        self.end_date = None
        self.user_limit = 10
        self.count_list = list()

    def _get_params(self, params):
        self.uid = params.get('uid')
        self.start_date = params.get('start_date')
        self.end_date = params.get('end_date')
        self.user_limit = params.get('user_limit')
        logger.debug(f'[API] UserCountMonthlyNames uid : {self.uid}')
        logger.debug(f'[API] UserCountMonthlyNames start_date : {self.start_date}')
        logger.debug(f'[API] UserCountMonthlyNames end_date : {self.end_date}')
        logger.debug(f'[API] UserCountMonthlyNames user_limit : {self.user_limit}')

    def _make_user_count(self):
        ### DB에서 수치 가져오기
        queryset = db.get_user_count_monthly(uid=self.uid, start_date=self.start_date, end_date=self.end_date)
        df = pd.DataFrame.from_records([item.__dict__ for item in queryset])

        ### M x N 형태로 만들어서 총 채팅건순으로 이용자 정렬
        name_sorted = self._get_username_by_count(df)
        df_pivot = df.pivot_table(index='name', columns='month', values='chat', aggfunc=sum, fill_value=0) \
                     .reindex(name_sorted)

        self.count_list = df_pivot.T.reset_index().to_dict('records')

    def _get_username_by_count(self, df):
        name_sorted = df.groupby('name').sum() \
                        .sort_values(by='chat', ascending=False) \
                        .index[:int(self.user_limit)]
        return name_sorted

    def run(self, params):
        try:
            self._get_params(params)
            self._make_user_count()
            json_res = {'data': self.count_list}
            return json_res
        except Exception as e:
            return {'Error': e}
