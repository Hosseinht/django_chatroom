from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from .models import Message, Conversation
from .serializers import MessageSerializer
from .schemas import message_list_docs


class MessageListAPIView(APIView):
    queryset = Message.objects.select_related("sender").all().order_by("timestamp")

    @message_list_docs
    def get(self, request, *args, **kwargs):
        room_id = request.query_params.get("room_id")
        conversation = Conversation.objects.get(room_id=room_id)
        message = self.queryset.filter(conversation=conversation)
        serializer = MessageSerializer(message, many=True)
        return Response(serializer.data)
