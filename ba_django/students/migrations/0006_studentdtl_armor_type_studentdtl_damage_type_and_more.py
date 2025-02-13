# Generated by Django 5.1.4 on 2024-12-25 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0005_student_isowned_alter_student_detail_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='studentdtl',
            name='armor_type',
            field=models.CharField(choices=[('1', '軽装備'), ('2', '重装甲'), ('3', '特殊装甲'), ('4', '弾力装甲')], default='1', max_length=1),
        ),
        migrations.AddField(
            model_name='studentdtl',
            name='damage_type',
            field=models.CharField(choices=[('1', '爆発'), ('2', '貫通'), ('3', '神秘'), ('4', '振動')], default='1', max_length=1),
        ),
        migrations.AddField(
            model_name='studentdtl',
            name='position',
            field=models.CharField(choices=[('1', 'FRONT'), ('2', 'MIDDLE'), ('3', 'BACK')], default='1', max_length=1),
        ),
        migrations.AddField(
            model_name='studentdtl',
            name='role',
            field=models.CharField(choices=[('1', 'アタッカー'), ('2', 'タンク'), ('3', 'ヒーラー'), ('4', 'サポーター'), ('5', 'T.S')], default='1', max_length=1),
        ),
        migrations.AddField(
            model_name='studentdtl',
            name='s_class',
            field=models.CharField(choices=[('1', 'STRIKER'), ('2', 'SPECIAL')], default='1', max_length=1),
        ),
        migrations.AddField(
            model_name='studentdtl',
            name='school',
            field=models.CharField(choices=[('1', 'アビドス'), ('2', 'アリウス'), ('3', 'ヴァルキューレ'), ('4', 'ゲヘナ'), ('5', '山海経'), ('6', 'トリニティ'), ('7', '百鬼夜行'), ('8', 'ミレニアム'), ('9', 'レッドウィンター'), ('10', 'アビドス'), ('11', 'その他')], default='1', max_length=2),
        ),
    ]
