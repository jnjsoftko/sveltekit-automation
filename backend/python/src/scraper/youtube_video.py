# pip install pytube
# https://github.com/pytube/pytube
# $ pytube https://youtube.com/watch?v=2lAe1cqCOXo
# $ pytube https://www.youtube.com/playlist?list=PLS1QulWo1RIaJECMeUT4LFwJ-ghgoSH6n

from pytube import YouTube

# YouTube('https://youtu.be/2lAe1cqCOXo').streams.first().download()
# 18,423,447바이트(디스크에 18.4MB 있음)
# YouTube('https://youtu.be/2lAe1cqCOXo').streams.last().download()

folder = "/Users/youchan/Movies/Youtube/IT/브라이언의 브레인 트리니티"
url = "https://www.youtube.com/playlist?list=PLXwZM4oxLDeOng01iPnCXRJTy23yq9tq_"
url = "https://www.youtube.com/watch?v=WIiGHobK_0E"
url = "https://www.youtube.com/watch?v=n-O-7PpsZOs"

# YouTube(url).streams.filter(progressive=True, file_extension='mp4').order_by('resolution').desc().first().download(folder)
YouTube(url).streams.get_highest_resolution().download(folder)
# YouTube(url).streams.filter(file_extension='mp4', res="1080p").first().download(folder)
# YouTube(url).streams.filter(res="1080p").first().download(folder)
# 40,672,023바이트(디스크에 40.7MB 있음)
# yt.streams.filter(progressive=True, file_extension='mp4').order_by('resolution').desc().last().download()
# # 18,423,447바이트(디스크에 18.4MB 있음)