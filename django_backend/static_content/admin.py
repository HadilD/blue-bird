from django.contrib import admin
from django.utils.html import format_html

from static_content.models import UploadedMedia
from static_content.forms import UploadedMediaForm
from static_content.s3_service import get_public_link, delete_remote_file as delete_file


class UploadedMediaModelAdmin(admin.ModelAdmin):
    list_display = "name", "uri", "get_url", "created_at"
    fields = "name", "thumbnail_preview", "image", "created_at"
    readonly_fields = "created_at", "thumbnail_preview"
    list_display_links = "name",
    sortable_by = "created_at"

    form = UploadedMediaForm

    def get_url(self, obj):
        url = get_public_link(obj.uri)
        return format_html("""<a target='_blank' href='{0}'><img width="20px" src='{0}'/></a>""", url)

    get_url.short_description = "Preview & Link"

    def thumbnail_preview(self, obj):
        url = get_public_link(obj.uri)
        return format_html("""<a target="_blank" href="{0}"><img width="100px" src='{0}'/></a>""", url)

    thumbnail_preview.short_description = "Preview"

    def delete_queryset(self, request, queryset):
        for obj in queryset:
            delete_file(obj.uri)
            obj.delete()


admin.site.register(UploadedMedia, UploadedMediaModelAdmin)
