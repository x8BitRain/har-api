# Setting up SSL for local use

Some parts of the app require SSL in order to work, namely the Google Analytics property chooser component.
To set up local SSL do the following.

1. Install [mkcert](https://github.com/FiloSottile/mkcert) on your respective platform.
2. Generate and install certs for `nightwatch.dev` (will require sudo password at the end):
```bash
  mkcert -install && \
  mkdir -p ./ssl && \
  mkcert \
    -cert-file ./ssl/server.crt \
    -key-file ./ssl/server.key \
    localhost 127.0.0.1 ::1
```
3. Run  your ember server with `ember s --ssl true`.

Your server should be available at https://nightwatch.dev:4200
