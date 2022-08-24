from django.contrib import admin
from django.utils.html import format_html

from static_content.models import Media, Attachment, Tag, Order, Ratings


admin.site.register(Media)
admin.site.register(Attachment)
admin.site.register(Tag)
admin.site.register(Order)
admin.site.register(Ratings)