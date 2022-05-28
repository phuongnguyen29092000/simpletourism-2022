package com.example.simpletouristapp.model;

import com.google.gson.annotations.SerializedName;

import java.util.Date;

public class LoginResponse {
    @SerializedName("status")
    private String status;

    @SerializedName("message")
    private String message;

    @SerializedName("tokenAuth")
    private TokenAuth tokenAuth;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public TokenAuth getTokenAuth() {
        return tokenAuth;
    }

    public void setTokenAuth(TokenAuth tokenAuth) {
        this.tokenAuth = tokenAuth;
    }

    public class TokenAuth{

        @SerializedName("access")
        private Access access;

        @SerializedName("refresh")
        private Refresh refresh;

        public Access getAccess() {
            return access;
        }

        public void setAccess(Access access) {
            this.access = access;
        }

        public Refresh getRefresh() {
            return refresh;
        }

        public void setRefresh(Refresh refresh) {
            this.refresh = refresh;
        }

        public class Access{

            @SerializedName("token")
            private String token;

            @SerializedName("expires")
            private Date expires;

            public String getToken() {
                return token;
            }

            public void setToken(String token) {
                this.token = token;
            }

            public Date getExpires() {
                return expires;
            }

            public void setExpires(Date expires) {
                this.expires = expires;
            }
        }
        public class Refresh{

            @SerializedName("token")
            private String token;

            @SerializedName("expires")
            private Date expires;

            public String getToken() {
                return token;
            }

            public void setToken(String token) {
                this.token = token;
            }

            public Date getExpires() {
                return expires;
            }

            public void setExpires(Date expires) {
                this.expires = expires;
            }
        }
    }
}
