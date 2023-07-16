from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('', views.getOrders, name='orders'),

    path('add/', views.addOrderItems, name='orders-add'),
    
    path('myorders/', views.getMyOrders, name='my-orders'),

    path('promocodes/', views.getPromoCodes, name='promocodes'),
    path('promocodes/create/', views.createPromoCode, name='promocode-create'),
    path('promocodes/<int:pk>/', views.getPromoCodeById, name='promocode'),
    path('promocodes/byname/<str:promoCode>/', views.getPromoCodeByName, name='promocode-by-name'),
    path('promocodes/update/<int:pk>/', views.updatePromoCode, name='promocode-update'),
    path('promocodes/delete/<int:pk>/', views.deletePromoCode, name='promocode-delete'),

    path('deliver/<str:pk>/', views.updateOrderToDelivered, name='delivered'),
    path('<str:pk>/', views.getOrderById, name='user-order'),
    path('pay/<str:pk>/', views.updateOrderToPaid, name='pay'),

]