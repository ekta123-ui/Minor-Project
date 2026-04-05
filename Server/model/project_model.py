import os
import pandas as pd
import re

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "cola_distilbert_model")
campus = pd.read_csv(
    os.path.join(DATA_DIR, "a_block_locations.csv"),
    encoding="latin1"
)

print("Office Names:")
print(campus["office_name"].tolist())
teachers = pd.read_csv(
    os.path.join(DATA_DIR, "Details_4_Project.csv"),
    encoding="latin1"
)

# FIX
campus.columns = campus.columns.str.strip().str.lower()
teachers.columns = teachers.columns.str.strip().str.lower()

teachers["coordinatorship"] = teachers["coordinatorship"].astype(str).str.lower()

def detect_place(query):

    query = query.lower()

    for place in campus["office_name"]:

        place_lower = str(place).lower()

        if query in place_lower:
            return place

        if place_lower in query:
            return place

        # keyword matching
        query_words = query.split()

        for word in query_words:
            if word in place_lower:
                return place

    return None

    query = query.lower()
    query_words = set(re.findall(r'\w+', query))

    best_match = None
    best_score = 0

    for place in campus["office_name"]:

        place_words = set(re.findall(r'\w+', str(place).lower()))
        score = len(query_words & place_words)

        if score > best_score:
            best_score = score
            best_match = place

    return best_match


def cola_system(query):

    place = detect_place(query)

    if place is None:
        return "Location not found"

    location = campus[campus["office_name"] == place]

    block = location.iloc[0]["block"]
    floor = location.iloc[0]["floor"]
    room = location.iloc[0]["room_no"]

    return f"""
Place: {place}
Block: {block}
Floor: {floor}
Room: {room}
"""

if __name__ == "__main__":
    query = input("Enter your query: ")
    result = cola_system(query)
    print(campus["office_name"].head(20))