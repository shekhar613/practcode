# Generated by Django 4.2 on 2023-10-19 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('codeGpt_students', '0016_student__isvarified'),
    ]

    operations = [
        migrations.CreateModel(
            name='Course_overview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('courseImg', models.BinaryField()),
                ('category', models.CharField(max_length=200)),
                ('title', models.CharField(max_length=200)),
                ('level', models.CharField(max_length=50)),
                ('duration', models.CharField(max_length=50)),
                ('ratings', models.CharField(default='No Rattings', max_length=10)),
                ('price', models.CharField(default='FREE', max_length=100)),
                ('creator', models.CharField(default='Practcode', max_length=20)),
                ('numberOfSections', models.IntegerField()),
                ('description', models.CharField(max_length=200)),
                ('sectionData', models.JSONField(default={})),
                ('sections_descriptions', models.CharField(default='Practcode', max_length=200)),
            ],
        ),
    ]
