# Generated by Django 5.1.4 on 2024-12-14 03:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='teacher',
            name='is_staff',
            field=models.BooleanField(default=False, verbose_name='スタッフフラグ'),
        ),
    ]
