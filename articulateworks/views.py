from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, Http404, HttpResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.generic import ListView
from django_extensions import logging
from paypalrestsdk import Tokeninfo
from paypalrestsdk.api import default

from .forms import ApplicationEntryForm, AddNeedsForm, TaskForm
from .models import Application, ApplicantSkill, Task
import json


# applicant perspective

@login_required
def index(request):
    return render(request, 'articulateworks/home.html')

# a user can fill out an application in response to a requester,
# this only needs to be done repeatedly if the user does not exist in the remote server
def create_application(request):
    if request.method == 'POST':
        application = Application()
        application.save()
    else:
        form = ApplicationEntryForm
    return render(request, 'articulateworks/new_application.html', {'form': form})

# send application, if an applicant already has a saved application instance from the remote server
def send_application(request, id=None):
    if request.method == 'POST':
        application = Application()
        application.save()
    else:
        form = ApplicationEntryForm
    return render(request, 'articulateworks/application.html', {'form': form})

# a user can see the list of tasks needed from a requester
def get_tasks_needed(request):
    return render(request, 'articulateworks/tasks.html')

# a user can see the list of skills needed from a requester
def get_skills_needed(request):
    return render(request, 'articulateworks/skills.html')

# a user can see the list of skills needed from a requester
def get_userskills_available(request):
    return render(request, 'articulateworks/userskills.html')

# a user can see the full list of needs from a requester
def get_full_needs(request):
    return render(request, 'articulateworks/needs.html')

# a user can see a list of all jobs based on search criteria from remote server
def get_jobs(request):
    return render(request, 'articulateworks/jobs.html')

# a user can see a list of jobs they've been sent personally
def get_received_jobs(request):
    return render(request, 'articulateworks/jobs.html')


# obviously this will need to be a blackbox api call once we set up a server
def get_full_database(request):
    if request.user.is_subscriber:
        jobs = get_jobs()
    else:
        jobs = get_received_jobs()
    return render(request, 'articulateworks/jobs.html')

# admin perspective

# a requester can see the profile of who has applied to their requests
def get_applicants(request):
    applicants = ['alexis', 'jordan', 'ryan', 'anna']
    return render(request, 'articulateworks/applicants.html', {'applicants': applicants})

def get_applicantskills(request):
    return render(request, 'articulateworks/userskills.html', {'user': User.objects.get(username='janedoe')})

# this is where the requester adds their needs
def add_needs(request):
    form = TaskForm
    return render(request, 'articulateworks/addneeds.html', {'form': form})

# a requester can see the response to their request
def get_applications(request):
    applications = ['application1', 'application2', 'application3', 'application4']
    return render(request, 'articulateworks/applications.html', {'applications':applications})

# a user wants to create a new role for their entity/company
def add_role(request):
    newrole = 'Backend Developer'
    return render(request, 'articulateworks/addneeds.html', {'newrole': newrole})

# both perspectives

# a user can get a list of all proposals where they are engaged
def get_proposals(request):
    applications = ['application1', 'application2', 'application3', 'application4']
    return render(request, 'articulateworks/proposals.html', {'proposals': applications})

# a user can get a list of all contracts where they are engaged
def get_contracts(request):
    contracts = ['Social Media Campaign']
    return render(request, 'articulateworks/contracts.html', {'contracts': contracts})

# a user accepts the whole proposal to create a contract
def approve_proposal(request, id):
    return render(request, 'articulateworks/proposals.html')

# a user doesn't want to approve the proposal as-is, but suggest a change
def counter_proposal(request, id):
    return render(request, 'articulateworks/proposals.html')

# a user wants to reject the proposal outright, no negotiation ensues
def deny_proposal(request, id):
    return render(request, 'articulateworks/proposals.html')

# Perform PayPal OpenID login
# https://developer.paypal.com/docs/integration/direct/identity/log-in-with-paypal/
def paypal_openid_login(request):
    return render(request, 'articulateworks/login.html')

def paypal_openid_auth(request):
    code = request.GET.get('code')
    if not code:
        raise Http404()
    # print("code=%s\n" % code)
    tokeninfo = Tokeninfo.create(code)
    # print("access_token=%s\n" % tokeninfo.access_token)
    userinfo = tokeninfo.userinfo(options={"scope": "openid address profile email https://uri.paypal.com/services/paypalattributes"})
    first_name, last_name = userinfo.name.split(' ', 2)
    username = userinfo.user_id
    email = userinfo.email

    if User.objects.filter(username=username).count() > 0:
        user = User.objects.get(username=username)
    else:
        user = User.objects.create_user(username, email=email, first_name=first_name, last_name=last_name)
    login(request, user)
    # print("basic_auth=%s" % default_api.basic_auth())
    # print(userinfo)
    # return render(request, 'articulateworks/home.html')
    return HttpResponseRedirect(redirect_to=reverse('index'))


def add_task(request):
    if request.method == 'POST':
        task = request.POST.get('description')
        response_data = {}

        task = Task(title=task, description=task)
        task.save()

        response_data['result'] = 'Create post successful!'
        response_data['title'] = request.POST.get('description')
        response_data['description'] = request.POST.get('description')

        return HttpResponse(
            json.dumps(response_data),
            content_type="application/json"
        )
    else:
        return HttpResponse(
            json.dumps({"data": "all data"}),
            content_type="application/json"
        )

