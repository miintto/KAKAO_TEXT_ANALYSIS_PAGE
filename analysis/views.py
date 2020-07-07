from django.http import HttpResponseRedirect
from django.views.generic.edit import View
from django.shortcuts import render
from django.urls import reverse
from common.module.convertor import Convertor
from common.module.utils import get_ip

import logging
logger = logging.getLogger(__name__)


class Main(View):
	"""
	메인 화면
	"""
	template_name = 'analysis/main.html'

	def get(self, request):
		ip = get_ip(request)
		session_key = request.session.session_key
		logger.debug(f'[USER SESSION] ip: {ip} / session_key: {session_key}')

		return render(request, self.template_name)


class Check(View):
	"""
	파일 체크 화면

	[POST] : 업로드된 텍스트 파일 가공 및 foramt valid check
		- 유효하면 차트 화면으로 redirect
		- 유효하지 않으면 화면에 메시지 띄움
	[GET] : 메인으로 redirect
	"""
	template_name = 'analysis/main_check.html'

	def get(self, request):
		ip = get_ip(request)
		session_key = request.session.session_key
		logger.debug(f'[USER SESSION] ip: {ip} / session_key: {session_key}')
		return HttpResponseRedirect(reverse('main'))

	def post(self, request):
		ip = get_ip(request)
		session_key = request.session.session_key
		logger.debug(f'[USER SESSION] ip: {ip} / session_key: {session_key}')

		### txt 파일 가공
		conv = Convertor()
		file = request.FILES['uploadfile']
		status = conv.run(file)

		if status==200:
			is_load = True
			request.session['user_chat_uid'] = conv.uid
			request.session['is_file'] = is_load
			request.session['file_title'] = conv.title
			return HttpResponseRedirect(reverse('charts'))
		else:
			is_load = False
			message = '파일을 읽을 수 없습니다...'
			return render(request, self.template_name, {'message': message, 'is_load': is_load})


class Charts(View):
	"""
	차트 화면

	[GET] : 차트 그래프는 API로 로딩
	"""
	template_name = 'analysis/charts.html'

	def get(self, request):
		ip = get_ip(request)
		session_key = request.session.session_key
		logger.debug(f'[USER SESSION] ip: {ip} / session_key: {session_key}')

		if 'is_file' in request.session:
			return render(request, self.template_name)
		else:
			return HttpResponseRedirect(reverse('main'))


class ChartsSample(View):
	"""
	샘플 차트 화면
	"""
	template_name = 'analysis/charts_sample.html'

	def get(self, request):
		ip = get_ip(request)
		session_key = request.session.session_key
		logger.debug(f'[USER SESSION] ip: {ip} / session_key: {session_key}')
		return render(request, self.template_name)


class Info(View):
	"""
	INFO 화면
	"""
	template_name = 'analysis/inquiry.html'

	def get(self, request):
		ip = get_ip(request)
		session_key = request.session.session_key
		logger.debug(f'[USER SESSION] ip: {ip} / session_key: {session_key}')

		return render(request, self.template_name)


# class Guide(View):
# 	def get(self, request):
# 		ip = get_ip(request)
# 		session_key = request.session.session_key
# 		logger.debug(f'[USER SESSION] ip: {ip} / session_key: {session_key}')
#
# 		template = 'analysis/guideline.html'
# 		return render(request, template)
