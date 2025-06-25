FROM ubuntu:22.04

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Install asdf
ENV ASDF_DIR=/opt/asdf
RUN git clone https://github.com/asdf-vm/asdf.git $ASDF_DIR --branch v0.14.0
ENV PATH="$ASDF_DIR/bin:$ASDF_DIR/shims:$PATH"

# Copy .tool-versions and install plugins
WORKDIR /app
COPY .tool-versions .
RUN asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
RUN asdf plugin add pnpm https://github.com/jonathanmorley/asdf-pnpm.git

# Install Node.js and pnpm as per .tool-versions
RUN bash -c ". $ASDF_DIR/asdf.sh && asdf install"

COPY client /app

RUN pnpm install

CMD ["pnpm", "dev"]
