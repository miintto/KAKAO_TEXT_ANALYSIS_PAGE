from django.http import HttpResponseRedirect
from django.views.generic.edit import View
from django.shortcuts import render
from django.urls import reverse
from static.analysis.convertor import Convertor
from static.analysis.chart_model import make_json, make_sample
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
			con = Convertor()
			df = con.convert(file)
			filename = f'./uploads/csv/{file}.csv'
			df.to_csv(filename, index=False, encoding='utf8')

			is_load = True
			message = '파일을 성공적으로 불러왔습니다.'
			request.session['filename'] = filename
			request.session['is_file'] = True
			request.session['file_title'] = con.title
			logger.debug(f'[SUCCESS] Save file : {filename}')

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


class Inquiry(View):
	def get(self, request):
		ip = get_ip(request)
		session_key = request.session.session_key
		logger.debug(f'[USER SESSION] ip: {ip} / session_key: {session_key}')

		template = 'analysis/inquiry.html'
		return render(request, template)


def get_ip(request):
	x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
	if x_forwarded_for:
		ip = x_forwarded_for.split(',')[0]
	else:
		ip = request.META.get('REMOTE_ADDR')
	return ip
