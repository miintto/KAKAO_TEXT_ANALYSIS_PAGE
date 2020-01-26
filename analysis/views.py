from django.http import HttpResponseRedirect
from django.views.generic.edit import View
from django.shortcuts import render
from django.urls import reverse
from static.analysis.convertor import Convertor
from static.analysis.chart_model import make_json
import datetime as dt
import pandas as pd
import numpy as np
import os



class Main(View):
	def get(self, request):
		template = 'analysis/main.html'
		return render(request, template)


class Check(View):
	def get(self, request):
		return HttpResponseRedirect(reverse('main'))

	def post(self, request):
		template = 'analysis/check.html'
		message = None
		try:
			message = '파일이 존재하지 않습니다...'
			file = request.FILES['uploadfile']

			message = '파일을 읽을 수 없습니다...'
			con = Convertor()
			df = con.convert(file)
			filename = f'./uploads/csv/{file}.csv'
			df.to_csv(filename, index=False, encoding='utf8')

			is_load = True
			message = '파일을 성공적으로 불러왔습니다.'
			request.session['filename'] = filename
			request.session['is_file'] = True

			return render(request, template, {'message':message, 'is_load':is_load})
		except:
			is_load = False
			return render(request, template, {'message':message, 'is_load':is_load})


class Charts(View):
	def get(self, request):
		return HttpResponseRedirect(reverse('main'))

	def post(self, request):
		template = 'analysis/charts.html'
		if 'is_file' in request.session:

			file = request.session['filename']
			df = pd.read_csv(file, encoding='utf-8-sig')
			result_json = make_json(df)

			return render(request, template, result_json)
		else:
			return HttpResponseRedirect(reverse('main'))


class Inquiry(View):
	def get(self, request):
		template = 'analysis/inquiry.html'
		return render(request, template)
