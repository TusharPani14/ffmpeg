# ffmpeg
This web application users provide their videos, and the video is processed on the server using ffmpeg to remove noise. Used background jobs and job queues architecture to run it asynchronously in a background worker. 

To start the server first run
```bash
  npm install
```
```bash
  npm start
```

Also need to start the redis server
Make sure redis is installed in your system and run the command 
```bash
  redis-server
```
It will connect to default port of redis i.e 6379
Now run the routes in postman or any other service
