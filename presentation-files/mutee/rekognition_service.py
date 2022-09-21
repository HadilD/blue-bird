import boto3
from django.conf import settings


def get_labels(image):
    """
    Get an array of label objects for an image
    """

    rekognition_client = boto3.client(
        "rekognition",
        aws_access_key_id=settings.AWS_REKOGNITION_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_REKOGNITION_SECRET_ACCESS_KEY,
        region_name=settings.AWS_REKOGNITION_REGION,
    )

    response = rekognition_client.detect_labels(
        Image={
            "Bytes": image,
        },
        MaxLabels=10,
    )
    return list(map(lambda r: r["Name"], response["Labels"]))


def get_tags(labels):
    """
    Gets the labels' names (tags) from an array of labels
    """
    return [label["Name"] for label in labels]


def get_image(path):
    """
    Gets the base-64 encoding of an image
    """
    with open(path, 'rb') as source_image:
        source_byte = source_image.read()
        return source_byte


# aws_access_key_id=ASIAWJSKW2JBQAI6CBMY
# aws_secret_access_key=mKTrNYLzQLYGC68NXXWoGcPx7ueaQRhoaJ2SxPOl
# aws_session_token=FwoGZXIvYXdzEJ3//////////wEaDAwwNxVsnP5jfSj5xiLXATzU6zV9CkJtYrsbOtm3+JwfZVGMdKxRcpUyHUJ/NCeOoiSDX+BvnWO1TVauYwu8tDRukxt+6heTDEO05Vq9EI2sqYRgpLEf8FVCm3au4MEetXTV73a4kkXcYleSScUi1qwt7ismcByja1OD4cP5lbk3qEIZI0QdBYPMlL6DZr1xztPscEHrW6UJwAAwXOCok/FEfwKvldS901IT1QLCNqCeEE45rXxbBPyOahS7koRmwHqWsoLzR0EmKYD4NEz6WLHTZX6EQxnHMXDYn1NqoQ/8a4w1BqomKIyrrZgGMi1f+PhTrMCkHWhXTl+62LczrfVS+uHjewc1yEH0Mie6+UCwLe+XcpEfHtJWkJw=
