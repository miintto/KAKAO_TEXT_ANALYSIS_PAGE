from django.http import HttpResponseRedirect
from django.views.generic.edit import View
from django.shortcuts import render
from django.urls import reverse
from static.module.convertor import Convertor
from static.module.utils import get_ip
import datetime as dt
import pandas as pd
import numpy as np
import os

import logging
logger = logging.getLogger(__name__)


class Main(View):
	def get(self, request):
		ip = get_ip(request)
		session_key = request.session.session_key
		logger.debug(f'[USER SESSION] ip: {ip} / session_key: {session_key}')

		template = 'analysis/main.html'
		return render(request, template)


class Check(View):
	def get(self, request):
		ip = get_ip(request)
		session_key = request.session.session_key
		logger.debug(f'[USER SESSION] ip: {ip} / session_key: {session_key}')

		return HttpResponseRedirect(reverse('main'))

	def post(self, request):
		ip = get_ip(request)
		session_key = request.session.session_key
		logger.debug(f'[USER SESSION] ip: {ip} / session_key: {session_key}')

		template = 'analysis/check.html'
		message = None
		try:
			message = '파일이 존재하지 않습니다...'
			file = request.FILES['uploadfile']

			message = '파일을 읽을 수 없습니다...'
			conv = Convertor()
			df = conv.run(file)
			filename = f'./uploads/csv/{file}.csv'
			df.to_csv(filename, index=False, encoding='utf8')

			is_load = True
			request.session['filename'] = filename
			request.session['is_file'] = True
			request.session['file_title'] = conv.title
			logger.debug(f'[SUCCESS] Save file : {filename}')

			message = '파일을 성공적으로 불러왔습니다.'
			return render(request, template, {'message':message, 'is_load':is_load})

		except Exception as e:
			logger.debug(f'[EXCEPTION] : {e}')
			is_load = False
			return render(request, template, {'message':message, 'is_load':is_load})


class Charts(View):
	def get(self, request):
		ip = get_ip(request)
		session_key = request.session.session_key
		logger.debug(f'[USER SESSION] ip: {ip} / session_key: {session_key}')

		template = 'analysis/charts.html'
		if 'is_file' in request.session:
			return render(request, template)
		else:
			return HttpResponseRedirect(reverse('main'))


class ChartsSample(View):
	def get(self, request):
		ip = get_ip(request)
		session_key = request.session.session_key
		logger.debug(f'[USER SESSION] ip: {ip} / session_key: {session_key}')

		template = 'analysis/charts_sample.html'
		return render(request, template)


class Inquiry(View):
	def get(self, request):
		ip = get_ip(request)
		session_key = request.session.session_key
		logger.debug(f'[USER SESSION] ip: {ip} / session_key: {session_key}')

		template = 'analysis/inquiry.html'
		return render(request, template)


class Guide(View):
	def get(self, request):
		ip = get_ip(request)
		session_key = request.session.session_key
		logger.debug(f'[USER SESSION] ip: {ip} / session_key: {session_key}')

		template = 'analysis/guideline.html'
		return render(request, template)
