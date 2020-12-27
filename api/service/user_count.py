import api.queries as db

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
        logger.debug(f'[API] UserCount uid : {self.uid}')
        logger.debug(f'[API] UserCount start_date : {self.start_date}')
        logger.debug(f'[API] UserCount end_date : {self.end_date}')
        logger.debug(f'[API] UserCount user_limit : {self.user_limit}')

    def _make_user_count(self):
        queryset = db.get_user_count(uid=self.uid, start_date=self.start_date, end_date=self.end_date)

        for q in queryset[:int(self.user_limit)]:
            self.count_list.append({'name': q.name, 'chat': q.chat})

    def run(self, params):
        try:
            self._get_params(params)
            self._make_user_count()
            json_res = {'data': self.count_list}
            return json_res
        except Exception as e:
            return {'Error': e}
