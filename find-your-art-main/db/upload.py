import json

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

import random
import string


# Helper function
def generate_id(length):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))


# Initialize Firebase app
cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


# Load event data
with open('events.json', 'r') as file:
    event_data = json.load(file)

    for item in event_data:
        event = json.loads(item)
        db.collection("events").document(generate_id(20)).set(event)

# Load categories data
with open('categories.json', 'r') as file:
    category_data = json.load(file)
    db.collection("filters").document("categories").set(category_data)

# Load themes data
with open('themes.json', 'r') as file:
    theme_data = json.load(file)
    db.collection("filters").document("themes").set(theme_data)
