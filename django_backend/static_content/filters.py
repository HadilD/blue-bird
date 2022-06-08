import django_filters as filters
from static_content.models import Media, Attachment, Tag


class TagsFilter(filters.CharFilter):
    def filter(self, queryset, value):
        if value:
            tags = [tag.strip() for tag in value.split(",")]
            queryset = queryset.filter(tags__name__in=tags).distinct()
        return queryset


class AttachmentFormatFilter(filters.CharFilter):
    def filter(self, queryset, value):
        if value:
            media_types = [media_type.strip() for media_type in value.split(",")]
            queryset = queryset.filter(attachment__format__in=media_types).distinct()
            # queryset = queryset.raw("SELECT DISTINCT * FROM static_content_media INNER JOIN static_content_attachment "
            #                         "ON (static_content_media.id = static_content_attachment.media_id) WHERE "
            #                         "SUBSTRING_INDEX(static_content_attachment.format, '/', 1) IN (application)"), [index.id])
        return queryset


class MediaFilter(filters.FilterSet):
    tags = TagsFilter()
    types = AttachmentFormatFilter()

    class Meta:
        model = Media
        fields = ["is_enabled", "tags", "types"]
