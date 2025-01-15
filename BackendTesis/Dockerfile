# Use the official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Install Python, pip, and venv

RUN apt-get update && apt-get install -y \
  curl \
  gnupg \
  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-stable --no-install-recommends \
  && apt-get install -y python3 python3-pip python3-venv \
  && rm -rf /var/lib/apt/lists/*

# Create a virtual environment for Python
RUN python3 -m venv /opt/venv

# Activate the virtual environment and install Python dependencies
COPY requirements.txt /app
RUN /opt/venv/bin/pip install --upgrade pip && \
    /opt/venv/bin/pip install -r requirements.txt

# Ensure the virtual environment is used for any subsequent commands
ENV PATH="/opt/venv/bin:$PATH"

RUN python3 -m nltk.downloader stopwords

# Copy package.json and install Node.js dependencies
COPY package.json /app
RUN npm install

# Expose the application port
EXPOSE 8080

# Copy the rest of the application files
COPY . /app

# Default command to run the application
CMD ["npm", "run", "start"]

