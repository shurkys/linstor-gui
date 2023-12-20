# Linstor GUI

**Note: This application is not intended for production use.**

## Overview
Linstor GUI is a web-based graphical user interface designed for [Linstor](https://linbit.com/linstor/) or [Piraeus](https://piraeus.io). The primary purpose of this project is for informational and educational purposes, exploring technologies such as [Next.js](https://nextjs.org), [Tailwindcss](https://tailwindcss.com), [Flowbite React](https://www.flowbite-react.com), and Linstor :smiley:

## Build Instructions
After building the project, you can use the following commands:

```sh
npm run build
```
Alternatively, you can use Docker:
```sh
docker run -ti -v .:/opt/app node:lts-alpine sh -c 'cd /opt/app && npm ci && npm run build'
```
Copy the files from the `./out` directory to `/usr/share/linstor-server/ui` on your Linstor controller. Access the GUI at `http://YOUR_CONTROLLER_IP_ADDRESS:3370/ui/`.

## Development Setup
For development, you can use Docker Compose:
```sh
docker-compose up
```
Access the development environment at [http://localhost:3370/ui/](http://localhost:3370/ui/)
## License
This project is licensed under the MIT License, making it free software.

Feel free to explore, modify, and learn from this project! :rocket:
