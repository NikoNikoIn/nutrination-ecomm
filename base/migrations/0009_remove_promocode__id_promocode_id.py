# Generated by Django 4.2.2 on 2023-07-17 14:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_review_createdat'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='promocode',
            name='_id',
        ),
        migrations.AddField(
            model_name='promocode',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
    ]
