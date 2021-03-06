"""cac URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib.auth import views as auth_views
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from articulateworks import views as articulate_views

urlpatterns = [
    path('logout/', auth_views.LogoutView.as_view(template_name='articulateworks/logout.html'), name='logout'),
    path('admin/', admin.site.urls),
    path('', articulate_views.index, name='index'),
    path('proposals/', articulate_views.get_proposals, name='proposals'),
    path('applications/', articulate_views.get_applications, name='applications'),
    path('contracts/', articulate_views.get_contracts, name='contracts'),
    path('addneeds/', articulate_views.add_needs, name='addneeds'),
    path('collaborators/', articulate_views.get_applicants, name='collaborators'),
    path('partners/', articulate_views.get_applicants, name='partners'),
    path('newapplication/', articulate_views.send_application, name='newapplication'),
    path('addrole/', articulate_views.add_role, name='addrole'),
    path('addtask/', articulate_views.add_role, name='addtask'),
    path('addskill/', articulate_views.add_role, name='addskill'),
    # path('applicantskills/', articulate_views.get_userskills_available, name='userskills_list'),
    path('applicantskills/', articulate_views.ApplicantSkillsListView.as_view(), name='userskills_list'),
    path('paypal_openid_login/', articulate_views.paypal_openid_login, name='paypal_openid_login'),
    path('paypal_openid_auth/', articulate_views.paypal_openid_auth, name='paypal_openid_auth'),
    path('merchant_payment_failure/', articulate_views.merchant_payment_failure, name='merchant_payment_failure'),
    path('merchant_payment_success/', articulate_views.merchant_payment_success, name='merchant_payment_success')
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
