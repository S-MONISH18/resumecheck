from django.urls import path
from . import views

urlpatterns = [
    # Auth routes
    path('auth/register/', views.register, name='auth_register'),
    path('auth/login/', views.login, name='auth_login'),
    path('auth/logout/', views.logout, name='auth_logout'),
    path('auth/me/', views.me, name='auth_me'),

    # Resume ranking
    path('rank', views.rank_candidates, name='rank_candidates'),
]
