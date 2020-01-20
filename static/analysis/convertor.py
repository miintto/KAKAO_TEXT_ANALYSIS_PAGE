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
		self.title = None

	def convert(self, file):
		self.df = pd.read_csv(file, sep='\n', header=None)
		print('>>> load')
		df_concat = []
		for line in self.df[0].values:
			name, time, chat = self.split_chatting(line)
			df_concat.append([name, time, chat])
		df_chat = pd.DataFrame(np.array(df_concat), columns=['Name', 'Time', 'Chat'])
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
			return None, None, line


