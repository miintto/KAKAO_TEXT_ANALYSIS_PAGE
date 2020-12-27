from common.models import UserChat
import pandas as pd

import logging
logger = logging.getLogger(__name__)


class Service:
    def __init__(self):
        self.uid = None
        self.start_date = None
        self.end_date = None
        self.group_list = list()

    def _get_params(self, params):
        self.uid = params.get('uid')
        self.start_date = params.get('start_date')
        self.end_date = params.get('end_date')
        logger.debug(f'[API] GroupbyHourWeekdays uid : {self.uid}')
        logger.debug(f'[API] GroupbyHourWeekdays start_date : {self.start_date}')
        logger.debug(f'[API] GroupbyHourWeekdays end_date : {self.end_date}')

    def _make_pivot(self):
        ### DB에서 수치 가져오기
        queryset = UserChat.objects.filter(uid=self.uid, date__range=(self.start_date, self.end_date))
        df = pd.DataFrame.from_records([item.__dict__ for item in queryset])

        ### 시간만 추출
        df['hour'] = [i.hour for i in df['time'].values]

        ### 7 by 24 형태로 만들어서 결측치는 0으로 처리
        df_pivot = df.pivot_table(index='wkday', columns='hour', aggfunc="size") \
                     .reindex(index=range(7), columns=range(24)) \
                     .fillna(0) \
                     .reset_index()
        ### 다시 unpivot
        df_unpivot = df_pivot.melt(id_vars='wkday', var_name='hour', value_name='chat')
        self.group_list = df_unpivot.to_dict('records')

    def run(self, params):
        try:
            self._get_params(params)
            self._make_pivot()
            json_res = {'data': self.group_list}
            return json_res
        except Exception as e:
            return {'Error': e}
