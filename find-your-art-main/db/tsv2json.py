import json
from pprint import pprint

# Helper function
def create_event_object(current_line, headers):
    values = current_line.split("\t")
    object = {}
    for i, col in enumerate(headers):
        if col == "recurring":
            object[col] = True if values[i] == "TRUE" else False
        elif col == "location_types" or col == "tags":
            object[col] = [x.strip() for x in values[i].split(",")]
        elif col == "adult_price" or col == "student_price":
            object[col] = round(float(values[i]), 2) if values[i] else 0
        else:
            object[col] = values[i]
    json_object = json.dumps(object)
    return json_object


# Read file
with open('./events.tsv', 'r') as events:
    events_data = events.read().split('\r')
    lines = events_data[0].split("\n")
    event_headers = lines[1].split('\t')

with open('./categories.tsv', 'r') as categories:
    categories_data = categories.read().split('\n')


# Process data
res_events = []
for i, line in enumerate(lines):
    if i < 2: continue
    event = create_event_object(line, event_headers)
    res_events.append(event)

res_categories = {}
res_themes = {}
# print(categories_data)
for line in categories_data:
    category, disciplines, styles = line.split('\t')
    if category == 'Universal Themes':
        res_themes[category] = disciplines.split('|')
        continue
    disciplines = disciplines.split('|') if disciplines else []
    styles = styles.split('|') if styles else []
    res_categories[category] = {'disciplines': disciplines, 'styles': styles }


# Write to JSON file
with open('events.json', 'w') as events_file:
    json.dump(res_events, events_file, indent=2)

with open('categories.json', 'w') as categories_file:
    json.dump(res_categories, categories_file, indent=2)

with open('themes.json', 'w') as themes_file:
    json.dump(res_themes, themes_file, indent=2)

# print('events.json written correctly')
