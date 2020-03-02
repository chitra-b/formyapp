from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    user_mobile_number = models.CharField(
        max_length=25, unique=False, blank=False, null=False)
    email = models.EmailField('email address', unique=True, blank=False, null=False)
    last_updated_on = models.DateTimeField(auto_now=True, blank=False, null=False)
    profile_pic = models.FileField(upload_to='profile_pictures/users/', default="")

    def __str__(self):
        return self.username
    class Meta:
        db_table = 'users'


class UserMeta(models.Model):
    user = models.ForeignKey(
        CustomUser, null=False, blank=False, on_delete=models.CASCADE)
    meta_key = models.CharField(
        max_length=255, blank=False, null=False)
    meta_value = models.CharField(
        max_length=255, blank=False, null = False)
    created_on = models.DateTimeField(auto_now_add=True, blank=False, null=False)
    last_updated_on = models.DateTimeField(auto_now=True, blank=False, null=False)

    class Meta:
        db_table = 'user_meta'
        unique_together = ('user', 'meta_key')

    def __str__(self):
        return "{} - {}".format(self.user, self.meta_key)