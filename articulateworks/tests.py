from django.contrib.auth.models import User
from django.test import TestCase

# Create your tests here.
from articulateworks.models import Skill


class ArticulateTests(TestCase):
    def setUp(self):
        # stuff to run before each test_* method
        pass

    def test_basic(self):
        user = User.objects.create_user('janedoe')
        skill = Skill.objects.create(name='French', description='French language')
        user.profile.add_skills(skill)
        self.assertEqual(user.skills.first().skill.name, "French")
