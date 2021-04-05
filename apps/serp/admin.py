from django.contrib import admin
from .models import SearchSystem, SearchResult
# Register your models here.

admin.site.register(SearchSystem)


class SearchResultAdmin(admin.ModelAdmin):
    list_display = [
        'task_id',
        'search_engine',
        'language',
        'location',
        'keyword',
    ]


admin.site.register(SearchResult, SearchResultAdmin)
