from channels.generic.websocket import WebsocketConsumer


class MyConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def receive(self, text_data):
        self.send(text_data=text_data)

    def disconnect(self, close_code):
        pass
