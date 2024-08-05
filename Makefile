build_image:
	docker build --tag practice-a .
	
start_local:
	docker run -d -p 3001:3001 -p 6499:6499 --name practice-a__local practice-a

stop_local:
	docker kill practice-a__local; docker remove practice-a__local

logs_local:
	docker logs practice-a__local