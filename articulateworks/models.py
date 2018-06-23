# Create your models here.
from django.db.models import CharField, ManyToManyField, ForeignKey, CASCADE
from model_utils.models import TimeStampedModel


class Requester(TimeStampedModel):
    name = CharField(max_length=255)
    description = CharField(max_length=1024)
    admins = ManyToManyField('auth.User')


class AdminProfile(TimeStampedModel):
    user = ForeignKey('auth.User', on_delete=CASCADE)
    requester = ForeignKey('Requester', on_delete=CASCADE)


class Skill(TimeStampedModel):
    name = CharField(max_length=255)
    description = CharField(max_length=1024)


class Task(TimeStampedModel):
    name = CharField(max_length=255)
    description = CharField(max_length=1024)


class Role(TimeStampedModel):
    name = CharField(max_length=255)
    description = CharField(max_length=1024)


class Profile(TimeStampedModel):
    name = CharField(max_length=255)
    description = CharField(max_length=1024)
