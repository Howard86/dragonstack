package com.dragonstack.util;

import com.auth0.jwt.JWT;
import com.dragonstack.constant.SecurityConstants;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

public final class Parser {

    public static String parseJWTHeader(String token, String secret) {

        return JWT.require(HMAC512(secret.getBytes()))
                .build()
                .verify(token.replace(SecurityConstants.TOKEN_PREFIX, ""))
                .getSubject();
    }
}
