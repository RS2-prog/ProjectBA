# Generated by Django 5.1.4 on 2024-12-29 06:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0006_studentdtl_armor_type_studentdtl_damage_type_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentdtl',
            name='school',
            field=models.CharField(choices=[('1', 'アビドス'), ('2', 'アリウス'), ('3', 'ヴァルキューレ'), ('4', 'ゲヘナ'), ('5', '山海経'), ('6', 'トリニティ'), ('7', '百鬼夜行'), ('8', 'ミレニアム'), ('9', 'レッドウィンター'), ('10', 'アビドス'), ('11', 'SRT'), ('99', 'その他')], default='1', max_length=2),
        ),
    ]
