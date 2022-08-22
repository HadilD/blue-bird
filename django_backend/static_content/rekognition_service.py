import boto3
from django.conf import settings

rekognition_client = boto3.client(
    "rekognition",
    aws_access_key_id=settings.AWS_REKOGNITION_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_REKOGNITION_SECRET_ACCESS_KEY,
    region_name=settings.AWS_REKOGNITION_REGION,
)


def get_labels(image):
    """
    Get an array of label objects for an image
    """
    response = rekognition_client.detect_labels(
        Image={
            "Bytes": image,
        },
        MaxLabels=10,
    )
    return response["Labels"]


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
