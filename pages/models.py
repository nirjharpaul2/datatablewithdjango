import uuid
from django.db import models

# Create your models here.

from django.db import models

class Returntooffice(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    geography = models.CharField(max_length=30, default='')
    location = models.CharField(max_length=30, default='')
    numberOfDesk = models.CharField(max_length=30, default='')
    meaws = models.CharField(max_length=30, default='')
    mr = models.CharField(max_length=30, default='')
    toMr = models.CharField(max_length=150, default='')
    fullyEquipedMonitor = models.CharField(max_length=150, default='')
    fullyEquipedMonitorPercent = models.CharField(max_length=150, default='')
    targetToFullyequipPercent = models.CharField(max_length=150, default='')
    missingParts = models.CharField(max_length=300, default='')
    additionalPart = models.CharField(max_length=300, default='')
    comments = models.CharField(max_length=300, default='')
    managerResponsible = models.CharField(max_length=300, default='')
    text = models.CharField(max_length=300, default='')

    def __str__(self):  # new
        return self.text[:50]

class Post(models.Model):
    text = models.TextField()

    def __str__(self):  # new
        return self.text[:50]

class SiteContacts(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    region = models.CharField(max_length=30, default='')
    country = models.CharField(max_length=30, default='')
    site = models.CharField(max_length=30, default='')
    sitelead = models.CharField(max_length=30, default='')
    email = models.CharField(max_length=30, default='')
    sitedelegate = models.CharField(max_length=150, default='')
    facilitieslead = models.CharField(max_length=150, default='')
    securitylead = models.CharField(max_length=150, default='')

    def __str__(self):  # new
        return self.region[:50]

