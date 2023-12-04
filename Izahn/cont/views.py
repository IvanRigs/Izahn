from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from .models import Producto
from .forms import RegistroForm
from django.contrib.auth import authenticate, login
from .forms import CustomAuthenticationForm

# Create your views here.
def index(request):
    productos = Producto.objects.all()
    return render(request, 'index.html', {'productos': productos})

def buscar(request):
    termino_busqueda = request.GET.get('termino_busqueda', '')
    resultados = Producto.objects.filter(nombre__icontains=termino_busqueda)
    return render(request, 'buscar.html', {'resultados': resultados, 'termino_busqueda': termino_busqueda})

def detalle_producto(request, producto_id):
    producto = get_object_or_404(Producto, id=producto_id)
    return render(request, 'detalle_producto.html', {'producto': producto})

def logRegis(request):
    return render(request, 'logRegis.html')

def register(request):
    if request.method == 'POST':
        form = RegistroForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/')
    else:
        form = RegistroForm()

    return render(request, 'register.html', {'form': form})

def login_user(request):
    if request.method == 'POST':
        form = CustomAuthenticationForm(request, request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            user = authenticate(request, email=email, password=password)

            if user is not None:
                login(request, user)
                return redirect('/')
            else:
                return render(request, 'log.html', {'form': form, 'error_message': 'Credenciales inválidas'})
    else:
        form = CustomAuthenticationForm()

    return render(request, 'log.html', {'form': form})