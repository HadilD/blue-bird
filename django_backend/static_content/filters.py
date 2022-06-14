import django_filters as filters
from static_content.models import Media, Attachment, Tag


class TagsFilter(filters.CharFilter):
    def filter(self, queryset, value):
        if value:
            tags = [tag.strip() for tag in value.split(",")]
            queryset = queryset.filter(tags__name__in=tags).distinct()
        return queryset


class TypesFilter(filters.CharFilter):
    def filter(self, queryset, value):
        if value:
            types = [type.strip() for type in value.split(",")]
            queryset = queryset.filter(attachment__type__in=types).distinct()

        return queryset


class MediaFilter(filters.FilterSet):
    tags = TagsFilter()
    types = TypesFilter()
    min_cost = filters.NumberFilter(field_name="cost", lookup_expr="gte")
    max_cost = filters.NumberFilter(field_name="cost", lookup_expr="lte")
    created_after = filters.DateTimeFilter(field_name="created_at", lookup_expr="gte")
    created_before = filters.DateTimeFilter(field_name="created_at", lookup_expr="lte")

    class Meta:
        model = Media
        fields = ["is_enabled", "tags", "types", "min_cost", "max_cost", "created_after", "created_before"]
