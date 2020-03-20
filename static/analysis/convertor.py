import pandas as pd
import numpy as np
import datetime as dt



class Convertor:
	'''
	카카오톡 채팅 내용이 담긴 텍스트파일을 raw_text에 입력받아
	dataframe 형태로 변환한 후, dat_chat 에 저장
	(PC버전만 유효)
	'''
	def __init__(self):
		self.date = None
		self.title = None
		self.df_input = None
		self.chat_list = list()

	def _load_file(self, file):
		self.df_input = pd.read_csv(file, sep='\n', header=None, encoding='utf-8', error_bad_lines=False)
		self.title = self.df_input[0].values[0]
		print(f'>>> Convertor._load_file()   - file = {file}')

	def _append_chat(self):
		for line in self.df_input[0].values:
			try:
				split1 = line.find('] [')
				split2 = line.find(':')
				name = line[1:split1]
				time = line[(split1+3):(split2+3)].replace('오전', 'AM').replace('오후', 'PM')
				time = dt.datetime.strftime(dt.datetime.strptime(time, "%p %I:%M"), "%H:%M")
				chat = line[(split2+5):]
				self.chat_list.append([self.date, name, time, chat])
			except:
				if '--------------- ' in line:
					n = line.find('요일')
					self.date = str(dt.datetime.strptime(line[:n-2], '--------------- %Y년 %m월 %d일').date())
					pass
				else:
					self.chat_list.append([self.date, None, None, line])
		print(f'>>> Convertor._append_chat() - len(chat_list) = {len(self.chat_list)}')

	def _join_chat(self):
		array = self.chat_list
		for i in range(1, len(array))[::-1]:
			if not array[i][1]:
				array[i - 1][3] += '\n' + array[i][3]
				del array[i]
		del array[0]
		self.chat_list = array
		print(f'>>> Convertor._join_chat()   - len(chat_list) = {len(self.chat_list)}')

	def convert(self, file):
		self._load_file(file)
		self._append_chat()
		self._join_chat()
		print(f'>>> Convertor finished : {self.title}')
		df_chat = pd.DataFrame(self.chat_list, columns=['date', 'name', 'time', 'chat'])
		return df_chat