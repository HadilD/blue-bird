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

        return queryset


class MediaFilter(filters.FilterSet):
    tags = TagsFilter()
    types = AttachmentFormatFilter()

    class Meta:
        model = Media
        fields = ["is_enabled", "tags", "types"]
