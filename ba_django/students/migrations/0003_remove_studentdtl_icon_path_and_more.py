# Generated by Django 5.1.4 on 2024-12-21 00:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0002_alter_studentdtl_icon_path'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='studentdtl',
            name='icon_path',
        ),
        migrations.AlterField(
            model_name='studentdtl',
            name='impl_order',
            field=models.CharField(max_length=3, unique=True),
        ),
    ]
