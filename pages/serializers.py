from rest_framework import serializers
from .models import Returntooffice

class ReturntoofficeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Returntooffice
        fields = ('id', 'geography', 'location', 'numberOfDesk', 'meaws', 'mr', 'toMr', 'fullyEquipedMonitor', 'fullyEquipedMonitorPercent', 'targetToFullyequipPercent', 'missingParts', 'additionalPart', 'comments', 'managerResponsible', 'text')
