import pandas as pd
import numpy as np
import datetime as dt

import logging
logger = logging.getLogger(__name__)


class Convertor:
	'''
	카카오톡 채팅 내용이 담긴 텍스트파일을 입력받아 pandas DataFrame 형태로 변환
	(PC버전만 유효)
	'''
	def __init__(self):
		self.title = None
		self.df_input = None
		self.type = None
		self.chat_list = list()


	def _load_file(self, file):
		"""
		유저가 업로드한 텍스트파일을 Pandas Dataframe 형식으로 가져옴
		"""
		self.df_input = pd.read_csv(file, sep='\n', header=None, encoding='utf-8', error_bad_lines=False)
		logger.debug(f'[Convertor] _load_file() : df_input.__len__ = {len(self.df_input)}')
		self.title = self.df_input.values[0, 0]
		logger.debug(f'[Convertor] _load_file() : title = {self.title}')


	def _check_type(self):
		"""
		파일형식이 모바일인지 PC버전인지 판별
		"""
		if '저장한 날짜 :' in self.df_input.values[1, 0]:
			if '---------------' in self.df_input.values[2, 0]:
				self.type = 'PC'
			else:
				self.type = 'Mobile'
		else:
			pass
		logger.debug(f'[Convertor] _check_type() : type = {self.type}')


	def _append_by_pc(self):
		"""
		PC버전 카카오톡 대화 메시지를 field별로 파싱
		"""
		self.date = None
		for line in self.df_input[0].values:
			try:
				split1 = line.find('] [')
				split2 = line.find(':')
				name = line[1:split1]
				time = line[(split1+3):(split2+3)].replace('오전', 'AM').replace('오후', 'PM')
				time = dt.datetime.strftime(dt.datetime.strptime(time, "%p %I:%M"), "%H:%M")
				chat = line[(split2+5):]
				self.chat_list.append([self.date, time, name, chat])
			except:
				if '--------------- ' in line:
					n = line.find('요일')
					self.date = str(dt.datetime.strptime(line[:n-2], '--------------- %Y년 %m월 %d일').date())
					pass
				else:
					self.chat_list.append([self.date, None, None, line])
		logger.debug(f'[Convertor] _append_by_pc() : chat_list.__len__ = {len(self.chat_list)}')


	def _append_by_mobile(self):
		"""
		모바일버전 카카오톡 대화 메시지를 field별로 파싱
		:return:
		"""
		for line in self.df_input[0].values:
			try:
				split1 = line.find(',')
				split2 = line.find(' : ')
				date_time = line[:split1].replace('오전', 'AM').replace('오후', 'PM')
				date_time = dt.datetime.strptime(date_time, "%Y년 %m월 %d일 %p %I:%M")
				date = date_time.strftime("%Y-%m-%d")
				time = date_time.strftime("%H:%M")
				name = line[(split1+2):split2]
				chat = line[(split2+3):]
				if split1!=-1:
					self.chat_list.append([date, time, name, chat])
			except:
				self.chat_list.append([None, None, None, line])
		logger.debug(f'[Convertor] _append_by_mobile() : chat_list.__len__ = {len(self.chat_list)}')

	def _append_chat(self):
		"""
		대화파일 파싱
		"""
		if self.type=='PC':
			self._append_by_pc()
		elif self.type == 'Mobile':
			self._append_by_mobile()
		else:
			raise Exception

	def _join_chat(self):
		"""
		엔터로 분리된 대화 메시지 연결
		"""
		array = self.chat_list
		for i in range(1, len(array))[::-1]:
			if not array[i][1]:
				array[i-1][3] += '\n' + array[i][3]
				del array[i]
		del array[0]
		self.chat_list = array
		logger.debug(f'[Convertor] _join_chat() : chat_list.__len__ = {len(self.chat_list)}')

	def _make_dateframe(self):
		"""
		파싱된 리스트를 Dateframe 형태로 변환
		날짜마다 요일 매칭
		"""
		df_chat = pd.DataFrame(self.chat_list, columns=['date', 'time', 'name', 'chat'])
		is_name = df_chat['name'].map(lambda x: ('님을 초대했습니다' not in x) & ('님이 나갔습니다' not in x) &
												('최신버전으로 업데이트해주세요' not in x) & ('삭제된 메시지입니다' not in x))
		df_chat = df_chat[is_name]
		df_chat['wkday'] = df_chat['date'].map(lambda x: dt.datetime.weekday(dt.datetime.strptime(x, '%Y-%m-%d')))
		logger.debug(f'[Convertor] _make_dateframe() : df_chat.shape = {df_chat.shape}')
		return df_chat


	def run(self, file):
		logger.debug(f'[Convertor]  START')
		self._load_file(file)
		self._check_type()
		self._append_chat()
		self._join_chat()
		df_chat = self._make_dateframe()
		logger.debug(f'[Convertor]  END')
		return df_chat
