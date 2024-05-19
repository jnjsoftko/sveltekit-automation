# https://www.geeksforgeeks.org/python-downloading-captions-from-youtube/

from youtube_transcript_api import YouTubeTranscriptApi 
  
# assigning srt variable with the list 
# of dictionaries obtained by the get_transcript() function
video_id = "WIiGHobK_0E"
# video_id = "SW14tOda_kI"
srt = YouTubeTranscriptApi.get_transcript(video_id, languages=['ko'])
  
# prints the result
print(srt)