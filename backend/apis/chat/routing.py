# chat_app/routing.py
from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/one_to_one/(?P<user_id>\d+)/$", consumers.OneToOneChatConsumer.as_asgi()),
    re_path(r"ws/group/(?P<group_name>\w+)/$", consumers.GroupChatConsumer.as_asgi()),
]