from django.shortcuts import render
from rest_framework import views, viewsets, generics, mixins
from .client_helper import RestClient
from django.conf import settings
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .serializers import CreateTaskSerializer
from .models import SearchSystem, SearchResult

# Create your views here.


class TaskReadyView(views.APIView):
    def get(self, request, *args, **kwargs):
        client = RestClient(settings.API_LOGIN, settings.API_PASSWORD)

        if request.GET.get('id'):
            response = client.get(
                settings.DETAIL_URL.format(
                    search_system=request.GET.get('search'),
                    id=request.GET.get('id')
                ))
            if response["status_code"] == 20000:
                return Response(response)
            else:
                return Response({
                    'status_code': response["status_code"],
                    'message': response["status_message"]
                })

        else:
            search_sys = SearchSystem.objects.filter(name=request.GET.get('search_system')).first()
            if search_sys:
                response = client.get(
                    settings.RESULT_TASK_URL.format(
                        search_system=search_sys.argument
                    ))
                if response["status_code"] == 20000:
                    return Response(response)
                else:
                    return Response({
                        'status_code': response["status_code"],
                        'message': response["status_message"]
                    })
            else:
                return Response({'status': 'False',
                                 'message': 'Wrong Search System'})


class CreateTaskView(generics.CreateAPIView):
    serializer_class = CreateTaskSerializer

    # search_param_config = openapi.Parameter(
    #     'search_system',
    #     in_=openapi.IN_QUERY,
    #     description='Search System (Google, Bing, etc.)',
    #     type=openapi.TYPE_STRING,
    #     required=True
    # )
    #
    # region_param_config = openapi.Parameter(
    #     'region',
    #     in_=openapi.IN_QUERY,
    #     description='Region',
    #     type=openapi.TYPE_STRING,
    #     required=True
    # )
    #
    # @swagger_auto_schema(manual_parameters=[search_param_config, region_param_config])
    def post(self, request, *args, **kwargs):
        client = RestClient(settings.API_LOGIN, settings.API_PASSWORD)
        post_data = dict()

        post_data[len(post_data)] = dict(
            language_name="English",
            location_name=request.data.get('region'),
            keyword=request.data.get('keyword'),
            tag=request.data.get('keyword')

        )
        search_sys = SearchSystem.objects.filter(name=request.data.get('search_system')).first()
        if search_sys:
            # print(settings.CREATE_TASK_URL.format(
            #         search_system=search_sys.argument))
            response = client.post(
                settings.CREATE_TASK_URL.format(
                    search_system=search_sys.argument
                ),
                post_data
            )
            if response["status_code"] == 20000:
                # print(response)
                # print()
                SearchResult.objects.create(
                    task_id=response['tasks'][0].get('id'),
                    search_engine=search_sys,
                    language=response['tasks'][0]['data'].get('language_name'),
                    location=response['tasks'][0]['data'].get('location_name'),
                    keyword=response['tasks'][0]['data'].get('keyword')
                )
                return Response(response)
            else:
                return Response({
                    'status_code': response["status_code"],
                    'message': response["status_message"]
                })
        else:
            return Response({'status': 'False',
                             'message': 'Wrong Search System'})

