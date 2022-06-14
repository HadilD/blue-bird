# Generated by Django 4.0.4 on 2022-06-10 08:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('static_content', '0007_attachment_type_alter_media_tags'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attachment',
            name='type',
            field=models.CharField(blank=True, choices=[('image', 'image'), ('image', 'image'), ('video', 'video'), ('video', 'video'), ('audio', 'audio'), ('audio', 'audio'), ('document', 'document'), ('document', 'document')], max_length=30),
        ),
    ]