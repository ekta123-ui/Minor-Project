import sys
from project_model import cola_system

if len(sys.argv) > 1:
    query = sys.argv[1]
else:
    query = input("Enter query: ")

response = cola_system(query)

print(response)