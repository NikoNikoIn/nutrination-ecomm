from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from base.models import Product, Order, OrderItem, ShippingAddress, PromoCode
from base.serializer import ProductSerializer, OrderSerializer, PromoCodeSerializer

from rest_framework import status
from datetime import datetime

from django.shortcuts import render
from django.http import JsonResponse, HttpResponseNotFound, HttpResponse
from django.views import View
import os

from django.utils import timezone
from pytz import timezone as pytz_timezone




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )

        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )

            product.countInStock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user
    try: 
        order = Order.objects.get(_id=pk)

        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else: 
            return Response({'detail':'Not authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)
        
    except:
        return Response({'detail':'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = timezone.now()
    order.save()
    
    return Response('Order was paid')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = timezone.now()
    order.save()
    
    return Response('Order was delivered')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many = True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all().order_by('-createdAt')
    serializer = OrderSerializer(orders, many = True)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteOrder(request, pk):
    order = Order.objects.get(_id=pk)
    order.delete()
    return Response('Order Deleted')


@api_view(['GET'])
def getPromoCodes(request):
    promoCodes = PromoCode.objects.all()  # Retrieve all promo codes from the database
    serializer = PromoCodeSerializer(promoCodes, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def getPromoCodeById(request, pk):
    try:
        promoCodeObj = PromoCode.objects.get(id=pk)
        serializer = PromoCodeSerializer(promoCodeObj)
        return Response(serializer.data)
    except PromoCode.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deletePromoCode(request, pk):
    promoCode = PromoCode.objects.get(id=pk)
    promoCode.delete()
    return Response('Promo Code Deleted')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createPromoCode(request):
    promoCode = PromoCode.objects.create(
        promoCode = 'PlaceHolder PromoCode',
        discount = 0
    )
    serializer = PromoCodeSerializer(promoCode, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updatePromoCode(request, pk):
    data = request.data
    promoCodeToUpdate = PromoCode.objects.get(id=pk)
    
    promoCodeToUpdate.promoCode = data['promoCodeName']
    promoCodeToUpdate.discount = data['discount']

    promoCodeToUpdate.save()

    serializer = PromoCodeSerializer(promoCodeToUpdate, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getPromoCodeByName(request, promoCode):
    try:
        promoCodeObj = PromoCode.objects.get(promoCode=promoCode)
        serializer = PromoCodeSerializer(promoCodeObj)
        return Response(serializer.data)
    except PromoCode.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    

class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()