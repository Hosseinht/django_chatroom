from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer


# Define a WebSocket consumer class
class WebChatConsumer(JsonWebsocketConsumer):

    # Initialize the consumer and set the default room name
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.room_name = "testserver"

    # Method called when a client connects to the WebSocket
    def connect(self):
        # Accept the WebSocket connection
        self.accept()

        # Add the client to the specified room
        async_to_sync(self.channel_layer.group_add)(
            self.room_name,
            self.channel_name,
        )

    # Method called when the consumer receives a JSON message from a client
    def receive_json(self, content, **kwargs):
        # Send the received message to all clients in the room
        async_to_sync(self.channel_layer.group_send)(
            # group_send: send messages to all channels in a particular group
            self.room_name,
            {
                "type": "chat.message",
                "new_message": content["message"],
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
        pass
