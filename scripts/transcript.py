import sys
from youtube_transcript_api import YouTubeTranscriptApi
import sys
from google.cloud import language_v1
from google.cloud.language_v1 import enums

def get_words(transcript):
    sent=[]
    for i in transcript:
        tokenizer = RegexpTokenizer(r'\w+')
        sent.append(i['text'])
    return sent

def sample_classify_text(text_content):
    """
    Classifying Content in a String

    Args:
      text_content The text content to analyze. Must include at least 20 words.
    """

    client = language_v1.LanguageServiceClient()

    # text_content = 'That actor on TV makes movies in Hollywood and also stars in a variety of popular new TV shows.'

    # Available types: PLAIN_TEXT, HTML
    type_ = enums.Document.Type.PLAIN_TEXT

    # Optional. If not specified, the language is automatically detected.
    # For list of supported languages:
    # https://cloud.google.com/natural-language/docs/languages
    language = "en"
    document = {"content": text_content, "type": type_, "language": language}

    response = client.classify_text(document)
    # Loop through classified categories returned from the API
    for category in response.categories:
        # Get the name of the category representing the document.
        # See the predefined taxonomy of categories:
        # https://cloud.google.com/natural-language/docs/categories
        print(u"Category name: {}".format(category.name))
        # Get the confidence. Number representing how certain the classifier
        # is that this category represents the provided text.
        print(u"Confidence: {}".format(category.confidence))


video_id = sys.argv[1]

transcript = YouTubeTranscriptApi.get_transcript(video_id)
data_words = get_words(transcript)
sample_classify_text(" ".join(data_words))

# print(transcript, data_words)


