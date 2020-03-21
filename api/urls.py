from django.urls import path
from . import views

urlpatterns = [
	path('heatmap/monthly', views.HeatmapMonthly.as_view(), name='heatmap_monthly'),
	path('pie/total', views.Pie.as_view(), name='pie_total'),
	path('stream/monthly', views.StreamMonthly.as_view(), name='stream_monthly'),
	path('heatmap/time', views.HeatmapTime.as_view(), name='heatmap_time'),
	path('wordcloud', views.WordCloud.as_view(), name='wordcloud'),
	path('circularpacking', views.CircularPacking.as_view(), name='circular_packing'),
	path('bar/user', views.BarByUser.as_view(), name='bar_user'),
]