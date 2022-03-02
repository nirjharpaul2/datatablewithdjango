from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import TemplateView
from django.views.generic import ListView
from django.views.decorators.csrf import csrf_exempt

#rest apis
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Returntooffice, SiteContacts
from .serializers import ReturntoofficeSerializer, SiteContactsSerializer


class HomePageView(ListView):
    model = Returntooffice
    template_name = "home.html"

#rest api methods
@api_view(['GET', 'POST'])
@csrf_exempt
def return_to_view_collection(request):
    if request.method == 'GET':
        posts = Returntooffice.objects.all()
        serializer = ReturntoofficeSerializer(posts, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ReturntoofficeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@csrf_exempt
def site_contacts_collection(request):
    if request.method == 'GET':
        posts = SiteContacts.objects.all()
        serializer = SiteContactsSerializer(posts, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SiteContactsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from django.views.decorators.csrf import csrf_exempt
@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def site_contacts_element(request, pk):
    try:
        post = SiteContacts.objects.get(pk=pk)
    except SiteContacts.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'GET':
        serializer = SiteContactsSerializer(post)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        post.delete()
        return Response('', status=status.HTTP_202_ACCEPTED)
    elif request.method == 'PUT' or request.method == 'PATCH':
        serializer = SiteContactsSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.views.decorators.csrf import csrf_exempt
@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def return_to_view_element(request, pk):
    try:
        post = Returntooffice.objects.get(pk=pk)
    except Returntooffice.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'GET':
        serializer = ReturntoofficeSerializer(post)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        post.delete()
        return Response('', status=status.HTTP_202_ACCEPTED)
    elif request.method == 'PUT' or request.method == 'PATCH':
        serializer = ReturntoofficeSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AboutPageView(TemplateView):  # new
    template_name = "about.html"
