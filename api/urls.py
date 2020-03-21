from django.urls import path
from . import views

urlpatterns = [
	path('title', views.Title.as_view(), name='title'),
	path('date/interval', views.DateInterval.as_view(), name='date_interval'),
	path('heatmap/monthly', views.HeatmapMonthly.as_view(), name='heatmap_monthly'),
	path('pie/total', views.Pie.as_view(), name='pie_total'),
	path('stream/monthly', views.StreamMonthly.as_view(), name='stream_monthly'),
	path('heatmap/time', views.HeatmapTime.as_view(), name='heatmap_time'),
	path('wordcloud', views.WordCloud.as_view(), name='wordcloud'),
	path('circularpacking', views.CircularPacking.as_view(), name='circular_packing'),
	path('bar/user', views.BarByUser.as_view(), name='bar_user'),
]