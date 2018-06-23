# Create your models here.
from django.contrib.auth.models import User
from django.db.models import CharField, ManyToManyField, ForeignKey, CASCADE, OneToOneField
from django.db.models.signals import post_save
from model_utils.models import TimeStampedModel


class Requester(TimeStampedModel):
    name = CharField(max_length=255)
    description = CharField(max_length=1024, blank=True)
    admins = ManyToManyField('auth.User', related_name='requesters')


class Profile(TimeStampedModel):
    user = OneToOneField('auth.User', on_delete=CASCADE, related_name='profile')

    def add_skills(self, skills):
        if not isinstance(skills, list):
            skills = (skills,)
        for skill in skills:
            if not isinstance(skill, Skill):
                skill, created = Skill.objects.get_or_create(name=skill)
            self.user.skills.get_or_create(skill=skill)


class RequesterSkill(TimeStampedModel):
    requester = ForeignKey('Requester', on_delete=CASCADE, related_name='skills')
    skill = ForeignKey('Skill', on_delete=CASCADE, related_name='requesters')


class ApplicantSkill(TimeStampedModel):
    user = ForeignKey('auth.User', on_delete=CASCADE, related_name='skills')
    skill = ForeignKey('Skill', on_delete=CASCADE, related_name='applicants')


class Skill(TimeStampedModel):
    name = CharField(max_length=255)
    description = CharField(max_length=1024, blank=True)


class RequesterTask(TimeStampedModel):
    requester = ForeignKey('Requester', on_delete=CASCADE, related_name='tasks')
    task = ForeignKey('Task', on_delete=CASCADE, related_name='requesters')


class ApplicantTask(TimeStampedModel):
    user = ForeignKey('auth.User', on_delete=CASCADE, related_name='tasks')
    task = ForeignKey('Task', on_delete=CASCADE, related_name='applicants')


class Task(TimeStampedModel):
    name = CharField(max_length=255)
    description = CharField(max_length=1024, blank=True)


class RequesterRole(TimeStampedModel):
    requester = ForeignKey('Requester', on_delete=CASCADE, related_name='roles')
    role = ForeignKey('Role', on_delete=CASCADE, related_name='requesters')


class ApplicantRole(TimeStampedModel):
    user = ForeignKey('auth.User', on_delete=CASCADE, related_name='roles')
    role = ForeignKey('Role', on_delete=CASCADE, related_name='applicants')


class Role(TimeStampedModel):
    name = CharField(max_length=255)
    description = CharField(max_length=1024, blank=True)


def save_or_create_user_profile(sender, instance, created, **kwargs):
    if created:
        profile = Profile.objects.create(user=instance)
        profile.save()

post_save.connect(save_or_create_user_profile, sender=User)
