from django.urls import path
from . import views

urlpatterns = [
    path('reservations/', views.ReservationListView.as_view(), name='reservation-list'),
    path('admin/reservations/', views.AllReservationListView.as_view(), name='all-reservations'),
    path('reservations/<int:pk>/', views.ReservationDetailView.as_view(), name='reservation-detail'),
    path('maintenance/', views.MaintenanceLogListView.as_view(), name='maintenance-list'),
    path('notifications/', views.NotificationListView.as_view(), name='notification-list'),
    path('equipment/<int:equipment_id>/availability/', views.equipment_availability, name='equipment-availability'),
]