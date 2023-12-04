from django import forms
from .models import User
from django.contrib.auth.forms import AuthenticationForm

class RegistroForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['nombre', 'apellidos', 'password', 'numero', 'direccion', 'email']

class CustomAuthenticationForm(AuthenticationForm):
    class Meta:
        model = User
        fields = ['email', 'password']