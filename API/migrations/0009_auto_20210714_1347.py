# Generated by Django 3.1.5 on 2021-07-14 12:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0008_remove_account_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='groups',
            field=models.ManyToManyField(blank=True, null=True, to='API.Group'),
        ),
    ]
