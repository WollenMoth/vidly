from rest_framework import permissions
from rest_framework.permissions import BasePermission


class DeleteAdminOrIsAuthenticatedOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.method in permissions.SAFE_METHODS or
            request.method != 'DELETE' and request.user and request.user.is_authenticated or
            request.user.is_staff
        )
