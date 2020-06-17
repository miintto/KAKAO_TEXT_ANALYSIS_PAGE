from django.db import models


class UserChat(models.Model):
    uid = models.CharField(max_length=50)
    date = models.DateField()
    time = models.TimeField()
    name = models.CharField(max_length=30)
    chat = models.TextField(null=True)
    wkday = models.SmallIntegerField()

    class Meta:
        db_table = 'user_chat'
        indexes = [
            models.Index(fields=['uid'], name='user_chat_index_uid'),
            models.Index(fields=['uid', 'date'], name='user_chat_index_uid_date'),
        ]
