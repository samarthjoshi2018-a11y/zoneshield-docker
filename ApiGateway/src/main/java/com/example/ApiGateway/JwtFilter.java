package com.example.ApiGateway;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;


import io.jsonwebtoken.Claims;
import reactor.core.publisher.Mono;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;

@Component
public class JwtFilter implements GlobalFilter {

     @Autowired
     JwtUtil jutil;

     

    private static final String COOKIE_NAME = "jwt";

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        System.out.println("Jwt filter hit");
        
        String path=exchange.getRequest().getURI().getPath();
        System.out.println("request path: "+path);
        if(path.startsWith("/auth") || path.startsWith("/register") ){
            return chain.filter(exchange);
        }
        
        HttpCookie cookie = exchange.getRequest().getCookies().getFirst(COOKIE_NAME);
        if (cookie == null) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            System.out.println("cookie is null");
            return exchange.getResponse().setComplete();
        }

        String token = cookie.getValue();
        Claims claims = jutil.validateToken(token);
        
        if (claims == null) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            System.out.println("Invalid token");
            return exchange.getResponse().setComplete();
        }
            
        String email = claims.getSubject();
        System.out.println("email from token: "+email);
        System.out.println("cookie authenticated");
        ServerHttpRequest mutatedRequest = exchange.getRequest()
                .mutate()
                .header("X-User-Email", email)
                .build();

        return chain.filter(exchange.mutate().request(mutatedRequest).build());
    }


}
