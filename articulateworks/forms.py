from django import forms
from django.forms import ModelForm
from django.forms import widgets
from .models import Task, Application

# a user creates a new application in response to a requesters needs
class ApplicationEntryForm(forms.Form):
    status = forms.CharField(widget=forms.CharField)

# a user creates a proposition of work
class ProposalForm(forms.ModelForm):
    status = forms.CharField(widget=forms.HiddenInput())
    hours = forms.CharField(widget=forms.CharField)
    payment_schedule = forms.CharField(widget=forms.CharField)
    description = forms.CharField(widget=forms.CharField)

# a user creates a new job board object
class AddNeedsForm(forms.Form):
    skill = forms.CharField(widget=forms.CharField)

class TaskForm(forms.ModelForm):
    class meta:
        model = Task
        fields = ['name', 'description']
        widgets = {
            'text': forms.TextInput(attrs={
                'id': 'task',
                'required': True,
                'placeholder': 'Say something...'
            }),
        }