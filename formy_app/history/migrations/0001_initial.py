# Generated by Django 3.0.3 on 2020-02-17 06:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='History',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('table_name', models.CharField(editable=False, max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('instance_id', models.CharField(editable=False, max_length=255)),
                ('action', models.CharField(choices=[('POST', 'POST'), ('DELETE', 'DELETE'), ('PUT', 'PUT'), ('PATCH', 'PATCH')], editable=False, max_length=7)),
                ('path', models.CharField(default='', editable=False, max_length=255)),
                ('request_data', models.TextField(default='', editable=False)),
                ('response_data', models.TextField(default='', editable=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'History',
            },
        ),
    ]
