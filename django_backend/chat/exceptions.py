from rest_framework.exceptions import APIException, ValidationError


class RoomAlreadyExistsError(ValidationError):
    def __init__(self, to_user_id: int):
        super(RoomAlreadyExistsError, self).__init__("room for user id: %d already exists" % to_user_id)


class NotAValidToUserError(ValidationError):
    def __init__(self):
        super(NotAValidToUserError, self).__init__("you can not create the room for yourself")

