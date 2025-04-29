# chat_app/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model

User = get_user_model()

class OneToOneChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = self.scope["url_route"]["kwargs"]["user_id"]
        self.sender_id =self.scope["user"].id 
        print(f"Sender ID: {self.sender_id}, Receiver ID: {self.user_id}")
        self.room_name = f"one_to_one_{min(self.sender_id, int(self.user_id))}_{max(self.sender_id, int(self.user_id))}"
        self.room_group_name = self.room_name

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        user = await self.get_user(self.scope["user"].id)
        username = user.username if user else "Anonymous"

        await self.channel_layer.group_send(
            self.room_group_name,
            {"type": "chat.message", "message": message, "user": username},
        )

    async def chat_message(self, event):
        message = event["message"]
        user = event["user"]
        await self.send(text_data=json.dumps({"message": message, "user": user}))

    @database_sync_to_async
    def get_user(self, user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None

class GroupChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = self.scope["url_route"]["kwargs"]["group_name"]
        self.room_group_name = f"group_{self.group_name}"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        user = await self.get_user(self.scope["user"].id)
        username = user.username if user else "Anonymous"

        await self.channel_layer.group_send(
            self.room_group_name,
            {"type": "chat.message", "message": message, "user": username},
        )

    async def chat_message(self, event):
        message = event["message"]
        user = event["user"]
        await self.send(text_data=json.dumps({"message": message, "user": user}))

    @database_sync_to_async
    def get_user(self, user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None