from django import forms

from static_content.models import Attachment


class AttachmentForm(forms.ModelForm):
    file = forms.FileField(required=True)

    class Meta:
        model = Attachment
        fields = ["file"]

