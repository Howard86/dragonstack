package com.dragonstack.util;

import com.auth0.jwt.JWT;
import com.dragonstack.constant.SecurityConstants;
import lombok.extern.slf4j.Slf4j;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static com.dragonstack.constant.SecurityConstants.SECRET;

@Slf4j
public final class Parser {

    public static String parseJWTHeader(String token) {

        return JWT.require(HMAC512(SECRET.getBytes()))
                .build()
                .verify(token.replace(SecurityConstants.TOKEN_PREFIX, ""))
                .getSubject();
    }
}
