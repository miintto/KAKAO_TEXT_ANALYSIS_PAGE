from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
	path('main', views.Main.as_view(), name='main'),
	path('check', views.Check.as_view(), name='check'),
	path('charts', views.Charts.as_view(), name='charts'),
	path('charts/sample', views.ChartsSample.as_view(), name='charts_sample'),
	path('inquiry', views.Inquiry.as_view(), name='inquiry'),
]