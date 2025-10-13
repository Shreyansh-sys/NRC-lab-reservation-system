from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.EquipmentCategoryListView.as_view(), name='equipment-categories'),
    path('equipment/', views.EquipmentListView.as_view(), name='equipment-list'),
    path('equipment/<int:pk>/', views.EquipmentDetailView.as_view(), name='equipment-detail'),
]