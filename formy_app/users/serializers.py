from rest_framework import serializers
from . import models
from django.db import transaction
from rest_framework.exceptions import APIException
from rest_auth.serializers import PasswordResetSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = (
            "id",
            "username",
            "password",
            "first_name",
            "last_name",
            "email",
            "profile_pic",
        )
        depth = 1

    def create(self, validated_data):
        try:
            with transaction.atomic():
                save_point_obj = transaction.savepoint()
                # Create User
                new_user = models.CustomUser.objects.create_user(
                    username=validated_data["username"],
                    first_name=validated_data["first_name"],
                    last_name=validated_data["last_name"],
                    email=validated_data["email"],
                    password=validated_data["password"],
                    user_mobile_number=validated_data["user_mobile_number"],
                    profile_pic=validated_data.get("profile_pic", None),
                )
                transaction.savepoint_commit(save_point_obj)
            return new_user
        except Exception as e:
            raise APIException({"detail": e})


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ("username", "password")


class PasswordResetSerializer(PasswordResetSerializer):
    def get_email_options(self):
        return {
            "subject_template_name": "account/email/email_confirmation_subject.txt",
            "email_template_name": "account/email/email_confirmation_message.txt",
            # 'html_email_template_name': 'account/password_reset_key.html',
        }
