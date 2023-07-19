from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_product_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='PromoCode',
            fields=[
                ('_id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('promoCode', models.CharField(blank=True, max_length=200, null=True)),
                ('discount', models.IntegerField(blank=True, default=0, null=True)),
            ],
        ),
    ]