import requests
from xml.etree import ElementTree
import json
import requests
import csv

# API key : 02082e9d3e963f1a5c976e471628fe53


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
                csvwriter.writerow(schools_head)
                count = count + 1
        # try:
            name = member.find('name').text
            school.append(name)
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
        # except TypeError:
        #     pass
            csvwriter.writerow(school)
        school_data.close()
retrieve_schools()



