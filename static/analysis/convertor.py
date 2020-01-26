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
		self.df = None

	def convert(self, file):
		self.df = pd.read_csv(file, sep='\n', header=None, encoding='utf-8')
		df_concat = []
		self.title = self.df[0].values[0]
		for line in self.df[0].values:
			name, time, chat = self.split_chatting(line)
			df_concat.append([self.date, time, name, chat])
		print(f'>>> finished convert {self.title}')
		df_chat = pd.DataFrame(np.array(df_concat), columns=['date', 'time', 'name', 'chat'])
		return df_chat.dropna().reset_index(drop=True)

	def split_chatting(self, line):
		try:
			split1 = line.find('] [')
			split2 = line.find(':')
			name = line[1:split1]
			time = line[(split1+3):(split2+3)].replace('오전', 'AM').replace('오후', 'PM')
			time = dt.datetime.strftime(dt.datetime.strptime(time, "%p %I:%M"), "%H:%M")
			chat = line[(split2+5):]
			return name, time, chat
		except:
			if '--------------- ' in line:
				n = line.find('요일')
				self.date = str(dt.datetime.strptime(line[:n-2], '--------------- %Y년 %m월 %d일').date())
				return None, None, None
			else:
				return None, None, line


