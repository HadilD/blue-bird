# Generated by Django 4.0.4 on 2022-06-14 09:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('static_content', '0013_media_was_bought_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='media',
            name='is_enabled',
            field=models.BooleanField(default=True),
        ),
    ]