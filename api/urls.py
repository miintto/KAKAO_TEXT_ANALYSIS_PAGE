from django.urls import path
from . import views

urlpatterns = [
	path('title', views.Title.as_view(), name='title'),
	path('date/interval', views.DateInterval.as_view(), name='date_interval'),
	path('user/count', views.UserCount.as_view()),
	path('user/count/score', views.UserCountScore.as_view()),
	path('user/count/monthly', views.UserCountMonthly.as_view()),
	path('user/count/monthly/names', views.UserCountMonthlyNames.as_view()),
	path('group/hour/weekdays', views.GroupHourWeekdays.as_view()),
	path('wordcloud', views.WordCloud.as_view(), name='wordcloud'),
	path('user/count/words', views.UserCountWord.as_view()),
]