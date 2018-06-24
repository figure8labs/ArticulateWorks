from django import forms
from django.forms import extras

class ApplicationEntryForm(forms.ModelForm):
    status = forms.CharField(widget=forms.HiddenInput())

class ProposalForm(forms.ModelForm):
    status = forms.CharField(widget=forms.HiddenInput())
    hours = forms.CharField(widget=forms.CharField)
    payment_schedule = forms.Select(widget=forms.Select)
    description = forms.CharField(widget=forms.Textarea)

