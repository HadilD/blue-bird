# Generated by Django 4.0.4 on 2022-08-06 18:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='room_id',
            field=models.UUIDField(),
        ),
    ]
