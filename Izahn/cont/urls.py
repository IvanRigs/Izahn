from django.urls import path
from . import views
from .views import detalle_producto

urlpatterns = [
    path('', views.index),
    path('search/', views.buscar, name='buscar'),
    path('producto/<int:producto_id>/', detalle_producto, name='detalle_producto'),
    path('logR/', views.logRegis),
    path('register/', views.register, name='register'),
    path('login/', views.login_user, name='login'),
]
