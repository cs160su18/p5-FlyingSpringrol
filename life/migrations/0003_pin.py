# Generated by Django 2.0.7 on 2018-07-21 05:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('life', '0002_auto_20180718_1558'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pin',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('note', models.CharField(max_length=400)),
                ('lat', models.FloatField()),
                ('long', models.FloatField()),
                ('pin_id', models.IntegerField()),
            ],
        ),
    ]
