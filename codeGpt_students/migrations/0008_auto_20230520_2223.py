# Generated by Django 3.2.4 on 2023-05-20 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('codeGpt_students', '0007_auto_20230520_2123'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='device',
            field=models.JSONField(default=''),
        ),
        migrations.AlterField(
            model_name='student',
            name='token',
            field=models.JSONField(default=''),
        ),
    ]
