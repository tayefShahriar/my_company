# Generated by Django 4.1.5 on 2023-01-11 14:23

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("company", "0009_service"),
    ]

    operations = [
        migrations.AddField(
            model_name="slider",
            name="date",
            field=models.DateTimeField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
    ]