import logging
import uuid

import boto3
from django.conf import settings
from botocore.exceptions import ClientError


UPLOAD_DIRECTORY = "uploaded_data"


def upload_file(file_obj):
    """Upload a file to S3 bucket.

    :param file_obj: File Object to upload
    """

    s3_client = boto3.client("s3", aws_access_key_id=settings.AWS_ACCESS_KEY,
                             aws_secret_access_key=settings.AWS_SECRET_KEY)

    file_ext = file_obj.name.split(".")[-1]
    obj_name = str(uuid.uuid4()) + "." + file_ext

    try:
        s3_client.upload_fileobj(file_obj, settings.AWS_BUCKET_NAME, f"{UPLOAD_DIRECTORY}/{obj_name}")
        logging.info("File uploaded with name: {}".format(obj_name), obj_name)

        return obj_name
    except ClientError as e:
        logging.error(e)


def delete_remote_file(uri):
    s3_client = boto3.client("s3", aws_access_key_id=settings.AWS_ACCESS_KEY,
                             aws_secret_access_key=settings.AWS_SECRET_KEY)
    try:
        s3_client.delete_object(Bucket=settings.AWS_BUCKET_NAME, Key=f"{UPLOAD_DIRECTORY}/{uri}")
        logging.info("File deleted with name: {}".format(uri))

    except ClientError as e:
        logging.error(e)


def get_public_link(s3_file_name):
    """Getting a publicly accessible link to an asset.

    :param s3_file_name: name of file object which is uploaded before.
    """
    s3_client = boto3.client("s3", aws_access_key_id=settings.AWS_ACCESS_KEY,
                             aws_secret_access_key=settings.AWS_SECRET_KEY)
    try:
        return s3_client.generate_presigned_url("get_object", Params={
            "Bucket": settings.AWS_BUCKET_NAME, "Key": f"{UPLOAD_DIRECTORY}/{s3_file_name}"}, ExpiresIn=3600)
    except ClientError as e:
        logging.error(e)
