import django_filters as filters

from static_content.models import (Media, Attachment, Tag)


class TagsFilter(filters.CharFilter):
    """
    A class for filtering media objects based on tags

    Methods:
    -------
        filter():
        Overrides the default filter() method in CharFilter to customize behavior
    """
    def filter(self, queryset, value):
        """
        Filters a queryset based on a value.
        The main reason for overriding is to accommodate filtering based on
        multiple tags.

        Parameters
        ----------
            queryset : QuerySet
                The queryset to be filtered
            value : str
                A string of tags separated by commas
        """
        if value:
            tags = [tag.strip() for tag in value.split(",")]
            queryset = queryset.filter(tags__name__in=tags).distinct()
        return queryset


class TypesFilter(filters.CharFilter):
    """
    A class for filtering media objects based on types.

    Methods:
    -------
        filter():
        Overrides the default filter() method in CharFilter to customize behavior
    """
    def filter(self, queryset, value):
        """
        Filters a queryset based on a value.
        The main reason for overriding is to accommodate filtering based on
        multiple types.

        Parameters
        ----------
            queryset : QuerySet
                The queryset to be filtered
            value : str
                A string of types separated by commas
        """
        if value:
            types = [type.strip() for type in value.split(",")]
            queryset = queryset.filter(attachment__type__in=types).distinct()

        return queryset


class MediaFilter(filters.FilterSet):
    """
    A class for filtering media objects based on tags, types, cost, and/or date of publishing.
    This class enables these filters to be combined together in a single request.

    Attributes:
    ----------
        tags : Filter
            The filter that would be used for filtering by tags
        types : Filter
            The filter that would be used for filtering by types
        min_cost : Filter
            The filter for filtering media that costs above a certain threshold
        max_cost : Filter
            The filter for filtering media that costs below a certain threshold
        created_after : Filter
            The filter for filtering media that was created after a certain time
        created_before : Filter
            The filter for filtering media that was created before a certain time

    """
    tags = TagsFilter()
    types = TypesFilter()
    min_cost = filters.NumberFilter(field_name="cost", lookup_expr="gte")
    max_cost = filters.NumberFilter(field_name="cost", lookup_expr="lte")
    created_after = filters.DateTimeFilter(field_name="created_at", lookup_expr="gte")
    created_before = filters.DateTimeFilter(field_name="created_at", lookup_expr="lte")

    class Meta:
        """
        A class for specifying meta data about MediaFilter.

        This class is capable of automatically generating simple filters for a given model's
        field based on the model's field underlying type. To achieve that, the model and the list of
        filterable fields should be provided.

        Although I mostly manually creating filters for Media's fields, I am using this option to enable
        automatic filtering on the is_enabled field.

        Attributes:
        ----------
            model : Model
                Model for which the fields belong
            fields : list of Field names
                The fields by which the model is filterable
        """
        model = Media
        fields = ["is_enabled", "tags", "types", "min_cost", "max_cost", "created_after", "created_before"]
