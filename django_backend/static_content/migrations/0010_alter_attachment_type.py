# Generated by Django 4.0.4 on 2022-06-10 09:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('static_content', '0009_alter_attachment_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attachment',
            name='type',
            field=models.CharField(choices=[('image', 'image'), ('video', 'video'), ('audio', 'audio'), ('application', 'application')], max_length=30),
        ),
    ]
