from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from base.models import Product, Review
from base.serializer import ProductSerializer

from rest_framework import status

from django.db.models import Q, Case, When, Value, IntegerField
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

import pyrebase


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query is None:
        query = ' '
    products = Product.objects.filter(
        Q(name__icontains=query) | Q(category__icontains=query) | Q(brand__icontains=query)
    ).order_by(
        Case(
            When(countInStock=0, then=Value(1)),
            default=Value(0),
            output_field=IntegerField()
        ),
        '-createdAt'
    )   
    page = request.query_params.get('page')    
    paginator = Paginator(products, 8)
    
    try: 
        products = paginator.page(page)
    except PageNotAnInteger: 
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)    
    
    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getCategoriesFromProducts(request):
    categories = set(product.category for product in Product.objects.all())
    return Response({'categories': list(categories)})


@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4, countInStock__gt=0).order_by('-rating')[0:7]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)
    
    product.name = data['name']
    product.price = data['price']
    product.discountProduct = data['discountProduct']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Deleted')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    defaultImage = 'https://firebasestorage.googleapis.com/v0/b/nutrinationcloud.appspot.com/o/images%2Fplaceholder.png?alt=media&token=d31420b6-5295-42e9-8f99-8c39a5860a72'
    product = Product.objects.create(
        user = user,
        name = 'PlaceHolder Name',
        price = 0,
        discountProduct = 0,
        brand = 'PlaceHolder Brand',
        countInStock = 0,
        category = 'PlaceHolder Category',
        description = '',
        image = defaultImage,
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def uploadImage(request):

    config = {
        "apiKey": "AIzaSyA2t0e00QguUgt5iLV6AqA9CeHux6jO9Ts",
        "authDomain": "nutrinationcloud.firebaseapp.com",
        "projectId": "nutrinationcloud",
        "storageBucket": "nutrinationcloud.appspot.com",
        "messagingSenderId": "205043949710",
        "appId": "1:205043949710:web:394792931862b4a89829df",
        "measurementId": "G-Q513Z4MQVK",
        "databaseURL" : "https://nutrinationcloud-default-rtdb.europe-west1.firebasedatabase.app/",
    }

    firebase = pyrebase.initialize_app(config)
    storage = firebase.storage()

    data = request.data

    product_id = int(data['product_id'])
    product = Product.objects.get(_id=product_id)
    image_file = request.FILES.get('image')
    storage.child('images/' + image_file.name).put(image_file)

    image_url = storage.child('images/' + image_file.name).get_url(None)
    product.image = image_url
    product.save()

    return Response('Image was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    #1 - Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail':'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    #2 - No rating or 0
    elif data['rating'] == 0:
        content = {'detail':'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    #3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review added')
    

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteReview(request, pk):
    review = Review.objects.get(_id=pk)
    review.delete()
    return Response('Review Deleted')