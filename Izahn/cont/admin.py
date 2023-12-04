from django.contrib import admin
from .models import User, CarritoCompras, OpinionCliente, Producto

# Register your models here.
admin.site.register(User)
admin.site.register(CarritoCompras)
admin.site.register(OpinionCliente)
admin.site.register(Producto)