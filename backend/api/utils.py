import requests
from django.conf import settings

def get_google_access_token(code, redirect_uri):
    token_url = "https://oauth2.googleapis.com/token"
    data = {
        'code': code,
        'client_id': settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY,
        'client_secret': settings.SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET,
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code'
    }
    response = requests.post(token_url, data=data)
    return response.json()

def get_facebook_access_token(code, redirect_uri):
    token_url = "https://graph.facebook.com/v12.0/oauth/access_token"
    params = {
        'code': code,
        'client_id': settings.SOCIAL_AUTH_FACEBOOK_KEY,
        'client_secret': settings.SOCIAL_AUTH_FACEBOOK_SECRET,
        'redirect_uri': redirect_uri
    }
    response = requests.get(token_url, params=params)
    return response.json()