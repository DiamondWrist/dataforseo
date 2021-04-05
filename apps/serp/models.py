from django.db import models

# Create your models here.


class SearchSystem(models.Model):

    name = models.CharField(
        max_length=50
    )

    argument = models.CharField(
        max_length=50
    )

    def __str__(self):
        return '%s' % self.name


class SearchResult(models.Model):
    task_id = models.CharField(
        max_length=70
    )

    search_engine = models.ForeignKey(
        SearchSystem, on_delete=models.DO_NOTHING
    )

    language = models.CharField(
        max_length=50
    )

    location = models.CharField(
        max_length=50
    )

    keyword = models.TextField()

    def __str__(self):
        return '%s' % self.task_id
