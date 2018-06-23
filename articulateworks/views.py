from django.shortcuts import render
from .forms import ApplicationEntryForm
from .models import Application

def create_application(request):
    if request.method == 'POST':
        application = Application()
        application.save()
    else:
        form = ApplicationEntryForm
    return render(request, 'articulateworks/new_application.html', {'form': form})

def get_tasks(request):
    return render(request, 'articulateworks/tasks.html')

def get_skills(request):
    return render(request, 'articulateworks/skills.html')

