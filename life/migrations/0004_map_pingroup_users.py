# Generated by Django 2.0.7 on 2018-07-21 05:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('life', '0003_pin'),
    ]

    operations = [
        migrations.CreateModel(
            name='Map',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('map_id', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='PinGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pg_id', models.IntegerField()),
                ('map_id', models.IntegerField()),
                ('pin_id', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=200)),
                ('password', models.CharField(max_length=200)),
                ('u_id', models.IntegerField()),
            ],
        ),
    ]
