import typing as t

from django import http
from django.contrib.auth.models import User
from django.db import models as m


class Log(m.Model):
    user = m.ForeignKey(to=User, on_delete=m.PROTECT)
    request_time = m.DateTimeField(auto_now_add=True)
    path = m.CharField()
    method = m.CharField()
    body = m.CharField()
    response_time = m.DateTimeField(null=True)
    status = m.IntegerField(null=True)

    @classmethod
    def create_from_request(cls, request: http.HttpRequest) -> t.Self:
        return cls.objects.create(
            user=request.user,
            path=request.path,
            method=request.method,
            body=request.body.decode()
        )