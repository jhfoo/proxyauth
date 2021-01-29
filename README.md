# proxyauth (alpha)
Authentication proxy for nginx 

## Goal
Experimental proxy implementing [Zero Trust](https://www.crowdstrike.com/epp-101/zero-trust-security/) with Nginx as the proxy engine.

## Demo
[https://mockapp.kungfoo.info](https://mockapp.kungfoo.info)

## Introduction
Want to enable access to restricted sites without using VPN? Imagine this: user types in the url of the restricted app (eg. intranet.domain.com) on his home desktop browser. The first time he gets redirected to a login page (login.domain.com). On success he gets redirected back to the restricted app url which now shows the app page. He switches to other restricted apps and doesn't need to be authenticated. 

## What it does
ProxyAuth leverages Nginx's auth_request feature which makes Nginx 1) act as a reverse proxy, 2) route inbound connections to ProxyAuth for approval. ProxyAuth approves when user is authenticated and authorised.

### Authentication
ProxyAuth uses Passport's strategies to enable authentication across multiple providers; list [here](http://www.passportjs.org/packages/).

### Authorisation
TBC

### Approval response
On approval, ProxyAuth sets a JWT as a HttpOnly cookie named x-proxyauth-jwt on the parent domain (eg. parent for intranet.domain.com = domain.com). Approvals are determined by presence and validation of this cookie.

## Config
```sh
# Ref: https://developer.okta.com/blog/2018/08/28/nginx-auth-request
# nginx.conf
server {
  listen 443 ssl;
  server_name hostname-under-proxy.domain;
  # Lets Encrypt works
  ssl_certificate /path/fullchain.pem;
  ssl_certificate_key /path/privkey.pem;

  location / {
    proxy_pass http://actual-app-host.domain;
    proxy_set_header Auth-JWT $auth_resp_jwt;
  }
#      root /usr/local/www/;
#      index index.html;

  auth_request /proxy-auth;
  auth_request_set $auth_resp_err $upstream_http_x_vouch_err;
  auth_request_set $auth_resp_jwt $upstream_http_x_vouch_token;
  auth_request_set $auth_resp_failcount $upstream_http_x_vouch_failcount;

  location = /proxy-auth {
    proxy_pass http://auth-proxy.domain:port;
    proxy_pass_request_body off;

    proxy_set_header Content-Length "";
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

  }

  error_page 401 = @error401;

  location @error401 {
    return 302 https://auth-proxy.domain/login?url=https://$http_host$request_uri;
  }
}
```

## Implementation
### Transparent authentication
- Looks for cookie?
### Explicit authentication
- Uses [passport.js](http://www.passportjs.org/)
- Returns JWT in header x-proxyauth-jwt