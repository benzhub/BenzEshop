# Generated by Django 4.2.9 on 2024-01-19 09:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='descriotion',
            new_name='description',
        ),
    ]
