from django.db import models

# Create your models here.
class User(models.Model):
    nombre = models.CharField(max_length=200)
    apellidos = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    numero = models.CharField(max_length=12)
    direccion = models.CharField(max_length=200)
    email = models.CharField(max_length=200,  unique=True)

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    urlImg = models.CharField(max_length=300)
    nombre = models.CharField(max_length=200)
    precio = models.FloatField(default=0)
    clasificacion = models.CharField(max_length=200)
    descripcion = models.TextField(default='')

    def __str__(self):
        return self.nombre

class OpinionCliente(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    opinion = models.TextField(default='')

class CarritoCompras(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    Producto =  models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=0)

    def __str__(self):
        return self.user + ' - ' + self.Producto

