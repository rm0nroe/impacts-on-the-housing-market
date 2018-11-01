import requests
from xml.etree import ElementTree
import json
import requests
import csv

# API key : 02082e9d3e963f1a5c976e471628fe53

school_names = []
def retrieve_schools():
        # https://api.greatschools.org/schools/nearby?key=02082e9d3e963f1a5c976e471628fe53&city=Phoenix&state=AZ&radius=15
        url = "https://api.greatschools.org/schools/nearby?key=02082e9d3e963f1a5c976e471628fe53&city=Phoenix&state=AZ&radius=35"
        r = requests.get(url)
        root = ElementTree.fromstring(r.content)

        school_data = open('phoenix_schools.csv', 'w')

        # create the csv writer object

        csvwriter = csv.writer(school_data)
        schools_head = []

        count = 0
        for member in root:
            school = []
            address_list = []
            if count == 0:
                name = member.find('name').tag
                schools_head.append(name)
                type = member.find('type').tag
                schools_head.append(type)
                grade_range = member.find('gradeRange').tag
                schools_head.append(grade_range)
                enrollment = member.find('enrollment').tag
                schools_head.append(enrollment)
                city = member.find('city').tag
                schools_head.append(city)
                state = member.find('state').tag
                schools_head.append(state)
                address = member.find('address').tag
                schools_head.append(address)
                lat = member.find('lat').tag
                schools_head.append(lat)
                lon = member.find('lon').tag
                schools_head.append(lon)
                schools_head.append('parentRating')
                csvwriter.writerow(schools_head)
                count = count + 1
        # try:
            name = member.find('name').text
            school.append(name)
            school_names.append(name)
            type = member.find('type').text
            school.append(type)
            grade_range = member.find('gradeRange').text
            school.append(grade_range)
            try:
                enrollment = member.find('enrollment').text
                school.append(enrollment)
            except AttributeError:
                continue
            city = member.find('city').text
            school.append(city)
            state = member.find('state').text
            school.append(state)
            address = member.find('address').text
            school.append(address)
            lat = member.find('lat').text
            school.append(lat)
            lon = member.find('lon').text
            school.append(lon)

            # Query on school name to find rating
            filtered_name = name.replace(" ", "+");
            # https://api.greatschools.org/search/schools?key=02082e9d3e963f1a5c976e471628fe53&state=CA&q=Alameda
            url_rating = "https://api.greatschools.org/search/schools?key=02082e9d3e963f1a5c976e471628fe53&state=CA&q="+filtered_name + "&limit=1"
            response = requests.get(url_rating)
            root_rating = ElementTree.fromstring(response.content)
            for entry in root_rating:
                try:
                    rating = entry.find('parentRating').text
                    print(name + ' > ' + rating)
                    school.append(rating)
                except AttributeError:
                    continue
            csvwriter.writerow(school)
        school_data.close()





retrieve_schools()



