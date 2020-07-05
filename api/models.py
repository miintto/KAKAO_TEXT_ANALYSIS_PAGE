from django.db import models


class UserCountChatModelForQuery(models.Model):
    name = models.CharField(max_length=50, primary_key=True)
    chat = models.IntegerField()

class UserCountChatMonthlyModelForQuery(models.Model):
    month = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=50)
    chat = models.IntegerField()
