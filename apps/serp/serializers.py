from rest_framework import serializers


class CreateTaskSerializer(serializers.Serializer):
    search_system = serializers.CharField(
        max_length=30,
        allow_null=False,
        allow_blank=False
    )

    region = serializers.CharField(
        max_length=50,
        allow_null=False,
        allow_blank=False
    )

    keyword = serializers.CharField(
        max_length=500,
    )

    class Meta:
        fields = ['search_system, region', 'keyword']
