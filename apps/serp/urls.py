from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(r'create_task', views.CreateTaskView, 'create_task')


urlpatterns = [
    path('tasks_ready', views.TaskReadyView.as_view(), name='tasks_ready'),
    path('create_task/', views.CreateTaskView.as_view(), name='create_task'),
    # path('', include(router.urls)),
    ]
