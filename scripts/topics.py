import sys
import re
import urllib
import urllib.request
import PyPDF2

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

sub_videos = []

for i in sub_topics[3:]:
    print(i)
    query_string = urllib.parse.urlencode({"search_query" : i + 'in' + subj_name})
    print(query_string)
    html_content = urllib.request.urlopen("http://www.youtube.com/results?" + query_string)
    print(html_content)
    search_results = re.findall(r'href=\"\/watch\?v=(.{11})', html_content.read().decode())
    sub_videos.append("http://www.youtube.com/watch?v=" + search_results[0])

print(subj_name, main_topics, sub_topics, sub_videos)


