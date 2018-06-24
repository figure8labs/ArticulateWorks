from django.contrib.auth.models import User
from django.test import TestCase

# Create your tests here.
from articulateworks.models import Skill


class ArticulateTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user('janedoe')
        self.skill = Skill.objects.create(name='French', description='French language')
        pass

    def test_basic(self):
        user = self.user
        skill = self.skill
        user.profile.add_skills(skill)
        self.assertEqual(user.skills.first().skill.name, "French")
        self.assertEqual(user.skills.first().skill, skill)

    def test_update_skills(self):
        user = self.user
        skill = self.skill
        user.profile.add_skills(["Software", "Jazz"])
        self.assertEqual(user.skills.count(), 2)
        updated_skills = (skill, "Software")
        user.profile.update_skills(updated_skills)
        self.assertEqual(user.skills.count(), 2)
        user_skill_names = {skill.skill.name for skill in user.skills.all()}
        self.assertTrue(user_skill_names.union({skill.name, "Software"}))
