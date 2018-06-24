# Create your models here.
from django.contrib.auth.models import User
from django.db.models import CharField, ManyToManyField, ForeignKey, CASCADE, OneToOneField
from django.db.models.signals import post_save
from model_utils.models import TimeStampedModel


def is_iterable(something):
    try:
        iter(something)
    except TypeError:
        return False
    else:
        return True


class Requester(TimeStampedModel):
    name = CharField(max_length=255)
    description = CharField(max_length=1024, blank=True)
    admins = ManyToManyField('auth.User', related_name='requesters')


class Profile(TimeStampedModel):
    user = OneToOneField('auth.User', on_delete=CASCADE, related_name='profile')

    @property
    def skills(self):
        return self.get_skills()

    @property
    def tasks(self):
        return self.get_tasks()

    @property
    def roles(self):
        return self.get_roles()

    @skills.setter
    def skills(self, value):
        return self.update_skills(value)

    @tasks.setter
    def tasks(self, value):
        return self.update_tasks(value)

    @roles.setter
    def roles(self, value):
        return self.update_roles(value)

    def get_skills(self):
        return [skill.skill for skill in self.user.skills.all()]

    def add_skills(self, skills):
        """Use add append the skills that do not already exist"""
        if not isinstance(skills, list):
            skills = (skills,)
        for skill in skills:
            if not isinstance(skill, Skill):
                skill, created = Skill.objects.get_or_create(name=skill)
            self.user.skills.get_or_create(skill=skill)
        self.user.save()

    def update_skills(self, skills):
        """Use update to set the skills to exactly the list you pass in"""
        current_skills = set(self.skills)
        create_skills = set()
        same_skills = set()
        if not is_iterable(skills):
            skills = (skills,)
        for skill in skills:
            if not isinstance(skill, Skill):
                skill, created = Skill.objects.get_or_create(name=skill)
            if skill in current_skills:
                same_skills.add(skill)
            else:
                create_skills.add(skill)
        delete_skills = current_skills.difference(same_skills.union(create_skills))
        self.user.skills.filter(skill__in=delete_skills).delete()
        self.add_skills(create_skills)

    def get_tasks(self):
        return [task.task for task in self.user.tasks.all()]

    def add_tasks(self, tasks):
        """Use add append the tasks that do not already exist"""
        if not isinstance(tasks, list):
            tasks = (tasks,)
        for task in tasks:
            if not isinstance(task, Task):
                task, created = Task.objects.get_or_create(name=task)
            self.user.tasks.get_or_create(task=task)
        self.user.save()

    def update_tasks(self, tasks):
        """Use update to set the tasks to exactly the list you pass in"""
        current_tasks = set(self.tasks)
        create_tasks = set()
        same_tasks = set()
        if not is_iterable(tasks):
            tasks = (tasks,)
        for task in tasks:
            if not isinstance(task, Task):
                task, created = Task.objects.get_or_create(name=task)
            if task in current_tasks:
                same_tasks.add(task)
            else:
                create_tasks.add(task)
        delete_tasks = current_tasks.difference(same_tasks.union(create_tasks))
        self.user.tasks.filter(task__in=delete_tasks).delete()
        self.add_tasks(create_tasks)

    def get_roles(self):
        return [role.role for role in self.user.roles.all()]

    def add_roles(self, roles):
        """Use add append the roles that do not already exist"""
        if not isinstance(roles, list):
            roles = (roles,)
        for role in roles:
            if not isinstance(role, Role):
                role, created = Role.objects.get_or_create(name=role)
            self.user.roles.get_or_create(role=role)
        self.user.save()

    def update_roles(self, roles):
        """Use update to set the roles to exactly the list you pass in"""
        current_roles = set(self.roles)
        create_roles = set()
        same_roles = set()
        if not is_iterable(roles):
            roles = (roles,)
        for role in roles:
            if not isinstance(role, Role):
                role, created = Role.objects.get_or_create(name=role)
            if role in current_roles:
                same_roles.add(role)
            else:
                create_roles.add(role)
        delete_roles = current_roles.difference(same_roles.union(create_roles))
        self.user.roles.filter(role__in=delete_roles).delete()
        self.add_roles(create_roles)


class RequesterSkill(TimeStampedModel):
    requester = ForeignKey('Requester', on_delete=CASCADE, related_name='skills')
    skill = ForeignKey('Skill', on_delete=CASCADE, related_name='requesters')


class ApplicantSkill(TimeStampedModel):
    user = ForeignKey('auth.User', on_delete=CASCADE, related_name='skills')
    skill = ForeignKey('Skill', on_delete=CASCADE, related_name='applicants')


class Application(TimeStampedModel):
    status = CharField(max_length=255)


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


class Proposal(TimeStampedModel):
    name = CharField(max_length=255)
    description = CharField(max_length=1024)


class Contract(TimeStampedModel):
    name = CharField(max_length=255)
    description = CharField(max_length=1024)
