from django import forms


class ApplicationEntryForm(forms.ModelForm):
    status = forms.CharField(widget=forms.HiddenInput())


class ProposalForm(forms.ModelForm):
    status = forms.CharField(widget=forms.HiddenInput())
    hours = forms.CharField(widget=forms.CharField)
    payment_schedule = forms.ChoiceField(widget=forms.Select)
    description = forms.CharField(widget=forms.Textarea)
