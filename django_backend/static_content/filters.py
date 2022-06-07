import django_filters as filters
from static_content.models import Media, Attachment, Tag


class TagsFilter(filters.CharFilter):
    def filter(self, queryset, value):
        if value:
            tags = [tag.strip() for tag in value.split(',')]
            queryset = queryset.filter(tags__name__in=tags).distinct()
        return queryset


class MediaFilter(filters.FilterSet):
    tags = TagsFilter()

    class Meta:
        model = Media
        fields = ["is_enabled", "tags"]
