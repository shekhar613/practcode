# Generated by Django 4.2 on 2023-05-23 09:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('codeGpt_students', '0010_auto_20230520_2228'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='username',
            field=models.CharField(default='-', max_length=11),
        ),
    ]
