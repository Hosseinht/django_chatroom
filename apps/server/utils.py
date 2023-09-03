def category_icon_upload_path(instance, filename):
    return f"category/{instance.name}/category_icon/{filename}"


def room_icon_upload_path(instance, filename):
    return f"room/{instance.name}/room_icon/{filename}"


def room_banner_upload_path(instance, filename):
    return f"room/{instance.name}/room_banner/{filename}"
