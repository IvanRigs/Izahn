# Generated by Django 4.2.7 on 2023-12-04 09:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cont', '0004_alter_producto_urlimg'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='urlImg',
            field=models.URLField(),
        ),
    ]