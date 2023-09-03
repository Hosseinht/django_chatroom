import os
import magic
from PIL import Image
from django.core.exceptions import ValidationError


def validate_image_file_type(file):
    """
    Validate type and extension of the uploaded image
    """
    valid_mime_types = ["image/jpeg", "image/png", "image/gif"]
    file_mime_type = magic.from_buffer(file.read(2048), mime=True)
    if file_mime_type not in valid_mime_types:
        raise ValidationError("File type must be image.")
    valid_file_extensions = [".jpeg", ".jpg", ".png", ".gif"]
    ext = os.path.splitext(file.name)[1]
    if ext.lower() not in valid_file_extensions:
        raise ValidationError("Unsupported file extension.")


def validate_icon_size(image):
    if image:

        with Image.open(image) as img:

            if img.width > 70 or img.height > 70:
                max_size = f"{70}x{70}"
                actual_size = f"{img.width}x{img.height}"

                message = (
                    "The image you uploaded is too large. The maximum allowed image dimensions  for icons "
                    "is %(max_size)s pixels. The image dimensions  of your image is %(actual_size)s pixels."
                ) % {"max_size": max_size, "actual_size": actual_size}

                raise ValidationError(message)
