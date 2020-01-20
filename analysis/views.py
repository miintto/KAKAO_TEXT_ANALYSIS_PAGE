from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.views.generic.edit import View
from django.shortcuts import render
from django.urls import reverse
from static.analysis.convertor import Convertor
import datetime as dt
import pandas as pd
import numpy as np

con = Convertor()


def main(request):
	return render(request, 'analysis/main.html')


def check(request):
	print('>>> session : ', request.session.__dict__)
	template = 'analysis/check.html'
	try:
		message = '파일이 존재하지 않습니다...'
		print('>>>')
		file = request.FILES['uploadfile']
		message = '파일을 불러올 수 없습니다...'
		df = con.convert(file)

		is_load = True
		message = '파일을 성공적으로 불러왔습니다.'

		return render(request, template, {'message':message, 'is_load':is_load})

	except:
		is_load = False

		return render(request, template, {'message':message, 'is_load':is_load})


class charts(View):

	def get(self, request):
		
		return render(request, 'analysis/charts.html')


def inquiry(request):
	return render(request, 'analysis/inquiry.html')