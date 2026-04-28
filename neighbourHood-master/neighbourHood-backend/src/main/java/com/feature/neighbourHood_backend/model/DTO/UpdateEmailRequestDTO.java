package com.feature.neighbourHood_backend.model.DTO;

public class UpdateEmailRequestDTO {
    private String email;

    public UpdateEmailRequestDTO() {
    }

    public UpdateEmailRequestDTO(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}