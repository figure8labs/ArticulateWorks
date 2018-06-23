from django import forms
from django.forms import extras

class ApplicationEntryForm(forms.ModelForm):
    status = forms.CharField(widget=forms.HiddenInput())