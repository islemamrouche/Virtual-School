# Generated by Django 3.1.5 on 2021-07-14 11:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0002_auto_20210709_1221'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='phone_number',
            field=models.CharField(max_length=60, null=True),
        ),
    ]
