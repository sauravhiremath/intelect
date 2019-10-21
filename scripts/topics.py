import sys
import re
import urllib
import urllib.request
import PyPDF2
import random

# file_path = sys.args[0]
pdf_file = open('uploads/CSE2005_Operating-Systems_ETH_1_AC39.pdf', 'rb')
read_pdf = PyPDF2.PdfFileReader(pdf_file)
number_of_pages = read_pdf.getNumPages()
page = read_pdf.getPage(0)
page2 = read_pdf.getPage(1)
page_content1 = str(page.extractText())
page_content2 = (page2.extractText())

# print(page_content2.encode('utf-8'))

main_topics = re.findall('^(.*?):', page_content1, re.MULTILINE)
sub_topics = re.findall('^(.*?)\n-', page_content1, re.MULTILINE)
subj_name =""
for line in page_content1.split('\n'):
    if line != ' ':
        if any(i.isdigit() for i in line) == False and line != '\n':
            match = line
            break

# main_topics.append(re.findall('^(.*?):', page_content2, re.MULTILINE))
channel_list = ["Knowledge Gate", "Neso Academy", "Tutorials Point", "Easy Engineering"]
channel_name = random.choice(channel_list)
sub_videos = []
vid_time = ""
# query_string = urllib.parse.urlencode({"search_query" : "cpu scheduling" + 'in' + 'os'})
# print(query_string)
# html_content = urllib.request.urlopen("http://www.youtube.com/results?" + query_string)
# timing_raw = re.findall(r'<span class="video-time" aria-hidden="true">(.*)', html_content.read().decode())[0]
# for x in timing_raw:
#     if x.isdigit() == True or x==":":
#         vid_time +=x
#     else:
#         break
# print(vid_time)

for i in sub_topics[3:]:
    # print(i)
    query_string = urllib.parse.urlencode({"search_query" : i + 'in' + subj_name})
    # print(query_string)
    html_content = urllib.request.urlopen("http://www.youtube.com/results?" + query_string)
    # print(html_content.read().decode())
    search_results = re.findall(r'href=\"\/watch\?v=(.{11})', html_content.read().decode())
    vid_time = re.findall(r'<span class="video-time" aria-hidden="true">(.*)', html_content.read().decode())[0]
    timing_raw = re.findall(r'<span class="video-time" aria-hidden="true">(.*)', html_content.read().decode())[0]
    for x in timing_raw:
        if x.isdigit() == True or x==":":
            vid_time +=x
        else:
            break
    sub_videos.append({"url":"http://www.youtube.com/watch?v=" + search_results[0], "duration": vid_time, "channel": channel_name)


print(subj_name, main_topics, sub_topics, sub_videos)


