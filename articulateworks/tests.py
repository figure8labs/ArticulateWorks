from django.contrib.auth.models import User
from django.test import TestCase

# Create your tests here.
from articulateworks.models import Skill, Task, Role, Requester


class ArticulateUserTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user('janedoe')
        self.skill = Skill.objects.create(name='French', description='French language')
        self.task = Task.objects.create(name='Organize Folders')
        self.role = Role.objects.create(name='Project Manager')

    def test_basic(self):
        user = self.user
        skill = self.skill
        user.profile.add_skills(skill)
        self.assertEqual(user.skill_set.first().skill.name, "French", "Name of skill matches")
        self.assertEqual(user.skill_set.first().skill, skill)

    def test_update_skills(self):
        user = self.user
        skill = self.skill
        user.profile.add_skills(["Django development", "Jazz"])
        self.assertEqual(user.skill_set.count(), 2)
        updated_skills = (skill, "Django development")
        user.profile.update_skills(updated_skills)
        self.assertEqual(user.skill_set.count(), 2)
        user_skill_names = {skill.skill.name for skill in user.skill_set.all()}
        self.assertTrue(user_skill_names.union({skill.name, "Django development"}))

        # Simplest to use profile.skill_set virtual attribute
        user.profile.skills = Skill.objects.create(name='Large vehicle driver')
        self.assertEqual(len(user.profile.skills), 1)

    def test_update_tasks(self):
        user = self.user
        task = self.task
        user.profile.add_tasks(["Fix copier", "Create social media accounts"])
        self.assertEqual(user.task_set.count(), 2)
        updated_tasks = (task, "Fix copier")
        user.profile.update_tasks(updated_tasks)
        self.assertEqual(user.task_set.count(), 2)
        user_task_names = {task.task.name for task in user.task_set.all()}
        self.assertTrue(user_task_names.union({task.name, "Fix copier"}))

        # Simplest to use profile.task_set virtual attribute
        user.profile.tasks = Task.objects.create(name='Drive van to New York')
        self.assertEqual(len(user.profile.tasks), 1)

    def test_update_roles(self):
        user = self.user
        role = self.role
        user.profile.add_roles(["Splunk admin", "Receptionist"])
        self.assertEqual(user.role_set.count(), 2)
        updated_roles = (role, "Splunk admin")
        user.profile.update_roles(updated_roles)
        self.assertEqual(user.role_set.count(), 2)
        user_role_names = {role.role.name for role in user.role_set.all()}
        self.assertTrue(user_role_names.union({role.name, "Splunk admin"}))

        # Simplest to use profile.role_set virtual attribute
        user.profile.roles = Role.objects.create(name='HR manager')
        self.assertEqual(len(user.profile.roles), 1)


class ArticulateRequesterTests(TestCase):
    def setUp(self):
        self.requester = Requester.objects.create(name='GoalBoox')
        self.skill = Skill.objects.create(name='French', description='French language')
        self.task = Task.objects.create(name='Organize Folders')
        self.role = Role.objects.create(name='Project Manager')

    def test_basic(self):
        requester = self.requester
        skill = self.skill
        requester.add_skills(skill)
        self.assertEqual(requester.skill_set.first().skill.name, "French", "Name of skill matches")
        self.assertEqual(requester.skill_set.first().skill, skill)

    def test_update_skills(self):
        requester = self.requester
        skill = self.skill
        requester.add_skills(["Django development", "Jazz"])
        self.assertEqual(requester.skill_set.count(), 2)
        updated_skills = (skill, "Django development")
        requester.update_skills(updated_skills)
        self.assertEqual(requester.skill_set.count(), 2)
        requester_skill_names = {skill.skill.name for skill in requester.skill_set.all()}
        self.assertTrue(requester_skill_names.union({skill.name, "Django development"}))

        # Simplest to use skills virtual attribute
        requester.skills = Skill.objects.create(name='Large vehicle driver')
        self.assertEqual(len(requester.skills), 1)

    def test_update_tasks(self):
        requester = self.requester
        task = self.task
        requester.add_tasks(["Fix copier", "Create social media accounts"])
        self.assertEqual(requester.task_set.count(), 2)
        updated_tasks = (task, "Fix copier")
        requester.update_tasks(updated_tasks)
        self.assertEqual(requester.task_set.count(), 2)
        requester_task_names = {task.task.name for task in requester.task_set.all()}
        self.assertTrue(requester_task_names.union({task.name, "Fix copier"}))

        # Simplest to use tasks virtual attribute
        requester.tasks = Task.objects.create(name='Drive van to New York')
        self.assertEqual(len(requester.tasks), 1)

    def test_update_roles(self):
        requester = self.requester
        role = self.role
        requester.add_roles(["Splunk admin", "Receptionist"])
        self.assertEqual(requester.role_set.count(), 2)
        updated_roles = (role, "Splunk admin")
        requester.update_roles(updated_roles)
        self.assertEqual(requester.role_set.count(), 2)
        requester_role_names = {role.role.name for role in requester.role_set.all()}
        self.assertTrue(requester_role_names.union({role.name, "Splunk admin"}))

        # Simplest to use roles virtual attribute
        requester.roles = Role.objects.create(name='HR manager')
        self.assertEqual(len(requester.roles), 1)
