import django_filters
from static_content.models import Media, Attachment


class MediaListFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(name="cost", lookup_type='gte')
    max_price = django_filters.NumberFilter(name="cost", lookup_type='lte')

    class Meta:
        model = Media
        fields = ['min_price', 'max_price']
