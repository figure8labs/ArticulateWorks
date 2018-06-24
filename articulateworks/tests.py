from django.contrib.auth.models import User
from django.test import TestCase

# Create your tests here.
from articulateworks.models import Skill, Task, Role


class ArticulateTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user('janedoe')
        self.skill = Skill.objects.create(name='French', description='French language')
        self.task = Task.objects.create(name='Organize Folders')
        self.role = Role.objects.create(name='Project Manager')

    def test_basic(self):
        user = self.user
        skill = self.skill
        user.profile.add_skills(skill)
        self.assertEqual(user.skills.first().skill.name, "French", "Name of skill matches")
        self.assertEqual(user.skills.first().skill, skill)

    def test_update_skills(self):
        user = self.user
        skill = self.skill
        user.profile.add_skills(["Django development", "Jazz"])
        self.assertEqual(user.skills.count(), 2)
        updated_skills = (skill, "Django development")
        user.profile.update_skills(updated_skills)
        self.assertEqual(user.skills.count(), 2)
        user_skill_names = {skill.skill.name for skill in user.skills.all()}
        self.assertTrue(user_skill_names.union({skill.name, "Django development"}))

        # Simplest to use profile.skills virtual attribute
        user.profile.skills = Skill.objects.create(name='Large vehicle driver')
        self.assertEqual(len(user.profile.skills), 1)

    def test_update_tasks(self):
        user = self.user
        task = self.task
        user.profile.add_tasks(["Fix copier", "Create social media accounts"])
        self.assertEqual(user.tasks.count(), 2)
        updated_tasks = (task, "Fix copier")
        user.profile.update_tasks(updated_tasks)
        self.assertEqual(user.tasks.count(), 2)
        user_task_names = {task.task.name for task in user.tasks.all()}
        self.assertTrue(user_task_names.union({task.name, "Fix copier"}))

        # Simplest to use profile.tasks virtual attribute
        user.profile.tasks = Task.objects.create(name='Drive van to New York')
        self.assertEqual(len(user.profile.tasks), 1)

    def test_update_roles(self):
        user = self.user
        role = self.role
        user.profile.add_roles(["Splunk admin", "Receptionist"])
        self.assertEqual(user.roles.count(), 2)
        updated_roles = (role, "Splunk admin")
        user.profile.update_roles(updated_roles)
        self.assertEqual(user.roles.count(), 2)
        user_role_names = {role.role.name for role in user.roles.all()}
        self.assertTrue(user_role_names.union({role.name, "Splunk admin"}))

        # Simplest to use profile.roles virtual attribute
        user.profile.roles = Role.objects.create(name='HR manager')
        self.assertEqual(len(user.profile.roles), 1)
