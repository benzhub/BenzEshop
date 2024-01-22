import os
from djoser.email import ActivationEmail, ConfirmationEmail


class CustomActivationEmail(ActivationEmail):
    def get_context_data(self):
        context = super().get_context_data()
        context["domain"] = os.getenv("DOMAIN")
        context["site_name"] = os.getenv("SITE_NAME")

        return context


class CustomConfirmationEmail(ConfirmationEmail):
    def get_context_data(self):
        context = super().get_context_data()
        context["domain"] = os.getenv("DOMAIN")
        context["site_name"] = os.getenv("SITE_NAME")

        return context
