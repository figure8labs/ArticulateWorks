from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from .forms import ApplicationEntryForm
from .models import Application

# applicant perspective

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
def send_application(request, id):
    if request.method == 'POST':
        application = Application()
        application.save()
    else:
        form = ApplicationEntryForm
    return render(request, 'articulateworks/send_application.html', {'form': form})

# a user can see the list of tasks needed from a requester
def get_tasks_needed(request):
    return render(request, 'articulateworks/tasks.html')

# a user can see the list of skills needed from a requester
def get_skills_needed(request):
    return render(request, 'articulateworks/skills.html')

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
    return render(request, 'articulateworks/applicants.html')

# a requester can see the response to their request
def get_applications(request):
    return render(request, 'articulateworks/applications.html')

# both perspectives

# a user can get a list of all proposals where they are engaged
def get_proposals(request):
    return render(request, 'articulateworks/proposals.html')

# a user can get a list of all contracts where they are engaged
def get_contracts(request):
    return render(request, 'articulateworks/contracts.html')

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
    # TODO implement
    pass

@login_required
def home_page(request):
    return render(request, 'articulateworks/home.html')