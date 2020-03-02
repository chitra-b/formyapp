# django Imports
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

# App Imports
from . import constants, models, requestMiddleware


# python imports
import datetime
import json


@receiver(post_save)
@receiver(post_delete)
def track_user_actions(sender, instance, **kwargs):
    """Signal function to track every change to a model

    Arguments:
        sender {object} -- The model sending the signal
        instance {object} -- data instance
    """
    try:
        current_request = requestMiddleware.RequestMiddleware.get_request_data()[1]
        # print (current_request.__dict__)
        if (
                sender._meta.db_table not in constants.TABLES
                and hasattr(current_request, "user")
                and hasattr(instance, "id")
        ):
            try:
                print(requestMiddleware.RequestMiddleware.get_request_data()[0])
                if requestMiddleware.RequestMiddleware.get_request_data()[0]:
                    request_data = json.loads(requestMiddleware.RequestMiddleware.get_request_data()[0])
                else:
                    request_data = ""
            except json.decoder.JSONDecodeError as e:
                request_data = requestMiddleware.RequestMiddleware.get_request_data()[0]
            data = instance.__dict__.copy()
            data.__delitem__("_state")
            try:
                print ("here 1")
                history = models.History(
                    table_name=str(instance._meta.db_table),
                    user=current_request.user,
                    instance_id=instance.id,
                    action=current_request.method,
                    request_data=request_data,
                    path=current_request.path,
                    response_data=data,
                )
                history.save()
            except ValueError:
                pass
    except Exception:
        pass