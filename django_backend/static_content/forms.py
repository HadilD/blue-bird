from django import forms

from static_content.models import UploadedMedia
from static_content.s3_service import upload_file


class UploadedMediaForm(forms.ModelForm):
    image = forms.ImageField()

    def save(self, commit=True):
        file = self.cleaned_data.get("image")
        uploaded_file_name = upload_file(file)

        obj = super(UploadedMediaForm, self).save(commit=False)
        obj.uri = uploaded_file_name
        obj.save()

        return obj

    class Meta:
        model = UploadedMedia
        exclude = "uri",
