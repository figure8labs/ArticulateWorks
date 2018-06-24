from django import forms
from django.forms import ModelForm
from django.forms import widgets

# a user creates a new application in response to a requesters needs
class ApplicationEntryForm(forms.ModelForm):
    status = forms.CharField(widget=forms.HiddenInput())

# a user creates a proposition of work
class ProposalForm(forms.ModelForm):
    status = forms.CharField(widget=forms.HiddenInput())
    hours = forms.CharField(widget=forms.CharField)
    payment_schedule = forms.CharField(widget=forms.CharField)
    description = forms.CharField(widget=forms.CharField)

