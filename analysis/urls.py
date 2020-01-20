from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
	path('main', views.main, name='main'),
	path('check', views.check, name='check'),
	path('charts', views.charts.as_view(), name='charts'),
	path('inquiry', views.inquiry, name='inquiry'),
] 