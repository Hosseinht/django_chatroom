from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from django.contrib.auth import get_user_model

from .models import Conversation, Message

User = get_user_model()


# Define a WebSocket consumer class
class WebChatConsumer(JsonWebsocketConsumer):
    # Initialize the consumer and set the default room name
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.room_id = None
        self.user = None

    # Method called when a client connects to the WebSocket
    def connect(self):
        # authenticated the user
        self.user = self.scope["user"]
        self.accept()

        if not self.user.is_authenticated:
            self.close(code=4001)

        # Accept the WebSocket connection

        self.room_id = self.scope["url_route"]["kwargs"]["roomId"]

        self.user = User.objects.get(id=1)
        # Add the client to the specified room
        async_to_sync(self.channel_layer.group_add)(
            self.room_id,
            self.channel_name,
        )

    # Method called when the consumer receives a JSON message from a client
    def receive_json(self, content, **kwargs):
        room_id = self.room_id
        sender = self.user
        message = content["message"]

        conversation, created = Conversation.objects.get_or_create(room_id=room_id)

        new_message = Message.objects.create(
            conversation=conversation,
            sender=sender,
            content=message,
        )

        # Send the received message to all clients in the room
        async_to_sync(self.channel_layer.group_send)(
            # group_send: send messages to all channels in a particular group
            self.room_id,
            {
                "type": "chat.message",
                "new_message": {
                    "id": new_message.id,
                    "sender": new_message.sender.username,
                    "content": new_message.content,
                    "timestamp": new_message.timestamp.isoformat(),
                },
            },
        )

    # Method to send a JSON message back to the client. chat_message = chat.message
    def chat_message(self, event):
        """
        this method is a consumer method that is invoked when a message of the type chat. Message is received
        by the consumer.
        the event parameter is contains the message received from the channel layer
        """
        self.send_json(event)
        # send the received message back to the websocket connections. It's going to be sent to everyone who is
        # connected to the room_name in the receive_json method

    # Method called when a client disconnects from the WebSocket
    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.room_id, self.channel_name)
